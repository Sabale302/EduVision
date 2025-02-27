import { useState ,useEffect} from 'react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { CardHeader, CardTitle, CardContent } from '../components/Card';


const FacultyInformation = () => {
    const [facultyData, setFacultyData] = useState({
        // Personal Information
     facultyName: '', qualification: '', gender: '', designation: '', department: '', category: '', caste: '', birthDate: '', panNo: '', aadharNo: '', mobileNo: '', emailId: '', biometricNo: '',

        // Address Information
        correspondenceAddress: '', permanentAddress: '',

        // Appointment Details
        dateOfAppointment: '', dateOfJoining: '', firstPost: '', dateOfRetirement: '', subjectSpecialization: '', dateOfHighestQualification: '', university: '', teachingExp: '',

        // Pay Details
        payScale: '', additionalPay: '',

        // Bank Details
        bankName: '', bankIfsc: '', bankAccount: '',

        // Approval Details
        universityApprovalLetterNo: '', universityApprovalDate: '', appointmentAsPrincipalDate: '', dbatuApprovalNumber: '', dbatuApprovalDate: '',

        // Publications
        papersNational: '', papersInternational: '', booksNational: '', booksInternational: '', conferenceNational: '', conferenceInternational: '', citationIndex: '', patentsDetails: '',

        // Additional Fields
        remark: '', signature: null,
    });
    const [signaturePreview, setSignaturePreview] = useState(null);

    useEffect(() => {
        // Cleanup function to revoke the URL when component unmounts or signaturePreview changes
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
            setSignaturePreview(URL.createObjectURL(file)); // Preview the image
        } else {
            setFacultyData(prev => ({ ...prev, [name]: value }));
        }
    };

    const saveInformation = () => {
        console.log(facultyData);

        fetch('http://localhost:7002/api/saveFacultyData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
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

    // Updated renderInput function with explicit label handling
    const renderInput = (label, name, type = "text", required = true) => (
        <div className="flex flex-col space-y-1">
            <label htmlFor={name} className="text-sm font-medium">{label}</label>
            <Input
                id={name}
                name={name}
                type={type}
                value={facultyData[name]}
                onChange={handleInputChange}
                required={required}
                className="px-4 py-2"
            />
        </div>
    );

    const renderTextArea = (label, name) => (
        <div className="flex flex-col space-y-1">
            <label htmlFor={name} className="text-sm font-medium">{label}</label>
            <textarea
                id={name}
                name={name}
                value={facultyData[name]}
                onChange={handleInputChange}
                className="w-full h-24 p-2 border rounded-md bg-white"
            />
        </div>
    );

    const renderImageUpload = (label, name) => (
        <div className="flex flex-col space-y-1">
            <label htmlFor={name} className="text-sm font-medium">{label}</label>
            <input
                id={name}
                name={name}
                type="file"
                accept="image/*"
                onChange={handleInputChange}
                className="border rounded-md p-2"
            />
            {signaturePreview && (
                <img src={signaturePreview} alt="Signature Preview" className="w-32 h-16 mt-2 border" />
            )}
        </div>
    );

    return (
        <div className="border-black w-auto">
            {/* Personal Information Card */}
            <div className="p-5 border rounded shadow-lg mb-10">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {renderInput("Faculty Name", "facultyName")}
                    {renderInput("Qualification", "qualification")}
                    {renderInput("Gender", "gender")}
                    {renderInput("Designation", "designation")}
                    {renderInput("Department", "department")}
                    {renderInput("Category", "category")}
                    {renderInput("Caste", "caste")}
                    {renderInput("Date of Birth", "birthDate")}
                    {renderInput("PAN No.", "panNo")}
                    {renderInput("Aadhar No.", "aadharNo")}
                    {renderInput("Mobile No.", "mobileNo")}
                    {renderInput("Email ID", "emailId")}
                    {renderInput("Biometric No.", "biometricNo")}
                </CardContent>
            </div>

            {/* Address Information Card */}
            <div className="p-5 border rounded shadow-lg my-10">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">Address Information</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {renderTextArea("Correspondence Address", "correspondenceAddress")}
                    {renderTextArea("Permanent Address", "permanentAddress")}
                </CardContent>
            </div>

            {/* Appointment Details Card */}
            <div className="p-5 border rounded shadow-lg my-10">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">Appointment Details</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {renderInput("Date of Appointment", "dateOfAppointment")}
                    {renderInput("Date of Joining", "dateOfJoining")}
                    {renderInput("First Post", "firstPost")}
                    {renderInput("Date of Retirement", "dateOfRetirement")}
                    {renderInput("Subject Specialization", "subjectSpecialization")}
                    {renderInput("Date of Highest Qualification", "dateOfHighestQualification")}
                    {renderInput("University", "university")}
                    {renderInput("Teaching Experience", "teachingExp")}
                </CardContent>
            </div>

            <div className="p-5 border rounded shadow-lg my-10">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">Pay Details</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {renderInput("Pay Scale", "payScale")}
                    {renderInput("Additional Pay", "additionalPay")}
                </CardContent>
            </div>

            <div className="p-5 border rounded shadow-lg my-10">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">Bank Details</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {renderInput("Bank Name", "bankName")}
                    {renderInput("Bank IFSC", "bankIfsc")}
                    {renderInput("Bank Account", "bankAccount")}
                </CardContent>
            </div>

            <div className="p-5 border rounded shadow-lg my-10">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">Approval Details</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {renderInput("University Approval Letter No.", "universityApprovalLetterNo")}
                    {renderInput("University Approval Date", "universityApprovalDate")}
                    {renderInput("Appointment as Principal Date", "appointmentAsPrincipalDate")}
                    {renderInput("DBATU Approval Number", "dbatuApprovalNumber")}
                    {renderInput("DBATU Approval Date", "dbatuApprovalDate")}
                </CardContent>
            </div>

            <div className="p-5 border rounded shadow-lg my-10">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">Publications and Research</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {renderInput("National Papers", "papersNational", "number")}
                    {renderInput("International Papers", "papersInternational", "number")}
                    {renderInput("National Books", "booksNational", "number")}
                    {renderInput("International Books", "booksInternational", "number")}
                    {renderInput("National Conference Papers", "conferenceNational", "number")}
                    {renderInput("International Conference Papers", "conferenceInternational", "number")}
                    {renderInput("Citation Index", "citationIndex", "number")}
                    {renderInput("Patents Details", "patentsDetails")}
                </CardContent>
            </div>

            <div className="p-5 border rounded shadow-lg my-10">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">Additional Details</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {renderTextArea("Remarks", "remark")}
                    {renderImageUpload("Signature", "signature")}
                </CardContent>
            </div>

            {/* Save button */}
            <Button onClick={saveInformation} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Save Information
            </Button>
        </div >
    );
};

export default FacultyInformation;
