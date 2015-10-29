import { Route, Redirect }   from 'react-router';
import React       from 'react';
import CoreLayout  from 'layouts/CoreLayout';
import ListView    from 'views/ListView';
import MapView    from 'views/MapView';

export default (
  <Route component={CoreLayout}>
    <Redirect from="/" to="/list" />
    <Route name='list' path='/list' component={ListView} />
    <Route name='map' path='/map' component={MapView} />
  </Route>
);
