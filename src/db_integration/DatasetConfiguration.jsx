import { useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from '../../frontend/src/components/Input';
import { Button } from '../../frontend/src/components/Button';
import { CardContent, CardHeader, CardTitle } from '../../frontend/src/components/Card';

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
                <CardTitle className="text-xl font-semibold text-gray-800">Configure Dataset</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow space-y-6">
                <form onSubmit={handleSubmit}>
                    <label>
                        Name *
                        <Input
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
                        <Input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="For example: A list of books I love"
                            className="w-full py-1 mt-2 mb-6 pl-2"
                        />
                    </label>
                    <Button type="submit">Continue</Button>
                </form>
            </CardContent>

        </div>
    );
};
DatasetConfiguration.propTypes = {
    onContinue: PropTypes.func,
};

export default DatasetConfiguration;