// Slider.jsx
import PropTypes from 'prop-types';

const Slider = ({ value, onChange }) => {
    return (
        <input
            type="range"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    );
};

Slider.propTypes = {
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
};

export { Slider };
