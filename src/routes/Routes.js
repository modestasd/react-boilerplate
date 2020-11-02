import React from 'react';
import { Switch, Route } from 'react-router-dom';

import lazyLoading from '../utils/lazyLoading';
import routes from './constants';

const Home = lazyLoading(() => import('../pages/Home'), {fallback: <div>...Loading</div>});

const Routes = () => {
  return (
    <Switch>
        <Route exact path={routes.HOME} component={Home} />
    </Switch>
  );
};

export default Routes;
