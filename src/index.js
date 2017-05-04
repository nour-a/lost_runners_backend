import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './client/components/App';
import MapRunner from './client/components/MapRunner';
import NotFound from './client/components/NotFound';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path='/' component={App} >
            <IndexRoute component={MapRunner}/>
            <Route path='/runs/:runId' component={MapRunner} />
            <Route path='*' component={NotFound} />
        </Route >
    </Router>,
    document.getElementById('root')
);
