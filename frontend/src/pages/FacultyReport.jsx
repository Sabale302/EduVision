import { Printer, Search } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { CSVLink } from 'react-csv';

const FacultyReport = () => {
  const [facultyData, setFacultyData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [loading, setLoading] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const columnNames = [
    "Sr. No", "Faculty Name", "Department", "Designation", "Qualification",
    "Gender", "Category", "Caste", "Birth Date", "Pan No", "Aadhar No", "Mobile No",
    "Email ID", "Biometric No", "Correspondence Address", "Permanent Address",
    "Date of Appointment", "Date of Joining", "First Post", "Date of Retirement",
    "Subject Specialization", "Date of Highest Qualification", "University",
    "Teaching Experience", "Pay Scale", "Additional Pay", "Bank Name", "Bank IFSC",
    "Bank Account", "University Approval Letter No", "University Approval Date",
    "Appointment as Principal Date", "DBATU Approval Number", "DBATU Approval Date",
    "Papers National", "Papers International", "Books National", "Books International",
    "Conference National", "Conference International", "Citation Index", "Patents Details",
    "Signature"
  ];

  useEffect(() => {
    fetch('https://eduvision-r00l.onrender.com/api/faculty')
      .then(res => res.json())
      .then(data => {
        setFacultyData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching faculty data:', err);
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

  const csvData = filteredFacultyData.map((faculty, index) => ({
    "Sr. No": index + 1,
    ...faculty
  }));

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Faculty Report Generation System</h2>

      <div className="flex flex-wrap gap-4 mb-4">
        <div className="relative flex-1 min-w-[250px]">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search faculty..."
            className="pl-10 py-2 w-full border rounded-md shadow-sm text-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          className="px-4 py-2 border rounded bg-white text-black border-gray-400"
          value={filterDepartment}
          onChange={(e) => setFilterDepartment(e.target.value)}
        >
          <option value="all">All Departments</option>
          {departmentOptions.map((dept, idx) => (
            <option key={idx} value={dept}>{dept}</option>
          ))}
        </select>
      </div>

      <div className="flex gap-4 mb-4">
        <CSVLink
          headers={csvHeaders}
          data={csvData}
          filename="faculty_data.csv"
          className="py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Download CSV
        </CSVLink>

        <button
          onClick={printReport}
          className="p-2 px-4 text-gray-600 hover:text-gray-800 flex items-center"
        >
          <Printer className="w-5 h-5 mr-2" /> Print
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-500">Loading faculty data...</div>
      ) : (
        <div className="overflow-x-auto border rounded-lg bg-white">
          {filteredFacultyData.length === 0 ? (
            <div className="text-center p-6 text-gray-500">No faculty records found.</div>
          ) : (
            <>
              <table className="w-full border-collapse text-sm text-black">
                <thead className="bg-blue-600 text-white text-xs">
                  <tr>
                    {columnNames.map((columnName, index) => (
                      <th key={index} className="p-2 border whitespace-nowrap">{columnName}</th>
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
                      {/* you can map the rest like this */}
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination Controls */}
              <div className="flex justify-center items-center gap-4 py-4">
                <button
                  className="px-4 py-1 border rounded hover:bg-gray-100"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
                <span className="text-sm font-medium">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="px-4 py-1 border rounded hover:bg-gray-100"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default FacultyReport;
