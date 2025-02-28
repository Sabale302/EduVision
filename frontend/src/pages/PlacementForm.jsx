import { useState } from "react";
import { Typography, TextField, Button, Radio, RadioGroup, FormControlLabel, FormLabel, FormControl, MenuItem, Select, InputLabel } from "@mui/material";

const PlacementForm = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        mobile: "",
        alternateMobile: "",
        rollNo: "",
        prnNO: "",
        parentName: "",
        parentMobileNo: "",
        parentOccupation: "",
        yourDOB: "",
        gender: "",
        address: "",
        city: "",
        branch: "",
        yearOfPassing: "",
        firstYearOrDirectSecondYear: "",
        sscPercentage: "",
        hscPercentage: "",
        diplomaPercentage: "",
        feSem1: "",
        feSem2: "",
        seSem3: "",
        seSem4: "",
        teSem5: "",
        teSem6: "",
        activeBacklogs: "",
        numOfYD: "",
        careerObjective: "",
        OncampusPlacement: "",
        onCampusTraining: "",
        offers: "",
        linkedinAccount: "",
        techknown: "",
        langknown: "",
        relocate: "",
        cv: null,
        photo: null,
    });

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === "file" ? e.target.files[0] : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted", formData);
    };

    return (
        <div style={{ margin: "auto", padding: "20px" }}>
            <Typography variant="h4" fontWeight="bold" color="text.primary">
                Placement Information Form            
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField fullWidth label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} margin="normal" />
                <TextField fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleChange} margin="normal" />
                <TextField fullWidth label="Mobile Number" name="mobile" value={formData.mobile} onChange={handleChange} margin="normal" />
                <TextField fullWidth label="Alternate Mobile" name="alternateMobile" value={formData.alternateMobile} onChange={handleChange} margin="normal" />
                <TextField fullWidth label="Roll No" name="rollNo" value={formData.rollNo} onChange={handleChange} margin="normal" />
                <TextField fullWidth label="PRN No" name="prnNO" value={formData.prnNO} onChange={handleChange} margin="normal" />
                <TextField fullWidth label="Parent Name" name="parentName" value={formData.parentName} onChange={handleChange} margin="normal" />
                <TextField fullWidth label="Parent Mobile No" name="parentMobileNo" value={formData.parentMobileNo} onChange={handleChange} margin="normal" />
                <TextField fullWidth label="Parent Occupation" name="parentOccupation" value={formData.parentOccupation} onChange={handleChange} margin="normal" />
                <TextField fullWidth label="your D.O.B" name="yourDOB" value={formData.yourDOB} onChange={handleChange} margin="normal" />
                <TextField fullWidth label="Address" name="address" value={formData.address} onChange={handleChange} margin="normal" />
                <TextField fullWidth label="City" name="city" value={formData.city} onChange={handleChange} margin="normal" />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Branch</InputLabel>
                    <Select name="branch" value={formData.branch} onChange={handleChange}>
                        <MenuItem value="CSE">Computer Science</MenuItem>
                        <MenuItem value="ECE">Electronics & Communication</MenuItem>
                        <MenuItem value="ME">Mechanical</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <FormLabel>Gender</FormLabel>
                    <RadioGroup row name="gender" value={formData.gender} onChange={handleChange}>
                        <FormControlLabel value="Male" control={<Radio />} label="Male" />
                        <FormControlLabel value="Female" control={<Radio />} label="Female" />
                        <FormControlLabel value="Other" control={<Radio />} label="Other" />
                    </RadioGroup>
                </FormControl>
                
                <TextField fullWidth label="Year of Passing" name="yearOfPassing" value={formData.yearOfPassing} onChange={handleChange} margin="normal" />
                <TextField fullWidth label="First Year/Direct Second Year" name="firstYearOrDirectSecondYear" value={formData.firstYearOrDirectSecondYear} onChange={handleChange} margin="normal" />
                <TextField fullWidth label="SSC Percentage" name="sscPercentage" value={formData.sscPercentage} onChange={handleChange} margin="normal" />
                <TextField fullWidth label="HSC Percentage" name="hscPercentage" value={formData.hscPercentage} onChange={handleChange} margin="normal" />
                <TextField fullWidth label="Diploma Percentage" name="diplomaPercentage" value={formData.yearOfPassing} onChange={handleChange} margin="normal" />
                <TextField fullWidth label="feSem1" name="feSem1" value={formData.feSem1} onChange={handleChange} margin="normal" />
                <TextField fullWidth label="feSem2" name="feSem2" value={formData.feSem2} onChange={handleChange} margin="normal" />
                <TextField fullWidth label="feSem3" name="feSem3" value={formData.feSem3} onChange={handleChange} margin="normal" />
                <TextField fullWidth label="feSem4" name="feSem4" value={formData.feSem4} onChange={handleChange} margin="normal" />
                <TextField fullWidth label="feSem5" name="feSem5" value={formData.feSem5} onChange={handleChange} margin="normal" />
                <TextField fullWidth label="feSem6" name="feSem16" value={formData.feSem16} onChange={handleChange} margin="normal" />
                <TextField fullWidth label="Active Backlogs" name="activeBacklogs" value={formData.activeBacklogs} onChange={handleChange} margin="normal" />
                <TextField fullWidth label="Number of YD" name="numOfYD" value={formData.numOfYD} onChange={handleChange} margin="normal" />
                <TextField fullWidth label="Career Objective" name="careerObjective" value={formData.careerObjective} onChange={handleChange} margin="normal" />

                <FormControl fullWidth margin="normal">
                    <InputLabel>Interested in onCampus Placement</InputLabel>
                    <Select name="relocate" value={formData.OncampusPlacement} onChange={handleChange}>
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <InputLabel>Interested in onCampus Training</InputLabel>
                    <Select name="relocate" value={formData.onCampusTraining} onChange={handleChange}>
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                    </Select>
                </FormControl>

                <TextField fullWidth label="Offers held" name="offers" value={formData.offers} onChange={handleChange} margin="normal" />
                <TextField fullWidth label="LinkedIn Account" name="linkedinAccount" value={formData.linkedinAccount} onChange={handleChange} margin="normal" />
                
                <FormControl fullWidth margin="normal">
                    <InputLabel>Relocate</InputLabel>
                    <Select name="relocate" value={formData.relocate} onChange={handleChange}>
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                    </Select>
                </FormControl>

                <TextField fullWidth label="Known Languages" name="techknown" value={formData.techknown} onChange={handleChange} margin="normal" />
                <TextField fullWidth label="Known Languages" name="langknown" value={formData.langknown} onChange={handleChange} margin="normal" />

                
                <Button variant="contained" component="label" fullWidth sx={{ mt: 2 }}>
                    Upload CV
                    <input type="file" hidden name="cv" onChange={handleChange} />
                </Button>
                
                <Button variant="contained" component="label" fullWidth sx={{ mt: 2 }}>
                    Upload Photo
                    <input type="file" hidden name="photo" onChange={handleChange} />
                </Button>
                
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
                    Submit
                </Button>
            </form>
        </div>
    );
};

export default PlacementForm;
