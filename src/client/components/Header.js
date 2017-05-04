import React from 'react';

import logo from '../../../public/logo-blue-bgTransparent';

const Header = (props) => {
    return (
        <div id='header'>
            <i>{logo}</i>
            <b>LostRunner</b>
        </div>
    );
};

export default Header;