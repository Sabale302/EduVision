import React from 'react';
import Button from '../components/Button';

const Reports = () => {
    return (
        <div className="main-container reports">
            <h1>Reports</h1>
            <div className="grid-container ">
                <div className="grid-item">
                    <form method="post">
                        <h2><label for="import">Import Data</label></h2><br />
                        <input type="file" id="import" name="import" accept=".csv" /><br />
                        <button type="submit">Import</button>
                    </form>
                </div>
                <div className="grid-item">
                    <h2>Annual Report</h2>
                    <p>Click the button below to download the annual report for the year 2024.</p>
                    <button type="button" onClick={() => window.open('annual-report.pdf')}>Download</button>
                </div>
            </div>

            <div className="powerbi-dashboard">
                <h2>PowerBI Dashboard</h2>
                <iframe title="First_Dashboard" width="1150" height="700"
                    src="https://app.powerbi.com/view?r=eyJrIjoiMWUwMGFkMTAtMmMxYi00NWY3LTgzZTQtMTg2M2YxMzM0Y2E2IiwidCI6ImIxMWIxNTJkLWYxMzctNDhmYi04MDI0LTE5MTk4NDMwNTM0YyJ9"
                    frameborder="0" allowFullScreen="true"></iframe>
            </div>
        </div>
    );
};

export default Reports;