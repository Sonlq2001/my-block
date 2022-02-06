import React, { FC } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { RouteItemDef } from './../types/routes.types';
import DefaultLayout from './../layouts/DefaultLayout/DefaultLayout';
import { LIST_ROUTES } from './routes.config';
import { store } from './../redux/store';

const RouteWrapper: FC<RouteItemDef> = ({
  id,
  component: Component,
  layout,
  path,
  isAuthRoute,
  isExact,
}) => {
  const auth = !!store.getState().auth.accessToken;

  const RouteLayout: FC = layout || DefaultLayout;

  if (!auth && !isAuthRoute) {
    return <Redirect key="AUTH_ROUTE" to="/login" />;
  }

  if (auth && isAuthRoute) {
    return <Redirect key="ROOT_ROUTE" to="/" />;
  }

  const result = isExact ? true : false;

  return (
    <Route
      key={id}
      exact={result}
      path={path}
      render={(props): React.ReactElement => {
        const Content = (): JSX.Element => {
          return (
            <RouteLayout>
              <Component {...props} />
            </RouteLayout>
          );
        };
        return <Content />;
      }}
    />
  );
};

const Routes: FC = () => {
  return (
    <Switch>
      {LIST_ROUTES.map((route) => {
        return <RouteWrapper key={route.id} {...route} />;
      })}
    </Switch>
  );
};

export default Routes;
