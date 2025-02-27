import PropTypes from "prop-types";

export const Input = ({ label, value, placeholder, onChange, className = "", name, type = "text", required }) => {
    return (
        <div className="space-y-1 w-full"> {/* Ensure container takes full width */}
            {label && <label htmlFor={name} className="text-sm font-medium text-gray-700">{label}</label>}
            <input
                id={name}
                name={name}
                placeholder={placeholder}
                type={type}
                value={value}
                onChange={onChange}
                className={`w-full p-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
                required={required}
            />
        </div>
    );
};

Input.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    className: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    required: PropTypes.bool,
};
