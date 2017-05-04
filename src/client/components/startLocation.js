import React from 'react';
import mui from 'material-ui';

import PersonPin from 'react-material-icons/icons/maps/person-pin';

const StartLocation = (props) => {
    
    const RunnerLocation = ({ text }) => <div>{text}</div>;

    return (
        <PersonPin >
        </PersonPin >
    );
};

export default StartLocation;