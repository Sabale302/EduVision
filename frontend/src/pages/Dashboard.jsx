import '../index.css';

const Dashboard = () => {
    return (
        <div class="main-container">
            <h2>Upload a PDF File</h2>

            <input type="file" id="pdfInput" accept="application/pdf" />
            <br /><br />

            <div id="pdfViewer" class="pdf-container">
                <p>No PDF uploaded yet.</p>
            </div>

            <div id="pdfText" class="pdf-container">
                <h3>Extracted Text:</h3>
                <p id="textContent"></p>
            </div>

            <div id="dashboard" class="pdf-container">
                <h3>Dashboard (Word Frequency Chart):</h3>
                <svg width="600" height="400"></svg>
            </div>
        </div>
    );
};

export default Dashboard;