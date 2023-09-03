import PropType from 'prop-types';

/**
 * InvalidText component
 * @param {object} param0 contain invalid text
 * @returns invalid text
 */
const InvalidText = ({text}) => {
    return (
        <span className="text-invalid">{text}</span>
    )
};
InvalidText.propTypes = {
    text: PropType.string.isRequired
};

export default InvalidText;