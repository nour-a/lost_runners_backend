import React from 'react';

function Loading (props) {
    
    const isLoading = props.loading;

    if (!isLoading) {
        return <div>Hello User</div>;
    }
    return <div>Loading...</div>;
}

export default Loading;