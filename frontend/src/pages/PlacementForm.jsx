import { useState } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import Select from "react-select";
import languages from "../components/Languages"; // Import the language list

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

    const [selectedLanguages, setSelectedLanguages] = useState([]);

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

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files.length) {
            console.log(`File Uploaded: ${name}`, files[0]);
        }
    };

    const handleLanguageChange = (selectedOptions) => {
        setSelectedLanguages(selectedOptions || []);
        console.log("Selected Languages:", selectedOptions);
    };

    return (
        <div className="border-black w-auto">
            <div className="p-5 rounded shadow-lg">
                <h1 className="text-2xl font-semibold text-center mb-5">
                    Placement Information Form
                </h1>
                <form onSubmit={handleSubmit}>
                    {[
                        ["Full Name", "Email ID"],
                        ["Mobile Number", "Alternate Mobile Number"],
                        ["Roll No", "PRN No"],
                        ["Parent Name", "Parent Mobile No"],
                        ["Parent Occupation", "Your D.O.B"],
                        ["Address", "City"],
                    ].map((fields, idx) => (
                        <div className="flex gap-4 mb-4" key={idx}>
                            {fields.map((field) => (
                                <div key={field} className="flex-1">
                                    <label className="block mb-1">{field}:</label>
                                    <Input
                                        type={field === "Your D.O.B" ? "date" : "text"}
                                        name={field}
                                        value={formData[field]}
                                        onChange={handleChange}
                                        className="bg-white px-4 py-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-600"
                                    />
                                </div>
                            ))}
                        </div>
                    ))}

                    <div className="flex gap-4 mb-4 items-center">
                        {/* Branch Field */}
                        <div className="flex-1">
                            <label className="block mb-1 ">Branch:</label>
                            <Input
                                type="text"
                                name="branch"
                                value={formData.branch}
                                onChange={handleChange}
                                className="bg-white px-4 py-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-600"
                            />
                        </div>

                        {/* Gender Field */}
                        <div className="flex-1">
                            <label className="block mb-1 ">Gender:</label>
                            <div className="flex items-center gap-4">
                                {/* Male */}
                                <label className="flex items-center cursor-pointer">
                                    <Input
                                        type="radio"
                                        name="gender"
                                        value="Male"
                                        checked={formData.gender === "Male"}
                                        onChange={handleChange}
                                        className="hidden"
                                    />
                                    <span
                                        className={`w-5 h-5 rounded-full border-2 border-gray-400 flex justify-center items-center ${formData.gender === "Male" ? "bg-blue-600 border-blue-600" : ""
                                            }`}
                                    >
                                        {formData.gender === "Male" && (
                                            <span className="w-2.5 h-2.5 rounded-full bg-white"></span>
                                        )}
                                    </span>
                                    <span className="ml-2">Male</span>
                                </label>
                                {/* Female */}
                                <label className="flex items-center cursor-pointer">
                                    <Input
                                        type="radio"
                                        name="gender"
                                        value="Female"
                                        checked={formData.gender === "Female"}
                                        onChange={handleChange}
                                        className="hidden"
                                    />
                                    <span
                                        className={`w-5 h-5 rounded-full border-2 border-gray-400 flex justify-center items-center ${formData.gender === "Female" ? "bg-pink-500 border-pink-500" : ""
                                            }`}
                                    >
                                        {formData.gender === "Female" && (
                                            <span className="w-2.5 h-2.5 rounded-full bg-white"></span>
                                        )}
                                    </span>
                                    <span className="ml-2">Female</span>
                                </label>
                                {/* Other */}
                                <label className="flex items-center cursor-pointer">
                                    <Input
                                        type="radio"
                                        name="gender"
                                        value="Other"
                                        checked={formData.gender === "Other"}
                                        onChange={handleChange}
                                        className="hidden"
                                    />
                                    <span
                                        className={`w-5 h-5 rounded-full border-2 border-gray-400 flex justify-center items-center ${formData.gender === "Other" ? "bg-purple-600 border-purple-600" : ""
                                            }`}
                                    >
                                        {formData.gender === "Other" && (
                                            <span className="w-2.5 h-2.5 rounded-full bg-white"></span>
                                        )}
                                    </span>
                                    <span className="ml-2">Other</span>
                                </label>
                            </div>
                        </div>
                    </div>



                    {[
                        ["Year Of Passing", "First Year/Direct Second Year"],
                        ["SSC Percentage", "HSC Percentage"],
                        ["Diploma Percentage", "feSem1"],
                        ["feSem2", "seSem3"],
                        ["seSem4", "teSem5"],
                        ["teSem6", "Active Backlogs"],
                        ["Number Of YD", "Career Objective"],
                        ["Interested in onCampus Placement", "Interested in onCampus Training"],
                        ["Offers held", "Linkedin Account"],
                        ["Relocate", "Tech Known"],
                    ].map((fields, idx) => (
                        <div className="flex gap-4 mb-4" key={idx}>
                            {fields.map((field) => (
                                <div key={field} className="flex-1">
                                    <label className="block mb-1">{field}:</label>
                                    <Input
                                        type={field === "Your D.O.B" ? "date" : "text"}
                                        name={field}
                                        value={formData[field]}
                                        onChange={handleChange}
                                        className="bg-white px-4 py-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-600"
                                    />
                                </div>
                            ))}
                        </div>
                    ))}

                    {/* Languages Known */}
                    <div className="flex gap-4 mb-4 items-center">
                        <div className="flex-1">
                            <label className="block mb-2 font-semibold">Known Languages:</label>
                            <Select
                                options={languages} // The list of languages
                                isMulti // Enables multi-select
                                value={selectedLanguages} // Currently selected values
                                onChange={handleLanguageChange} // Handle selection
                                placeholder="Select programming languages..."
                                className="react-select-container"
                                classNamePrefix="react-select"
                            />
                        </div>
                    </div>


                    <div className="flex gap-4 mb-4 items-center">
                        {/* CV Upload */}
                        <div className="flex-1">
                            <label className="block mb-1">Upload CV:</label>
                            <Input
                                type="file"
                                name="cv"
                                onChange={handleFileChange}
                                accept=".pdf,.doc,.docx"
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                        </div>

                        {/* Photo Upload */}
                        <div className="flex-1">
                            <label className="block mb-1">Upload Photo:</label>
                            <Input
                                type="file"
                                name="photo"
                                onChange={handleFileChange}
                                accept="image/*"
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mt-5"
                    >
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default PlacementForm;