import { useState } from 'react';
import PropTypes from 'prop-types';
import { CardContent, CardHeader} from "@mui/material";

const DatasetConfiguration = ({ onContinue }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name) {
            onContinue({ name, description });
        } else {
            alert('Name is required.');
        }
    };

    return (
        <div className="dataset-configuration">
            <CardHeader>
                <h3 className="text-xl font-semibold text-gray-800">Configure Dataset</h3>
            </CardHeader>
            <CardContent className="flex-grow space-y-6">
                <form onSubmit={handleSubmit}>
                    <label>
                        Name *
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="For example: Favorite Books"
                            className="w-full py-1 mt-2 mb-4 pl-2"
                            required
                        />
                    </label>
                    <label>
                        Description
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="For example: A list of books I love"
                            className="w-full py-1 mt-2 mb-6 pl-2"
                        />
                    </label>
                    <button type="submit">Continue</button>
                </form>
            </CardContent>

        </div>
    );
};
DatasetConfiguration.propTypes = {
    onContinue: PropTypes.func,
};

export default DatasetConfiguration;