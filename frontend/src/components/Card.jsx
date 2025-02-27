import PropTypes from "prop-types";
import clsx from "classnames"; // Use clsx (lightweight alternative to classnames)

export const Card = ({ children, className }) => (
  <div className={clsx("border rounded-lg shadow p-4", className)}>
    {children}
  </div>
);

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export const CardHeader = ({ children, className }) => (
  <div className={clsx("border-b p-4", className)}>
    {children}
  </div>
);

CardHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export const CardTitle = ({ children, className }) => (
  <h2 className={clsx("text-lg font-semibold", className)}>
    {children}
  </h2>
);

CardTitle.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export const CardContent = ({ children, className }) => (
  <div className={clsx("p-4", className)}>
    {children}
  </div>
);

CardContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Card;
