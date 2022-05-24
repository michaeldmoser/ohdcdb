import { Card as BsCard } from 'react-bootstrap';

import PropTypes from 'utils/PropTypes';

const Card = ({ header, body, fullHeight = false }) => {
    return (
        <BsCard as='section' className={fullHeight && 'h-100'}>
            <BsCard.Header as='header'>{header}</BsCard.Header>
            <BsCard.Body>{body}</BsCard.Body>
        </BsCard>
    );
};
Card.propTypes = {
    header: PropTypes.oneOfType([
        PropTypes.element.isRequired,
        PropTypes.string.isRequired,
    ]),
    body: PropTypes.oneOfType([
        PropTypes.element.isRequired,
        PropTypes.string.isRequired,
    ]),
};

export default Card;
