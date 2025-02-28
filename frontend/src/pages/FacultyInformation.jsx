import { useState, useEffect } from 'react';
import { TextField, Button, Card, CardContent, CardHeader, Typography, Grid } from '@mui/material';

const FacultyInformation = () => {
    const [facultyData, setFacultyData] = useState({
        facultyName: '', qualification: '', gender: '', designation: '', department: '', category: '', caste: '', birthDate: '', panNo: '', aadharNo: '', mobileNo: '', emailId: '', biometricNo: '',
        correspondenceAddress: '', permanentAddress: '',
        dateOfAppointment: '', dateOfJoining: '', firstPost: '', dateOfRetirement: '', subjectSpecialization: '', dateOfHighestQualification: '', university: '', teachingExp: '',
        payScale: '', additionalPay: '',
        bankName: '', bankIfsc: '', bankAccount: '',
        universityApprovalLetterNo: '', universityApprovalDate: '', appointmentAsPrincipalDate: '', dbatuApprovalNumber: '', dbatuApprovalDate: '',
        papersNational: '', papersInternational: '', booksNational: '', booksInternational: '', conferenceNational: '', conferenceInternational: '', citationIndex: '', patentsDetails: '',
        remark: '', signature: null,
    });
    
    const [signaturePreview, setSignaturePreview] = useState(null);

    useEffect(() => {
        return () => {
            if (signaturePreview) {
                URL.revokeObjectURL(signaturePreview);
            }
        };
    }, [signaturePreview]);

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file' && name === 'signature') {
            const file = files[0];
            setFacultyData(prev => ({ ...prev, signature: file }));
            setSignaturePreview(URL.createObjectURL(file));
        } else {
            setFacultyData(prev => ({ ...prev, [name]: value }));
        }
    };

    const saveInformation = () => {
        console.log(facultyData);
        fetch('http://localhost:7002/api/saveFacultyData', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(facultyData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert("Data Saved");
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const renderInput = (label, name, type = "text", required = true) => (
        <TextField
            fullWidth
            label={label}
            name={name}
            type={type}
            value={facultyData[name]}
            onChange={handleInputChange}
            required={required}
            variant="outlined"
            margin="normal"
        />
    );

    return (
        <div>
            <Typography variant="h4" fontWeight="bold" color="text.primary">
                Faculty Information
            </Typography>
            
            <Card sx={{ p: 3, maxWidth: 900, mx: 'auto', my: 4 }}>
                <CardHeader title={<Typography variant="h5">Personal Information</Typography>} />
                <CardContent>
                    <Grid container spacing={2}>
                        {renderInput("Faculty Name", "facultyName")}
                        {renderInput("Qualification", "qualification")}
                        {renderInput("Gender", "gender")}
                        {renderInput("Designation", "designation")}
                        {renderInput("Department", "department")}
                        {renderInput("Category", "category")}
                        {renderInput("Caste", "caste")}
                        {renderInput("Date of Birth (dd-mm-yyyy)", "birthDate")}
                        {renderInput("PAN No.", "panNo")}
                        {renderInput("Aadhar No.", "aadharNo")}
                        {renderInput("Mobile No.", "mobileNo")}
                        {renderInput("Email ID", "emailId")}
                        {renderInput("Biometric No.", "biometricNo")}
                    </Grid>
                </CardContent>
            </Card>

            <Card sx={{ p: 3, maxWidth: 900, mx: 'auto', my: 4 }}>
                <CardHeader title={<Typography variant="h5">Address Information</Typography>} />
                <CardContent>
                    <Grid container spacing={2}>
                        {renderInput("Correspondence Address", "correspondenceAddress")}
                        {renderInput("Permanent Address", "permanentAddress")}
                    </Grid>                 
                </CardContent>
            </Card>

            <Card sx={{ p: 3, maxWidth: 900, mx: 'auto', my: 4 }}>
                <CardHeader title={<Typography variant="h5">Appointment Details</Typography>} />
                <CardContent>
                    <Grid container spacing={2}>
                        {renderInput("Date of Appointment", "dateOfAppointment")}
                        {renderInput("Date of Joining", "dateOfJoining")}
                        {renderInput("First Post", "firstPost")}
                        {renderInput("Date of Retirement", "dateOfRetirement")}
                        {renderInput("Subject Specialization", "subjectSpecialization")}
                        {renderInput("Date of Highest Qualification", "dateOfHighestQualification")}
                        {renderInput("University", "university")}
                        {renderInput("Teaching Experience", "teachingExp")}
                    </Grid>                 
                </CardContent>
            </Card>

            <Card sx={{ p: 3, maxWidth: 900, mx: 'auto', my: 4 }}>
                <CardHeader title={<Typography variant="h5">Pay Details</Typography>} />
                <CardContent>
                    <Grid container spacing={2}>
                        {renderInput("Pay Scale", "payScale")}
                        {renderInput("Additional Pay", "additionalPay")}
                    </Grid>                 
                </CardContent>
            </Card>

            <Card sx={{ p: 3, maxWidth: 900, mx: 'auto', my: 4 }}>
                <CardHeader title={<Typography variant="h5">Bank Details</Typography>} />
                <CardContent>
                    <Grid container spacing={2}>
                        {renderInput("Bank Name", "bankName")}
                        {renderInput("Bank IFSC", "bankIfsc")}
                        {renderInput("Bank Account", "bankAccount")}
                    </Grid>                 
                </CardContent>
            </Card>

            <Card sx={{ p: 3, maxWidth: 900, mx: 'auto', my: 4 }}>
                <CardHeader title={<Typography variant="h5">Approval Details</Typography>} />
                <CardContent>
                    <Grid container spacing={2}>
                        {renderInput("University Approval Letter No.", "universityApprovalLetterNo")}
                        {renderInput("University Approval Date", "universityApprovalDate")}
                        {renderInput("Appointment as Principal Date", "appointmentAsPrincipalDate")}
                        {renderInput("DBATU Approval Number", "dbatuApprovalNumber")}
                        {renderInput("DBATU Approval Date", "dbatuApprovalDate")}
                    </Grid>                 
                </CardContent>
            </Card>

            <Card sx={{ p: 3, maxWidth: 900, mx: 'auto', my: 4 }}>
                <CardHeader title={<Typography variant="h5">Publications and Research</Typography>} />
                <CardContent>
                    <Grid container spacing={2}>
                        {renderInput("National Papers", "papersNational", "number")}
                        {renderInput("International Papers", "papersInternational", "number")}
                        {renderInput("National Books", "booksNational", "number")}
                        {renderInput("International Books", "booksInternational", "number")}
                        {renderInput("National Conference Papers", "conferenceNational", "number")}
                        {renderInput("International Conference Papers", "conferenceInternational", "number")}
                        {renderInput("Citation Index", "citationIndex", "number")}
                        {renderInput("Patents Details", "patentsDetails")}
                    </Grid>                 
                </CardContent>
            </Card>

            <Card sx={{ p: 3, maxWidth: 900, mx: 'auto', my: 4 }}>
                <CardHeader title={<Typography variant="h5">Additional Details</Typography>} />
                <CardContent>
                    <Grid container spacing={2}>
                        {renderInput("Remarks", "remark")}
                    </Grid> 

                    <Typography variant="h6" mt={3}>Upload Signature</Typography>
                    <input type="file" name="signature" accept="image/*" onChange={handleInputChange} />
                    {signaturePreview && (
                        <img src={signaturePreview} alt="Signature Preview" style={{ width: 100, height: 50, marginTop: 10 }} />
                    )}                
                </CardContent>
            </Card>

            <Button onClick={saveInformation} variant="contained" color="primary" >
            Save Information
            </Button>
        </div>
    );
};

export default FacultyInformation;