import PropTypes from 'prop-types';

/**
 * App content container
 * @param {Element} param0 Children component
 * @returns Page content
 */
const Content = ({children}) => <div className="w-3/5">{children}</div>;
Content.propTypes = {
    children: PropTypes.element.isRequired
};

export default Content;