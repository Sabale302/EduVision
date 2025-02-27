// Label.jsx
import PropTypes from 'prop-types';

export const Label = ({ children }) => {
    return <label>{children}</label>;
};

Label.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Label;