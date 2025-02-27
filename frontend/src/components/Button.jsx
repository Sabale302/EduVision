import PropTypes from "prop-types";

export const Button = ({ children, onClick, className = "" }) => {
    return (
        <button
            onClick={onClick}
            className={`text-white ${className}`}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
    className: PropTypes.string, // Optional prop for custom styling
};
