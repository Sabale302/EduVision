import { Printer, Search } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { CSVLink } from 'react-csv';
import {
  Box, Typography, TextField, InputAdornment,
  MenuItem, Button, Grid
} from "@mui/material";

const FacultyReport = () => {
  const [facultyData, setFacultyData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [loading, setLoading] = useState(true);
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
    fetch('https://eduvision-r00l.onrender.com/api/faculty/faculty')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then(data => {
        const cleaned = Array.isArray(data) ? data.map(faculty => {
          const cleanedFaculty = {};
          for (let key in faculty) {
            const value = faculty[key];
            cleanedFaculty[key] = (typeof value === 'object' && value !== null)
              ? JSON.stringify(value)
              : value ?? '';
          }
          return cleanedFaculty;
        }) : [];
        setFacultyData(cleaned);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching faculty data:', err);
        setFacultyData([]);
        setLoading(false);
      });
  }, []);

  const departmentOptions = useMemo(() => {
    return [...new Set(facultyData.map(f => f.department))].sort();
  }, [facultyData]);

  const filteredFacultyData = useMemo(() => {
    return facultyData.filter(faculty =>
      (faculty.facultyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faculty.department?.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterDepartment === 'all' || faculty.department === filterDepartment)
    );
  }, [facultyData, searchTerm, filterDepartment]);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredFacultyData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredFacultyData.length / rowsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const printReport = () => window.print();

  const csvHeaders = columnNames.map(col => ({ label: col, key: col }));
  const csvData = filteredFacultyData.map((faculty, index) => ({
    "Sr. No": index + 1,
    ...faculty
  }));

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: "auto", my: 4 }}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Faculty Report Generation System
      </Typography>

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

      <div className="overflow-x-auto border rounded bg-white">
        {loading ? (
          <Typography sx={{ p: 4, textAlign: 'center', color: 'gray' }}>
            Loading faculty data...
          </Typography>
        ) : filteredFacultyData.length === 0 ? (
          <Typography sx={{ p: 4, textAlign: 'center', color: 'gray' }}>
            No faculty records found.
          </Typography>
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
                  <tr key={faculty.id || index} className="hover:bg-gray-100 text-center">
                    {[
                      indexOfFirstRow + index + 1,
                      faculty.facultyName, faculty.department, faculty.designation,
                      faculty.qualification, faculty.gender, faculty.category,
                      faculty.caste, faculty.birthDate, faculty.panNo, faculty.aadharNo,
                      faculty.mobileNo, faculty.emailId, faculty.biometricNo,
                      faculty.correspondenceAddress, faculty.permanentAddress,
                      faculty.dateOfAppointment, faculty.dateOfJoining, faculty.firstPost,
                      faculty.dateOfRetirement, faculty.subjectSpecialization,
                      faculty.dateOfHighestQualification, faculty.university,
                      faculty.teachingExperience, faculty.payScale, faculty.additionalPay,
                      faculty.bankName, faculty.bankIfsc, faculty.bankAccount,
                      faculty.universityApprovalLetterNo, faculty.universityApprovalDate,
                      faculty.appointmentAsPrincipalDate, faculty.dbatuApprovalNumber,
                      faculty.dbatuApprovalDate, faculty.papersNational,
                      faculty.papersInternational, faculty.booksNational,
                      faculty.booksInternational, faculty.conferenceNational,
                      faculty.conferenceInternational, faculty.citationIndex,
                      faculty.patentsDetails, faculty.signature
                    ].map((val, i) => (
                      <td key={i} className="p-2 border">{String(val ?? '')}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

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
