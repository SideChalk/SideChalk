import React                from 'react';
import ReactDOM             from 'react-dom';
import Root                 from './containers/Root';
import configureStore       from './stores';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import immutable from 'immutable';
window.__INITIAL_STATE__ = immutable.fromJS({});

const target = document.getElementById('root');
const store  = configureStore(window.__INITIAL_STATE__, __DEBUG__);

const node = (
  <Root store={store}
        history={createBrowserHistory()}
        debug={__DEBUG__}
        debugExternal={__DEBUG_NW__} />
);

ReactDOM.render(node, target);
