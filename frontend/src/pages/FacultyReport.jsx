import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { Printer, Search } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { useState, useEffect } from 'react';

const FacultyReport = () => {
    const [facultyData, setFacultyData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDepartment, setFilterDepartment] = useState('all');

    const columnNames = ["Sr. No", "Faculty Name", "Department", "Designation", "Qualification",
        "Gender", "Category", "Caste", "Birth Date", "Pan No", "Aadhar No", "Mobile No", "Email ID",
        "Biometric No", "Correspondence Address", "Permanent Address", "Date of Appointment", "Date of Joining",
        "First Post", "Date of Retirement", "Subject Specialization", "Date of Highest Qualification", "University",
        "Teaching Experience", "Pay Scale", "Additional Pay", "Bank Name", "Bank IFSC", "Bank Account",
        "University Approval Letter No", "University Approval Date", "Appointment as Principal Date", "DBATU Approval Number",
        "DBATU Approval Date", "Papers National", "Papers International", "Books National", "Books International",
        "Conference National", "Conference International", "Citation Index", "Patents Details", "Signature"];

    // Fetch faculty data from backend
    useEffect(() => {
        fetch('http://localhost:7002/api/faculty')
            .then(response => response.json())
            .then(data => {
                setFacultyData(data);
                console.log('Faculty data:', data);
            })
            .catch(error => {
                console.error('Error fetching faculty data:', error);
            });
    }, []);

    const generateReport = () => {
        fetch('http://localhost:5000/generate-excel')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.blob();
            })
            .then(blob => {
                // Create a URL for the blob object
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'generated_file.xlsx'); // Specify the file name
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link); // Clean up the link element
            })
            .catch(error => {
                console.error('Error downloading the file:', error);
            });
    };

    const printReport = () => {
        window.print();
    };

    // Filter faculty data based on search and department filter
    const filteredFacultyData = facultyData.filter(faculty => {
        return (
            (faculty.facultyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                faculty.department.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (filterDepartment === 'all' || faculty.department === filterDepartment)
        );
    });

    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <span className="mr-9">Faculty Report Generation System</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex gap-4 mb-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Search faculty..."
                            className="pl-10 py-2 w-96"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex gap-4 mb-4">
                    <select
                        className="px-4 py-2 border rounded bg-white border-black"
                        value={filterDepartment}
                        onChange={(e) => setFilterDepartment(e.target.value)}
                    >
                        <option value="all">All Departments</option>
                        <option value="cs">Computer Science</option>
                        <option value="mech">Mechanical</option>
                        <option value="civil">Civil</option>
                    </select>
                </div>
                <div className='flex gap-4 mb-4'>
                    <Button
                        onClick={generateReport}
                        className="py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Generate Report
                    </Button>
                    <Button
                        onClick={printReport}
                        className="p-2 px-8 text-gray-600 hover:text-gray-800"
                    >
                        <Printer className="w-5 h-5" />
                    </Button>
                </div>
                <div className="overflow-hidden rounded-lg border">
                    <table className="w-full border-collapse">
                        <thead className='bg-[#8165FC] text-white'>
                            <tr>
                                {columnNames.map((columnName, index) => (
                                    <th key={index} className="p-4 border">{columnName}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredFacultyData.map((faculty, index) => (
                                <tr key={faculty.id} className="hover:bg-gray-50">
                                    <td className="p-4 border">{index + 1}</td>
                                    <td className="p-4 border">{faculty.facultyName}</td>
                                    <td className="p-4 border">{faculty.department}</td>
                                    <td className="p-4 border">{faculty.designation}</td>
                                    <td className="p-4 border">{faculty.qualification}</td>
                                    <td className="p-4 border">{faculty.gender}</td>
                                    <td className="p-4 border">{faculty.category}</td>
                                    <td className="p-4 border">{faculty.caste}</td>
                                    <td className="p-4 border">{faculty.birthDate}</td>
                                    <td className="p-4 border">{faculty.panNo}</td>
                                    <td className="p-4 border">{faculty.aadharNo}</td>
                                    <td className="p-4 border">{faculty.mobileNo}</td>
                                    <td className="p-4 border">{faculty.emailId}</td>
                                    <td className="p-4 border">{faculty.biometricNo}</td>
                                    <td className="p-4 border">{faculty.correspondenceAddress}</td>
                                    <td className="p-4 border">{faculty.permanentAddress}</td>
                                    <td className="p-4 border">{faculty.dateOfAppointment}</td>
                                    <td className="p-4 border">{faculty.dateOfJoining}</td>
                                    <td className="p-4 border">{faculty.firstPost}</td>
                                    <td className="p-4 border">{faculty.dateOfRetirement}</td>
                                    <td className="p-4 border">{faculty.subjectSpecialization}</td>
                                    <td className="p-4 border">{faculty.dateOfHighestQualification}</td>
                                    <td className="p-4 border">{faculty.university}</td>
                                    <td className="p-4 border">{faculty.teachingExperience}</td>
                                    <td className="p-4 border">{faculty.payScale}</td>
                                    <td className="p-4 border">{faculty.additionalPay}</td>
                                    <td className="p-4 border">{faculty.bankName}</td>
                                    <td className="p-4 border">{faculty.bankIfsc}</td>
                                    <td className="p-4 border">{faculty.bankAccount}</td>
                                    <td className="p-4 border">{faculty.universityApprovalLetterNo}</td>
                                    <td className="p-4 border">{faculty.universityApprovalDate}</td>
                                    <td className="p-4 border">{faculty.appointmentAsPrincipalDate}</td>
                                    <td className="p-4 border">{faculty.dbatuApprovalNumber}</td>
                                    <td className="p-4 border">{faculty.dbatuApprovalDate}</td>
                                    <td className="p-4 border">{faculty.papersNational}</td>
                                    <td className="p-4 border">{faculty.papersInternational}</td>
                                    <td className="p-4 border">{faculty.booksNational}</td>
                                    <td className="p-4 border">{faculty.booksInternational}</td>
                                    <td className="p-4 border">{faculty.conferenceNational}</td>
                                    <td className="p-4 border">{faculty.conferenceInternational}</td>
                                    <td className="p-4 border">{faculty.citationIndex}</td>
                                    <td className="p-4 border">{faculty.patentsDetails}</td>
                                    <td className="p-4 border">{faculty.signature}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
};

export default FacultyReport;
