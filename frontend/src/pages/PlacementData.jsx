/* eslint-disable no-unused-vars */
import { useState } from 'react';
import axios from 'axios';
import { Users } from 'lucide-react';
import { CardContent, CardHeader } from '@mui/material';
import { useEffect } from 'react';

const PlacementData = () => {
    const [file, setFile] = useState(null);
    const [previewData, setPreviewData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [filters, setFilters] = useState([]);
    const [selectedColumns, setSelectedColumns] = useState([]);  // Track selected columns
    const [error, setError] = useState(null);
    const [filteredData, setFilteredData] = useState([]); // State to store filtered data

    // Handle file selection
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    // Handle file upload and show preview
    const handleFileUpload = async () => {
        if (!file) {
            alert("Please select a file first.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("http://localhost:5000/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.data.preview) {
                setPreviewData(response.data.preview);
                setColumns(response.data.columns); // Set available columns for filtering
            }
            setError(null); // Clear any previous errors
        } catch (err) {
            setError(`Error uploading file: ${err.response?.data?.message || err.message}`);
        }
    };

    // Handle filtering
    const handleFilterChange = (index, event) => {
        const { name, value } = event.target;
        const newFilters = [...filters];

        if (name === "range.min" || name === "range.max") {
            const rangeKey = name.split(".")[1];
            newFilters[index].range[rangeKey] = value;
        } else {
            newFilters[index][name] = value;
        }

        setFilters(newFilters);
    };

    // Default values
    const addFilter = () => {
        setFilters((prevFilters) => [
            ...prevFilters,
            { column: '', operator: 'equals', value: '', range: { min: '', max: '' }, logic: 'AND' }
        ]);
    };

    const removeFilter = (index) => {
        const newFilters = filters.filter((_, i) => i !== index);
        setFilters(newFilters);
    };

    const applyFilters = async () => {
        try {
            const response = await axios.post("http://localhost:5000/filter", { filters });
            console.log(response.data);
            if (response.data.filtered_preview) {
                setPreviewData(response.data.filtered_preview);
            }
        } catch (err) {
            setError("Error filtering data: " + err.message);
        }
    };

    // Clear all filters and reset to original preview data
    const clearFilters = () => {
        setFilters([]);
        handleFileUpload(); // Reset the preview data to the original
    };

    // Fetch columns on component mount (assuming you fetch this from the server after uploading a file)
    useEffect(() => {
        fetch('http://localhost:5000/upload')  // Replace with your file upload endpoint
            .then(response => response.json())
            .then(data => {
                setColumns(data.columns || []);
                setPreviewData(data.preview || []); // Assuming 'preview' contains the initial data for the preview
            })
            .catch(error => console.error('Error fetching columns:', error));
    }, []);

    const handleColumnChange = (e) => {
        const columnName = e.target.name;
        setSelectedColumns(prevState =>
            e.target.checked
                ? [...prevState, columnName]  // Add column to selected list
                : prevState.filter(col => col !== columnName)  // Remove column from selected list
        );
    };

    const applyColumnChanges = () => {
        console.log('Selected Columns:', selectedColumns);
        fetch('http://localhost:5000/apply-column-changes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ selectColumns: selectedColumns }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Filtered Data:', data.filtered_data);
                setFilteredData(data.filtered_data); // Set filtered data in state
                setPreviewData(data.filtered_data);  // Update preview data with filtered data
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <div className="border-black w-auto">
            <div className="p-5 rounded shadow-lg">
                <CardHeader>
                    <h3 className="flex items-center gap-2 mb-2 text-slate-800 text-xl font-semibold">
                        <Users className="w-6 h-6" />
                        Placement Data
                    </h3>
                </CardHeader>

                <CardContent className="flex-grow space-y-6">
                    {/* File input */}
                    <div className='shadow-md hover:shadow-lg transition-shadow rounded-lg'>
                        <CardContent className="flex-grow space-y-6">
                            <h2 className="mb-3">Upload Placement Data</h2>
                            <input type="file" onChange={handleFileChange} className="w-96 " />
                            <button onClick={handleFileUpload} className="my-5 bg-green-500 hover:bg-green-600">
                                Upload
                            </button>
                        </CardContent>
                    </div>

                    {/* Error message */}
                    {error && <div style={{ color: 'red' }}>{error}</div>}

                    {/* Filters */}
                    {columns.length > 0 && (
                        <div className='shadow-md hover:shadow-lg transition-shadow rounded-lg'>
                            <CardHeader>
                                <h3 className="text-xl font-semibold text-gray-800">
                                    Filters
                                </h3>
                            </CardHeader>
                            <CardContent className="flex-grow space-y-6">
                                {/* Column Selection Dropdown */}
                                <div>
                                    <h4>Select Columns for Filtering:</h4>
                                    <div className="flex flex-wrap gap-3">
                                        {columns.map((column, index) => (
                                            <div key={index}>
                                                <input
                                                    type="checkbox"
                                                    name={column}
                                                    id={column}
                                                    onChange={handleColumnChange}
                                                    className="w-4 h-4 mt-3 mr-2 p-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                />
                                                <label htmlFor={column}>{column}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="filters-container">
                                    {filters.map((filter, index) => (
                                        <div key={index} className="filter-card p-4 m-2 border rounded-lg shadow-md">
                                            <div className="filter-form">
                                                {/* Column Selection */}
                                                <select
                                                    name="column"
                                                    value={filter.column}
                                                    onChange={(e) => handleFilterChange(index, e)}
                                                    className="mr-2 mb-2 mt-2 ml-2 p-2 border border-gray-300 rounded-md bg-white"
                                                >
                                                    <option value="">Select Column</option>
                                                    {selectedColumns.map((column, i) => (
                                                        <option
                                                            key={i}
                                                            value={column}
                                                            className="mr-2 mb-2 mt-2 ml-2 p-2 border border-gray-300 rounded-md bg-white"
                                                        >
                                                            {column}
                                                        </option>
                                                    ))}
                                                </select>

                                                {/* Filter Operator */}
                                                <select
                                                    name="operator"
                                                    value={filter.operator}
                                                    onChange={(e) => handleFilterChange(index, e)}
                                                    className="mr-2 mb-2 mt-2 ml-2 p-2 border border-gray-300 rounded-md bg-white"
                                                >
                                                    <option value="equals">Equals</option>
                                                    <option value="contains">Contains</option>
                                                    <option value="greater_than">Greater Than</option>
                                                    <option value="less_than">Less Than</option>
                                                    <option value="between">Between</option>
                                                    <option value="starts_with">Starts With</option>
                                                    <option value="ends_with">Ends With</option>
                                                </select>

                                                {/* Value Input */}
                                                {filter.operator !== 'between' ? (
                                                    <input
                                                        type="text"
                                                        name="value"
                                                        value={filter.value}
                                                        onChange={(e) => handleFilterChange(index, e)}
                                                        className="mr-2 mb-2 mt-2 ml-2 p-2 border border-gray-300 rounded-md bg-white"
                                                    />
                                                ) : (
                                                    <>
                                                        <input
                                                            type="number"
                                                            name="range.min"
                                                            placeholder="Min Value"
                                                            value={filter.range.min}
                                                            onChange={(e) => handleFilterChange(index, e)}
                                                            className="mr-2 mb-2 mt-2 ml-2 p-2 border border-gray-300 rounded-md bg-white"
                                                        />
                                                        <input
                                                            type="number"
                                                            name="range.max"
                                                            placeholder="Max Value"
                                                            value={filter.range.max}
                                                            onChange={(e) => handleFilterChange(index, e)}
                                                            className="mr-2 mb-2 mt-2 ml-2 p-2 border border-gray-300 rounded-md bg-white"
                                                        />
                                                    </>
                                                )}

                                                {/* Logic: AND/OR */}
                                                <select
                                                    name="logic"
                                                    value={filter.logic}
                                                    onChange={(e) => handleFilterChange(index, e)}
                                                    className="mr-2 mb-2 mt-2 ml-2 p-2 border border-gray-300 rounded-md bg-white"
                                                >
                                                    <option value="AND">AND</option>
                                                    <option value="OR">OR</option>
                                                </select>

                                                {/* Remove Filter Button */}
                                                <button onClick={() => removeFilter(index)} className="mr-5 bg-red-500 hover:bg-red-600">
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button onClick={applyColumnChanges} className="mr-5 bg-yellow-500 mt-5 hover:bg-yellow-600">
                                    Apply Column Changes
                                </button>
                                <button onClick={addFilter} className="mr-5 bg-blue-500 hover:bg-blue-600">
                                    Add Filter
                                </button>
                                <button onClick={applyFilters} className="mr-5 bg-orange-500 hover:bg-orange-600">
                                    Apply Filters
                                </button>
                                <button onClick={clearFilters} className="bg-red-500 hover:bg-red-600">
                                    Clear Filters
                                </button>
                            </CardContent>
                        </div>
                    )}

                    {/* Display preview data */}
                    {previewData.length > 0 && (
                        <div>
                            <h3 className='mt-10 mb-3'>File Preview:</h3>
                            <div className="overflow-hidden rounded-lg border">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-[#8165FC] text-white">
                                            {Object.keys(previewData[0]).map((key, index) => (
                                                <th key={index} className="px-6 py-3 text-left w-96">{key}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {previewData.map((row, index) => (
                                            <tr key={index} className="border-t">
                                                {Object.values(row).map((value, i) => (
                                                    <td key={i} className="px-6 py-4">{value}</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </CardContent>
            </div >
        </div >
    );
};

export default PlacementData;
