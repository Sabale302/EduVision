import { useState } from 'react';
import DatasetConfiguration from '../../../src/db_integration/DatasetConfiguration';
import DatabaseConnection from '../../../src/db_integration/DatabaseConnection';

const MainComponent = () => {
    const [step, setStep] = useState(1);
    const [datasetConfig, setDatasetConfig] = useState({});
    const [dbConfig, setDbConfig] = useState({});

    const handleContinue = (config) => {
        setDatasetConfig(config);
        setStep(2);
    };

    const handleBack = () => {
        setStep(1);
    };

    const handleFinish = (config) => {
        setDbConfig(config);
        console.log("Dataset Configuration:", datasetConfig);
        console.log("Database Configuration:", dbConfig);
    };

    return (
        <div className="p-8 max-w-full mx-auto bg-gray-100 rounded-lg shadow-lg">
            {step === 1 && <DatasetConfiguration onContinue={handleContinue} />}
            {step === 2 && <DatabaseConnection onBack={handleBack} onFinish={handleFinish} />}
        </div>
    );
};

export default MainComponent;
