import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import propTypes from 'prop-types';

class App extends React.Component {    
    constructor (props) {
        super (props);

    }
    render () {
        return (
            <MuiThemeProvider>
                <div style={{width: '100%', height: '100vp'}}>
                    <span>helloooooo</span>
                    {this.props.children}
                </div>
            </MuiThemeProvider>
        );
    }
}

App.propTypes = {
    children: React.PropTypes.object.isRequired
};

export default App;