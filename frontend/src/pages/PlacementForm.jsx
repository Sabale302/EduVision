import { useState } from "react";
import {
  Typography, TextField, Button, Radio, RadioGroup, FormControlLabel, FormLabel,
  FormControl, MenuItem, Select, InputLabel, Card, CardContent, CardHeader, Grid, Box
} from "@mui/material";

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
    <Box sx={{ p: 4, maxWidth: 900, mx: "auto" }}>
      <Card sx={{ p: 3 }}>
        <CardHeader title="Placement Information Form" />
        <CardContent>
          <form onSubmit={handleSubmit}>
            {/* Personal Details */}
            <Typography variant="h6" mb={2}>Personal Information</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Mobile" name="mobile" value={formData.mobile} onChange={handleChange} /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Alternate Mobile" name="alternateMobile" value={formData.alternateMobile} onChange={handleChange} /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Roll No" name="rollNo" value={formData.rollNo} onChange={handleChange} /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="PRN No" name="prnNO" value={formData.prnNO} onChange={handleChange} /></Grid>
              <Grid item xs={12}><TextField fullWidth label="Address" name="address" value={formData.address} onChange={handleChange} /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="City" name="city" value={formData.city} onChange={handleChange} /></Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Branch</InputLabel>
                  <Select name="branch" value={formData.branch} onChange={handleChange}>
                    <MenuItem value="CSE">Computer Science</MenuItem>
                    <MenuItem value="ECE">Electronics & Communication</MenuItem>
                    <MenuItem value="ME">Mechanical</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl>
                  <FormLabel>Gender</FormLabel>
                  <RadioGroup row name="gender" value={formData.gender} onChange={handleChange}>
                    <FormControlLabel value="Male" control={<Radio />} label="Male" />
                    <FormControlLabel value="Female" control={<Radio />} label="Female" />
                    <FormControlLabel value="Other" control={<Radio />} label="Other" />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>

            {/* Academic Details */}
            <Typography variant="h6" mt={4} mb={2}>Academic Information</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Year of Passing" name="yearOfPassing" value={formData.yearOfPassing} onChange={handleChange} /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="SSC %" name="sscPercentage" value={formData.sscPercentage} onChange={handleChange} /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="HSC %" name="hscPercentage" value={formData.hscPercentage} onChange={handleChange} /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Diploma %" name="diplomaPercentage" value={formData.diplomaPercentage} onChange={handleChange} /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="FE Sem 1" name="feSem1" value={formData.feSem1} onChange={handleChange} /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="FE Sem 2" name="feSem2" value={formData.feSem2} onChange={handleChange} /></Grid>
            </Grid>

            {/* Preferences */}
            <Typography variant="h6" mt={4} mb={2}>Preferences & Training</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>On-campus Placement</InputLabel>
                  <Select name="onCampusPlacement" value={formData.onCampusPlacement} onChange={handleChange}>
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>On-campus Training</InputLabel>
                  <Select name="onCampusTraining" value={formData.onCampusTraining} onChange={handleChange}>
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}><TextField fullWidth label="Career Objective" name="careerObjective" value={formData.careerObjective} onChange={handleChange} /></Grid>
            </Grid>

            {/* Uploads */}
            <Typography variant="h6" mt={4} mb={2}>Uploads</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button variant="contained" component="label">
                  Upload CV
                  <input type="file" hidden name="cv" onChange={handleChange} />
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" component="label">
                  Upload Photo
                  <input type="file" hidden name="photo" onChange={handleChange} />
                </Button>
              </Grid>
            </Grid>

            {/* Submit */}
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 4 }}>
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PlacementForm;
