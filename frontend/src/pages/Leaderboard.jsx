const Leaderboard = () => {
    return (
        <div class="main-container leaderboard">
            <h1>Leaderboard</h1>

            <table class="leaderboard-table">
                <tr>
                    <th>Rank</th>
                    <th>Department</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>CSE</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>ENTC</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>MECH</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>CIVIL</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>AI ML</td>
                </tr>
            </table>
        </div>
    );
}

export default Leaderboard;