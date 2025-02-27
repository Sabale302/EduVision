export const savePlacementData = async (req, res) => {
    try {
        const { cv, photo } = req.files || {};
        const formData = {
            ...req.body,
            // Convert string booleans to actual booleans
            onCampusPlacement: req.body.onCampusPlacement === 'true',
            onCampusTraining: req.body.onCampusTraining === 'true',
            relocate: req.body.relocate === 'true',
            // Ensure date is in correct format for MySQL
            yourDOB: req.body.yourDOB ? new Date(req.body.yourDOB).toISOString().slice(0, 10) : null,
            // Add file paths if files were uploaded
            cv: cv ? cv[0].path : null,
            photo: photo ? photo[0].path : null,
        };

        const placementData = await Placement.create(formData);
        res.status(201).json({ success: true, data: placementData });
    } catch (error) {
        console.error('Error saving placement data:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to save data',
            error: error.message 
        });
    }
};