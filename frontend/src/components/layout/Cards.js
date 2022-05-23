import { Card as BsCard } from 'react-bootstrap';

import PropTypes from 'utils/PropTypes';

const Card = ({ header, body }) => {
    return (
        <BsCard as='section'>
            <BsCard.Header as='header'>{header}</BsCard.Header>
            <BsCard.Body>{body}</BsCard.Body>
        </BsCard>
    );
};
Card.propTypes = {
    header: PropTypes.element,
    body: PropTypes.element,
};

export default Card;
