from flask import Flask, send_file, request, jsonify
import mysql.connector
from flask_cors import CORS
import pandas as pd
import os
from openpyxl import load_workbook

app = Flask(__name__)
CORS(app)

# MySQL connection details
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'eduvision@2024',
    'database': 'eduvision'
}

# Initialize data_frame globally
data_frame = None

# Generates Faculty Information Excel File


@app.route('/generate-excel', methods=['GET'])
def generate_excel():
    # Connect to MySQL database
    connection = mysql.connector.connect(**db_config)
    cursor = connection.cursor()

    # Query to fetch data from your MySQL database
    query = "SELECT * FROM faculties"
    cursor.execute(query)

    # Fetch column names and data
    columns = [col[0]
               for col in cursor.description] if cursor.description else []
    data = cursor.fetchall()

    # Close the database connection
    cursor.close()
    connection.close()

    # Create a DataFrame from the data
    df = pd.DataFrame(data, columns=columns)

    # Define the correct output directory path
    base_directory = os.path.abspath(os.path.dirname(__file__))
    output_directory = os.path.join(base_directory, "output")

    # Create the directory if it doesn't exist
    if not os.path.exists(output_directory):
        os.makedirs(output_directory)

    # Save the DataFrame to an Excel file in the output directory
    output_file = os.path.join(output_directory, "generated_file.xlsx")
    df.to_excel(output_file, index=False, engine='openpyxl')

    # Auto-adjust the column width
    workbook = load_workbook(output_file)
    worksheet = workbook.active
    if worksheet is None:
        return "Error: Worksheet not found", 500

    for col in worksheet.columns:
        max_length = 0
        column = col[0].column_letter  # Get the column name
        for cell in col:
            try:
                if cell.value:
                    max_length = max(max_length, len(str(cell.value)))
            except:
                pass
        adjusted_width = max_length + 2  # Added some padding
        worksheet.column_dimensions[column].width = adjusted_width

    workbook.save(output_file)
    return send_file(output_file, as_attachment=True)


data_frame = None

# Generates Placement Information Excel File


@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files.get('file')
    if not file or not file.filename:
        return jsonify({'error': 'No file uploaded'}), 400

    try:
        # Reads file based on its type
        if file.filename.endswith('.xlsx') or file.filename.endswith('.xls'):
            df = pd.read_excel(file)
        elif file.filename.endswith('.csv'):
            df = pd.read_csv(file.stream)
        else:
            return jsonify({'error': 'Unsupported file format'}), 400

        # Saving as a temporary in-memory variable (ideally store it elsewhere)
        global data_frame
        data_frame = df

        try:
            # Convert data to dictionary for preview
            preview_data = df.to_dict(orient='records')
        except Exception as e:
            return jsonify({'error': f"Error converting data: {str(e)}"}), 500

        # Return preview data and columns as response
        return jsonify({'preview': preview_data, 'columns': df.columns.tolist()}), 200

    except Exception as e:
        # Log the error for debugging purposes
        print(f"Error occurred during file upload: {str(e)}")
        return jsonify({'error': f"An error occurred: {str(e)}"}), 500

@app.route('/filter', methods=['POST'])
def filter_data():
    if request.json is None:
        return jsonify({'error': 'No JSON data provided'}), 400

    filters = request.json.get('filters', [])
    if request.json is None:
        return jsonify({'error': 'No JSON data provided'}), 400
    if request.json is None:
        return jsonify({'error': 'No JSON data provided'}), 400
    select_columns = request.json.get(
        'selectColumns', []) if request.json else []

    if not filters and not select_columns:
        return jsonify({'error': 'No filters or columns provided'}), 400

    try:
        # Start with a copy of the original dataframe
        if data_frame is None:
            return jsonify({'error': 'No data available. Please upload a file first.'}), 400
        filtered_df = data_frame.copy()

        # Apply filters to the dataframe
        for filter in filters:
            column = filter.get('column')
            operator = filter.get('operator')
            value = filter.get('value')
            range_min = filter.get('range', {}).get('min')
            range_max = filter.get('range', {}).get('max')

            # Check if column exists in the DataFrame
            if column not in filtered_df.columns:
                return jsonify({'error': f'Column {column} does not exist'}), 400

            # Apply filtering logic based on operator
            if operator == 'equals':
                filtered_df = filtered_df[filtered_df[column] == value]
            elif operator == 'contains':
                filtered_df = filtered_df[filtered_df[column].astype(
                    str).str.contains(str(value), na=False)]
            elif operator == 'greater_than':
                try:
                    filtered_df = filtered_df[filtered_df[column] > float(
                        value)]
                except ValueError:
                    return jsonify({'error': f'Invalid value for greater_than filter: {value}'}), 400
            elif operator == 'less_than':
                try:
                    filtered_df = filtered_df[filtered_df[column] < float(
                        value)]
                except ValueError:
                    return jsonify({'error': f'Invalid value for less_than filter: {value}'}), 400
            elif operator == 'between':
                if range_min is not None and range_max is not None:
                    try:
                        filtered_df = filtered_df[(filtered_df[column] >= float(
                            range_min)) & (filtered_df[column] <= float(range_max))]
                    except ValueError:
                        return jsonify({'error': f'Invalid range values for between filter: min={range_min}, max={range_max}'}), 400
                else:
                    return jsonify({'error': 'Range values missing for "between" filter'}), 400
            else:
                return jsonify({'error': f'Unsupported operator {operator}'}), 400

        # Select only the specified columns if selectColumns is provided
        if select_columns:
            # Ensure that the selected columns exist in the dataframe
            invalid_columns = [
                col for col in select_columns if col not in filtered_df.columns]
            if invalid_columns:
                return jsonify({'error': f"Invalid columns: {', '.join(invalid_columns)}"}), 400
            filtered_df = filtered_df[select_columns]

        # Return filtered data as a preview (first 5 rows)
        filtered_data = filtered_df.head(5).to_dict(orient='records')

        if not filtered_data:
            return jsonify({'error': 'No data matched the filters provided'}), 200

        return jsonify({'filtered_preview': filtered_data}), 200

    except Exception as e:
        return jsonify({'error': f'Internal server error: {str(e)}'}), 500


# Handles Plcaement Column Changes
@app.route('/apply-column-changes', methods=['POST'])
def apply_column_changes():
    global data_frame
    if data_frame is None:
        return jsonify({'error': 'No data available. Please upload a file first.'}), 400

    try:
        # Get the request JSON
        data = request.json
        if not data:
            return jsonify({'error': 'Invalid JSON format'}), 400

        print("Request Data:", data)  # Debugging line

        select_columns = data.get('selectColumns', [])
        if not select_columns:
            return jsonify({'error': 'No columns selected'}), 400

        print("Selected Columns:", select_columns)  # Debugging line

        # Check if selected columns exist in the data frame
        invalid_columns = [
            col for col in select_columns if col not in data_frame.columns]
        if invalid_columns:
            return jsonify({'error': f'Invalid columns: {", ".join(invalid_columns)}'}), 400

        # Filter the data frame to only include selected columns
        filtered_df = data_frame[select_columns]

        # Convert filtered data to a dictionary format
        filtered_data = filtered_df.to_dict(orient='records')

        return jsonify({'filtered_data': filtered_data}), 200
    except Exception as e:
        return jsonify({'error': f'Internal server error: {str(e)}'}), 500


if __name__ == '__main__':
    app.run(debug=True)
