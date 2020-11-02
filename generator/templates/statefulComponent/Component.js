import React,{ useState } from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from './COMPONENT_NAME.styles';

const COMPONENT_NAME = ({...props}) => {
    const [value, setValue] = useState(null);
    
    return (
        <Wrapper>
            Hello
        </Wrapper>
    )
};

COMPONENT_NAME.propTypes = {

};

COMPONENT_NAME.defaultProps = {

};

export default COMPONENT_NAME;

