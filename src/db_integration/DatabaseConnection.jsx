import { useState } from 'react';
import PropTypes from 'prop-types';
import { CardContent, CardHeader } from '@mui/material';

const DatabaseConnection = ({ onBack }) => {
    const [host, setHost] = useState('');
    const [port, setPort] = useState('');
    const [dbName, setDbName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form from reloading the page

        try {
            const response = await fetch('https://kbpcsedept.in:7002/connect', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ host, port, dbName, username, password }),
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message); // Success
            } else {
                alert(`Error: ${result.error}`); // Display error message
            }
        } catch (error) {
            console.error('Fetch error:', error);
            alert('Network error occurred. Please try again later.');
        }
    };

    return (
        <div className="database-connection">
            <CardHeader>
                <h3>Configure MySQL Database Connection</h3>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <label>Host *</label>
                    <input type="text" value={host} onChange={(e) => setHost(e.target.value)} className="w-full py-1 mt-2 mb-4 pl-2" required />

                    <label>Port *</label>
                    <input type="number" value={port} onChange={(e) => setPort(e.target.value)} className="w-full py-1 mt-2 mb-4 pl-2" required />

                    <label>Database Name *</label>
                    <input type="text" value={dbName} onChange={(e) => setDbName(e.target.value)} className="w-full py-1 mt-2 mb-4 pl-2" required />

                    <label>Database Username *</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full py-1 mt-2 mb-4 pl-2" required />

                    <label>Database Password *</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full py-1 mt-2 mb-4 pl-2" required />

                    <div className="mt-5">
                        <button type="button" onClick={onBack} className='bg-blue-500 hover:bg-blue-600 mr-5'>Back</button>
                        <button type="submit" className='bg-green-500 hover:bg-green-600'>Finish</button>
                    </div>
                </form>
            </CardContent>
        </div>
    );
};

DatabaseConnection.propTypes = {
    onBack: PropTypes.func,
    onFinish: PropTypes.func
};

export default DatabaseConnection;
