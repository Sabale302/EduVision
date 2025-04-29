import { useState } from "react";
import { useRef } from 'react';
import { Typography, TextField, Button, Radio, RadioGroup, FormControlLabel, FormLabel, FormControl, MenuItem, Select, InputLabel } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

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
        yourDOB: null,
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
        onCampusPlacement: "",
        onCampusTraining: "",
        offers: "",
        linkedinAccount: "",
        techknown: "",
        langknown: "",
        relocate: "",
        cv: null,
        photo: null,
    });
    const cvInputRef = useRef();
    const photoInputRef = useRef();
    const [errors, setErrors] = useState({});
    const [submitStatus, setSubmitStatus] = useState({ status: "", message: "" });

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        // Validate each field
        Object.entries(formData).forEach(([key, value]) => {
            if (
                (value === "" || value === null) && 
                key !== "hscPercentage" && 
                key !== "diplomaPercentage"
            ) {
                newErrors[key] = "This field is required";
                isValid = false;
            }
        });

        // Email validation
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
            isValid = false;
        }

        // Mobile validation
        if (formData.mobile && !/^\d{10}$/.test(formData.mobile)) {
            newErrors.mobile = "Please enter a valid 10-digit mobile number";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        
        if (type === "file") {
            // Validate file type
            const file = files[0];
            if (file) {
                const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
                if (!validTypes.includes(file.type)) {
                    setErrors({
                        ...errors,
                        [name]: "Only JPG, PNG, or PDF files are allowed"
                    });
                    return;
                }
                // Clear error if valid
                setErrors({
                    ...errors,
                    [name]: ""
                });
            }
            setFormData({
                ...formData,
                [name]: file
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
            // Clear error when field is being filled
            if (errors[name]) {
                setErrors({
                    ...errors,
                    [name]: ""
                });
            }
        }
    };

    const handleDateChange = (date) => {
        setFormData({
            ...formData,
            yourDOB: date
        });
        if (errors.yourDOB) {
            setErrors({
                ...errors,
                yourDOB: ""
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Reset status
        setSubmitStatus({ status: "", message: "" });
        
        if (!validateForm()) {
            setSubmitStatus({ 
                status: "error", 
                message: "Please fill all required fields correctly" 
            });
            return;
        }

        // Convert boolean fields
        const formDataToSend = new FormData();
        
        Object.entries(formData).forEach(([key, value]) => {
            if (key === "onCampusPlacement" || key === "onCampusTraining" || key === "relocate") {
                formDataToSend.append(key, value === "Yes" ? true : false);
            } else if (key === "yourDOB" && value) {
                const localDate = value.toLocaleDateString('en-CA'); // Format: YYYY-MM-DD
                formDataToSend.append(key, localDate);
            } else {
                formDataToSend.append(key, value);
            }
        });

        try {
            setSubmitStatus({ status: "loading", message: "Submitting form..." });
            
            const response = await fetch("http://localhost:7002/api/placements", {
                method: "POST",
                body: formDataToSend,
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || "Form submission failed");
            }
            
            setSubmitStatus({ 
                status: "success", 
                message: "Form submitted successfully!" 
            });
            
            // Reset form after successful submission
            setFormData({
                fullName: "",
                email: "",
                mobile: "",
                alternateMobile: "",
                rollNo: "",
                prnNO: "",
                parentName: "",
                parentMobileNo: "",
                parentOccupation: "",
                yourDOB: null,
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
                onCampusPlacement: "",
                onCampusTraining: "",
                offers: "",
                linkedinAccount: "",
                techknown: "",
                langknown: "",
                relocate: "",
                cv: null,
                photo: null,
            });
            if (cvInputRef.current) cvInputRef.current.value = "";
            if (photoInputRef.current) photoInputRef.current.value = "";

        } catch (err) {
            console.error("Error:", err);
            setSubmitStatus({ 
                status: "error", 
                message: err.message || "An error occurred while submitting the form" 
            });
        }
    };

    return (
        <Box sx={{ p: 4, maxWidth: 900, mx: "auto" }}>

            <Typography variant="h4" fontWeight="bold" color="text.primary" gutterBottom>
                Placement Information Form            
            </Typography>
            
            {/* Status message */}
            {submitStatus.message && (
                <Typography 
                    variant="body1" 
                    color={submitStatus.status === "error" ? "error" : 
                           submitStatus.status === "success" ? "success" : "info"}
                    sx={{ mb: 2, p: 2, bgcolor: submitStatus.status === "error" ? "#FFF4F4" : 
                                          submitStatus.status === "success" ? "#F4FFF4" : "#F4F4FF",
                         borderRadius: 1 }}
                >
                    {submitStatus.message}
                </Typography>
            )}
            
            <form onSubmit={handleSubmit}>
                <TextField 
                    required
                    fullWidth 
                    label="Full Name" 
                    name="fullName" 
                    value={formData.fullName} 
                    onChange={handleChange} 
                    margin="normal"
                    error={!!errors.fullName}
                    helperText={errors.fullName}
                />
                
                <TextField 
                    required
                    fullWidth 
                    label="Email" 
                    name="email" 
                    type="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    margin="normal"
                    error={!!errors.email}
                    helperText={errors.email}
                />
                
                <TextField 
                    required
                    fullWidth 
                    label="Mobile Number" 
                    name="mobile" 
                    value={formData.mobile} 
                    onChange={handleChange} 
                    margin="normal"
                    error={!!errors.mobile}
                    helperText={errors.mobile}
                />
                
                <TextField 
                    required
                    fullWidth 
                    label="Alternate Mobile" 
                    name="alternateMobile" 
                    value={formData.alternateMobile} 
                    onChange={handleChange} 
                    margin="normal"
                    error={!!errors.alternateMobile}
                    helperText={errors.alternateMobile}
                />
                
                <TextField 
                    required
                    fullWidth 
                    label="Roll No" 
                    name="rollNo" 
                    value={formData.rollNo} 
                    onChange={handleChange} 
                    margin="normal"
                    error={!!errors.rollNo}
                    helperText={errors.rollNo}
                />
                
                <TextField 
                    required
                    fullWidth 
                    label="PRN No" 
                    name="prnNO" 
                    value={formData.prnNO} 
                    onChange={handleChange} 
                    margin="normal"
                    error={!!errors.prnNO}
                    helperText={errors.prnNO}
                />
                
                <TextField 
                    required
                    fullWidth 
                    label="Parent Name" 
                    name="parentName" 
                    value={formData.parentName} 
                    onChange={handleChange} 
                    margin="normal"
                    error={!!errors.parentName}
                    helperText={errors.parentName}
                />
                
                <TextField 
                    required
                    fullWidth 
                    label="Parent Mobile No" 
                    name="parentMobileNo" 
                    value={formData.parentMobileNo} 
                    onChange={handleChange} 
                    margin="normal"
                    error={!!errors.parentMobileNo}
                    helperText={errors.parentMobileNo}
                />
                
                <TextField 
                    required
                    fullWidth 
                    label="Parent Occupation" 
                    name="parentOccupation" 
                    value={formData.parentOccupation} 
                    onChange={handleChange} 
                    margin="normal"
                    error={!!errors.parentOccupation}
                    helperText={errors.parentOccupation}
                />

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Date of Birth *"
                        value={formData.yourDOB}
                        onChange={handleDateChange}
                        renderInput={(params) => (
                            <TextField 
                                {...params} 
                                required
                                fullWidth 
                                margin="normal"
                                error={!!errors.yourDOB}
                                helperText={errors.yourDOB}
                            />
                        )}
                    />
                </LocalizationProvider>
                
                <FormControl 
                    required 
                    fullWidth 
                    margin="normal"
                    error={!!errors.gender}
                >
                    <FormLabel id="gender-label">Gender</FormLabel>
                    <RadioGroup 
                        row 
                        name="gender" 
                        value={formData.gender} 
                        onChange={handleChange}
                        aria-labelledby="gender-label"
                    >
                        <FormControlLabel value="Male" control={<Radio />} label="Male" />
                        <FormControlLabel value="Female" control={<Radio />} label="Female" />
                        <FormControlLabel value="Other" control={<Radio />} label="Other" />
                    </RadioGroup>
                    {errors.gender && <Typography color="error" variant="caption">{errors.gender}</Typography>}
                </FormControl>
                
                <TextField 
                    required
                    fullWidth 
                    label="Address" 
                    name="address" 
                    value={formData.address} 
                    onChange={handleChange} 
                    margin="normal"
                    error={!!errors.address}
                    helperText={errors.address}
                />
                
                <TextField 
                    required
                    fullWidth 
                    label="City" 
                    name="city" 
                    value={formData.city} 
                    onChange={handleChange} 
                    margin="normal"
                    error={!!errors.city}
                    helperText={errors.city}
                />
                
                <FormControl 
                    required 
                    fullWidth 
                    margin="normal"
                    error={!!errors.branch}
                >
                    <InputLabel id="branch-label">Branch</InputLabel>
                    <Select 
                        labelId="branch-label"
                        name="branch" 
                        value={formData.branch} 
                        onChange={handleChange}
                        label="Branch"
                    >
                        <MenuItem value="CSE">Computer Science</MenuItem>
                        <MenuItem value="ECE">Electronics & Communication</MenuItem>
                        <MenuItem value="ME">Mechanical</MenuItem>
                    </Select>
                    {errors.branch && <Typography color="error" variant="caption">{errors.branch}</Typography>}
                </FormControl>
                
                <TextField 
                    required
                    fullWidth 
                    label="Year of Passing" 
                    name="yearOfPassing" 
                    value={formData.yearOfPassing} 
                    onChange={handleChange} 
                    margin="normal"
                    error={!!errors.yearOfPassing}
                    helperText={errors.yearOfPassing}
                />
                
                <FormControl 
                    required 
                    fullWidth 
                    margin="normal"
                    error={!!errors.firstYearOrDirectSecondYear}
                >
                    <InputLabel id="admission-type-label">First Year/Direct Second Year</InputLabel>
                    <Select 
                        labelId="admission-type-label"
                        name="firstYearOrDirectSecondYear" 
                        value={formData.firstYearOrDirectSecondYear} 
                        onChange={handleChange}
                        label="First Year/Direct Second Year"
                    >
                        <MenuItem value="First Year">First Year</MenuItem>
                        <MenuItem value="Direct Second Year">Direct Second Year</MenuItem>
                    </Select>
                    {errors.firstYearOrDirectSecondYear && 
                        <Typography color="error" variant="caption">{errors.firstYearOrDirectSecondYear}</Typography>}
                </FormControl>
                
                <TextField 
                    required
                    fullWidth 
                    label="SSC Percentage" 
                    name="sscPercentage" 
                    type="number"
                    inputProps={{ step: "0.01", min: "0", max: "100" }}
                    value={formData.sscPercentage} 
                    onChange={handleChange} 
                    margin="normal"
                    error={!!errors.sscPercentage}
                    helperText={errors.sscPercentage}
                />
                
                <TextField 
                    fullWidth 
                    label="HSC Percentage" 
                    name="hscPercentage" 
                    type="number"
                    inputProps={{ step: "0.01", min: "0", max: "100" }}
                    value={formData.hscPercentage} 
                    onChange={handleChange} 
                    margin="normal"
                    error={!!errors.hscPercentage}
                    helperText={errors.hscPercentage}
                />
                
                <TextField 
                    fullWidth 
                    label="Diploma Percentage" 
                    name="diplomaPercentage" 
                    type="number"
                    inputProps={{ step: "0.01", min: "0", max: "100" }}
                    value={formData.diplomaPercentage} 
                    onChange={handleChange} 
                    margin="normal"
                    error={!!errors.diplomaPercentage}
                    helperText={errors.diplomaPercentage}
                />
                
                <TextField 
                    required
                    fullWidth 
                    label="FE Sem 1 Percentage" 
                    name="feSem1" 
                    type="number"
                    inputProps={{ step: "0.01", min: "0", max: "100" }}
                    value={formData.feSem1} 
                    onChange={handleChange} 
                    margin="normal"
                    error={!!errors.feSem1}
                    helperText={errors.feSem1}
                />
                
                <TextField 
                    required
                    fullWidth 
                    label="FE Sem 2 Percentage" 
                    name="feSem2" 
                    type="number"
                    inputProps={{ step: "0.01", min: "0", max: "100" }}
                    value={formData.feSem2} 
                    onChange={handleChange} 
                    margin="normal"
                    error={!!errors.feSem2}
                    helperText={errors.feSem2}
                />
                
                <TextField 
                    required
                    fullWidth 
                    label="SE Sem 3 Percentage" 
                    name="seSem3" 
                    type="number"
                    inputProps={{ step: "0.01", min: "0", max: "100" }}
                    value={formData.seSem3} 
                    onChange={handleChange} 
                    margin="normal"
                    error={!!errors.seSem3}
                    helperText={errors.seSem3}
                />
                
                <TextField 
                    required
                    fullWidth 
                    label="SE Sem 4 Percentage" 
                    name="seSem4" 
                    type="number"
                    inputProps={{ step: "0.01", min: "0", max: "100" }}
                    value={formData.seSem4} 
                    onChange={handleChange} 
                    margin="normal"
                    error={!!errors.seSem4}
                    helperText={errors.seSem4}
                />
                
                <TextField 
                    required
                    fullWidth 
                    label="TE Sem 5 Percentage" 
                    name="teSem5" 
                    type="number"
                    inputProps={{ step: "0.01", min: "0", max: "100" }}
                    value={formData.teSem5} 
                    onChange={handleChange} 
                    margin="normal"
                    error={!!errors.teSem5}
                    helperText={errors.teSem5}
                />
                
                <TextField 
                    required
                    fullWidth 
                    label="TE Sem 6 Percentage" 
                    name="teSem6" 
                    type="number"
                    inputProps={{ step: "0.01", min: "0", max: "100" }}
                    value={formData.teSem6} 
                    onChange={handleChange} 
                    margin="normal"
                    error={!!errors.teSem6}
                    helperText={errors.teSem6}
                />
                
                <TextField 
                    required
                    fullWidth 
                    label="Active Backlogs" 
                    name="activeBacklogs" 
                    type="number"
                    inputProps={{ min: "0" }}
                    value={formData.activeBacklogs} 
                    onChange={handleChange} 
                    margin="normal"
                    error={!!errors.activeBacklogs}
                    helperText={errors.activeBacklogs}
                />
                
                <TextField 
                    required
                    fullWidth 
                    label="Number of Year Down" 
                    name="numOfYD" 
                    type="number"
                    inputProps={{ min: "0" }}
                    value={formData.numOfYD} 
                    onChange={handleChange} 
                    margin="normal"
                    error={!!errors.numOfYD}
                    helperText={errors.numOfYD}
                />
                
                <TextField 
                    required
                    fullWidth 
                    label="Career Objective" 
                    name="careerObjective" 
                    value={formData.careerObjective} 
                    onChange={handleChange} 
                    margin="normal"
                    multiline
                    rows={4}
                    error={!!errors.careerObjective}
                    helperText={errors.careerObjective}
                />

                <FormControl 
                    required 
                    fullWidth 
                    margin="normal"
                    error={!!errors.onCampusPlacement}
                >
                    <InputLabel id="placement-label">Interested in On-Campus Placement</InputLabel>
                    <Select 
                        labelId="placement-label"
                        name="onCampusPlacement" 
                        value={formData.onCampusPlacement} 
                        onChange={handleChange}
                        label="Interested in On-Campus Placement"
                    >
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                    </Select>
                    {errors.onCampusPlacement && 
                        <Typography color="error" variant="caption">{errors.onCampusPlacement}</Typography>}
                </FormControl>

                <FormControl 
                    required 
                    fullWidth 
                    margin="normal"
                    error={!!errors.onCampusTraining}
                >
                    <InputLabel id="training-label">Interested in On-Campus Training</InputLabel>
                    <Select 
                        labelId="training-label"
                        name="onCampusTraining" 
                        value={formData.onCampusTraining} 
                        onChange={handleChange}
                        label="Interested in On-Campus Training"
                    >
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                    </Select>
                    {errors.onCampusTraining && 
                        <Typography color="error" variant="caption">{errors.onCampusTraining}</Typography>}
                </FormControl>
                
                <TextField 
                    required
                    fullWidth 
                    label="Offers Held" 
                    name="offers" 
                    type="number"
                    inputProps={{ min: "0" }}
                    value={formData.offers} 
                    onChange={handleChange} 
                    margin="normal"
                    error={!!errors.offers}
                    helperText={errors.offers}
                />
                
                <TextField 
                    required
                    fullWidth 
                    label="LinkedIn Account" 
                    name="linkedinAccount" 
                    value={formData.linkedinAccount} 
                    onChange={handleChange} 
                    margin="normal"
                    error={!!errors.linkedinAccount}
                    helperText={errors.linkedinAccount}
                />
                
                <TextField 
                    required
                    fullWidth 
                    label="Known Technologies" 
                    name="techknown" 
                    value={formData.techknown} 
                    onChange={handleChange} 
                    margin="normal"
                    error={!!errors.techknown}
                    helperText={errors.techknown}
                />
                
                <TextField 
                    required
                    fullWidth 
                    label="Known Languages" 
                    name="langknown" 
                    value={formData.langknown} 
                    onChange={handleChange} 
                    margin="normal"
                    error={!!errors.langknown}
                    helperText={errors.langknown}
                />
                
                <FormControl 
                    required 
                    fullWidth 
                    margin="normal"
                    error={!!errors.relocate}
                >
                    <InputLabel id="relocate-label">Willing to Relocate</InputLabel>
                    <Select 
                        labelId="relocate-label"
                        name="relocate" 
                        value={formData.relocate} 
                        onChange={handleChange}
                        label="Willing to Relocate"
                    >
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                    </Select>
                    {errors.relocate && <Typography color="error" variant="caption">{errors.relocate}</Typography>}
                </FormControl>
                
                <FormControl 
                    required 
                    fullWidth 
                    margin="normal"
                    error={!!errors.cv}
                >
                    <Typography variant="subtitle1" gutterBottom>Upload CV (PDF, JPG, PNG) *</Typography>
                    <input
                        accept=".pdf,.jpg,.jpeg,.png"
                        type="file"
                        name="cv"
                        onChange={handleChange}
                        ref={cvInputRef}
                        style={{ marginTop: "8px" }}
                    />
                    {errors.cv && <Typography color="error" variant="caption">{errors.cv}</Typography>}
                </FormControl>
                
                <FormControl 
                    required 
                    fullWidth 
                    margin="normal"
                    error={!!errors.photo}
                >
                    <Typography variant="subtitle1" gutterBottom>Upload Photo (JPG, PNG) *</Typography>
                    <input
                        accept=".jpg,.jpeg,.png"
                        type="file"
                        name="photo"
                        onChange={handleChange}
                        ref={photoInputRef}
                        style={{ marginTop: "8px" }}
                    />
                    {errors.photo && <Typography color="error" variant="caption">{errors.photo}</Typography>}
                </FormControl>
                
                <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary" 
                    fullWidth 
                    sx={{ mt: 3, mb: 2, py: 1.5 }}
                    disabled={submitStatus.status === "loading"}
                >
                    {submitStatus.status === "loading" ? "Submitting..." : "Submit"}
                </Button>
            </form>
        </Box>
    );
};

export default PlacementForm;