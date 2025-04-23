import { Printer, Search } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { CSVLink } from 'react-csv';
import { Box, Typography, TextField, InputAdornment, MenuItem, Button, Grid} from "@mui/material";

const FacultyReport = () => {
  const [facultyData, setFacultyData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [loading, setLoading] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const columnNames = [
    "Sr. No", "Faculty Name", "Department", "Designation", "Qualification", "Gender",
    "Category", "Caste", "Birth Date", "Pan No", "Aadhar No", "Mobile No", "Email ID",
    "Biometric No", "Correspondence Address", "Permanent Address", "Date of Appointment",
    "Date of Joining", "First Post", "Date of Retirement", "Subject Specialization",
    "Date of Highest Qualification", "University", "Teaching Experience", "Pay Scale",
    "Additional Pay", "Bank Name", "Bank IFSC", "Bank Account",
    "University Approval Letter No", "University Approval Date", "Appointment as Principal Date",
    "DBATU Approval Number", "DBATU Approval Date", "Papers National", "Papers International",
    "Books National", "Books International", "Conference National", "Conference International",
    "Citation Index", "Patents Details", "Signature"
  ];

  useEffect(() => {
    fetch('https://eduvision-r00l.onrender.com/api/faculty')
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then(data => {
        setFacultyData(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching faculty data:', err);
        setFacultyData([]); // Prevent crash
        setLoading(false);
      });
  }, []);
  

  const departmentOptions = useMemo(() => {
    const uniqueDepts = [...new Set(facultyData.map(f => f.department))];
    return uniqueDepts.sort();
  }, [facultyData]);

  const filteredFacultyData = useMemo(() => {
    return facultyData.filter(faculty =>
      (faculty.facultyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faculty.department?.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterDepartment === 'all' || faculty.department === filterDepartment)
    );
  }, [facultyData, searchTerm, filterDepartment]);

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredFacultyData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredFacultyData.length / rowsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const printReport = () => {
    window.print();
  };

  const csvHeaders = columnNames.map((col) => ({ label: col, key: col }));
  const csvData = filteredFacultyData.map((faculty, index) => ({ "Sr. No": index + 1, ...faculty }));

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: "auto", my: 4 }}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Faculty Report Generation System
      </Typography>

      {/* Search + Filter Row */}
      <Grid container spacing={3} alignItems="center" mb={3}>
        <Grid item xs={12} md={7}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search faculty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={20} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} md={5}>
          <TextField
            select
            fullWidth
            label="Department"
            variant="outlined"
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
          >
            <MenuItem value="all">All Departments</MenuItem>
            {departmentOptions.map((dept, idx) => (
              <MenuItem key={idx} value={dept}>{dept}</MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <CSVLink
          headers={csvHeaders}
          data={csvData}
          filename="faculty_data.csv"
          style={{ textDecoration: 'none' }}
        >
          <Button variant="contained" color="success">Download CSV</Button>
        </CSVLink>

        <Button
          variant="outlined"
          color="primary"
          onClick={printReport}
          startIcon={<Printer size={20} />}
        >
          Print
        </Button>
      </Box>

      {/* Table */}
      <div className="overflow-x-auto border rounded bg-white">
        {loading ? (
          <Typography sx={{ p: 4, textAlign: 'center', color: 'gray' }}>Loading faculty data...</Typography>
        ) : filteredFacultyData.length === 0 ? (
          <Typography sx={{ p: 4, textAlign: 'center', color: 'gray' }}>No faculty records found.</Typography>
        ) : (
          <>
            <table className="w-full border-collapse text-sm text-black">
              <thead className="bg-blue-600 text-white text-xs">
                <tr>
                  {columnNames.map((col, idx) => (
                    <th key={idx} className="p-2 border">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentRows.map((faculty, index) => (
                  <tr key={faculty.id} className="hover:bg-gray-100 text-center">
                    <td className="p-2 border">{indexOfFirstRow + index + 1}</td>
                    <td className="p-2 border">{faculty.facultyName}</td>
                    <td className="p-2 border">{faculty.department}</td>
                    <td className="p-2 border">{faculty.designation}</td>
                        <td className="p-2 border">{faculty.qualification}</td>
                        <td className="p-2 border">{faculty.gender}</td>
                        <td className="p-2 border">{faculty.category}</td>
                        <td className="p-2 border">{faculty.caste}</td>
                        <td className="p-2 border">{faculty.birthDate}</td>
                        <td className="p-2 border">{faculty.panNo}</td>
                        <td className="p-2 border">{faculty.aadharNo}</td>
                        <td className="p-2 border">{faculty.mobileNo}</td>
                        <td className="p-2 border">{faculty.emailId}</td>
                        <td className="p-2 border">{faculty.biometricNo}</td>
                        <td className="p-2 border">{faculty.correspondenceAddress}</td>
                        <td className="p-2 border">{faculty.permanentAddress}</td>
                        <td className="p-2 border">{faculty.dateOfAppointment}</td>
                        <td className="p-2 border">{faculty.dateOfJoining}</td>
                        <td className="p-2 border">{faculty.firstPost}</td>
                        <td className="p-2 border">{faculty.dateOfRetirement}</td>
                        <td className="p-2 border">{faculty.subjectSpecialization}</td>
                        <td className="p-2 border">{faculty.dateOfHighestQualification}</td>
                        <td className="p-2 border">{faculty.university}</td>
                        <td className="p-2 border">{faculty.teachingExperience}</td>
                        <td className="p-2 border">{faculty.payScale}</td>
                        <td className="p-2 border">{faculty.additionalPay}</td>
                        <td className="p-2 border">{faculty.bankName}</td>
                        <td className="p-2 border">{faculty.bankIfsc}</td>
                        <td className="p-2 border">{faculty.bankAccount}</td>
                        <td className="p-2 border">{faculty.universityApprovalLetterNo}</td>
                        <td className="p-2 border">{faculty.universityApprovalDate}</td>
                        <td className="p-2 border">{faculty.appointmentAsPrincipalDate}</td>
                        <td className="p-2 border">{faculty.dbatuApprovalNumber}</td>
                        <td className="p-2 border">{faculty.dbatuApprovalDate}</td>
                        <td className="p-2 border">{faculty.papersNational}</td>
                        <td className="p-2 border">{faculty.papersInternational}</td>
                        <td className="p-2 border">{faculty.booksNational}</td>
                        <td className="p-2 border">{faculty.booksInternational}</td>
                        <td className="p-2 border">{faculty.conferenceNational}</td>
                        <td className="p-2 border">{faculty.conferenceInternational}</td>
                        <td className="p-2 border">{faculty.citationIndex}</td>
                        <td className="p-2 border">{faculty.patentsDetails}</td>
                        <td className="p-2 border">{faculty.signature}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <Box display="flex" justifyContent="center" alignItems="center" gap={2} py={3}>
              <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Prev</Button>
              <Typography>Page {currentPage} of {totalPages}</Typography>
              <Button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</Button>
            </Box>
          </>
        )}
      </div>
    </Box>
  );
};

export default FacultyReport;