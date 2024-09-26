const Home = () => {
    return (
        <div class="main-container">
            <h1>Welcome User,</h1>
            <div class="instructions">
                <h2>Instructions</h2>
                <ol>
                    <li>Download the template from below.</li>
                    <li>Make sure to enter data in given format.</li>
                    <li>Do not change the column names.</li>
                </ol>
                <a href="template.xlsx" download="template.xlsx">Download</a>
            </div>
        </div>
    );
}

export default Home;