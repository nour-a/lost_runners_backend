import React from 'react';

const RunInfo = (props) => {
        return (
            <div>
                Runner Info Below
                <div>
                    {props.run.run_id}
                    {props.run.destination}
                </div>
            </div>
        );
    };

export default RunInfo;