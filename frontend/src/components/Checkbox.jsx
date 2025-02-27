// Checkbox.js
import PropTypes from 'prop-types';

export const Checkbox = ({ label, checked, onChange }) => {
    return (
        <label className="flex items-center space-x-2">
            <input type="checkbox" checked={checked} onChange={onChange} />
            <span>{label}</span>
        </label>
    );
};
Checkbox.propTypes = {
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
};

// CheckboxGroup.js
export const CheckboxGroup = ({ label, children }) => {
    return (
        <fieldset>
            <legend>{label}</legend>
            {children}
        </fieldset>
    );
}
CheckboxGroup.propTypes = {
    label: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};