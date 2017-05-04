import React from 'react';
import mui from 'material-ui';

import PersonPin from 'react-material-icons/icons/maps/person-pin';

const Marker = (props) => {

    const RunnerLocation = ({ text }) => <div>{text}</div>;

    const places = props.path.map(place => {
        const {id, lat, lng, time} = place;
        return (
            <RunnerLocation
                key={id}
                lat={lat}
                lng={lng}
                text={time}
            />
            );
        });
    return (
        <PersonPin>
            {places}
        </PersonPin>
    );
};

export default Marker;