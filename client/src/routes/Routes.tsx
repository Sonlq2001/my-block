import React, { FC, memo } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { RouteItemDef } from './../types/routes.types';
import DefaultLayout from './../layouts/DefaultLayout/DefaultLayout';
import { LIST_ROUTES } from './routes.config';
import { store } from './../redux/store';
import { HomePathsEnum } from 'features/home/home';
import { AuthPathsEnum } from 'features/auth/auth';

export const routeWrapper: FC<RouteItemDef> = ({
  id,
  component: Component,
  layout,
  path,
  isAuthRoute,
  isExact = false,
}) => {
  const RouteLayout: FC = layout || DefaultLayout;

  return (
    <Route
      exact={isExact}
      key={id}
      path={path}
      render={(props): React.ReactElement => {
        const auth = !!store.getState().auth.accessToken;
        if (!auth && !isAuthRoute) {
          return <Redirect key="AUTH_ROUTE" to={AuthPathsEnum.LOGIN} />;
        }

        if (auth && isAuthRoute) {
          return <Redirect key="ROOT_ROUTE" to={HomePathsEnum.ROOT} />;
        }

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
        return routeWrapper(route);
      })}
    </Switch>
  );
};

export default memo(Routes);
