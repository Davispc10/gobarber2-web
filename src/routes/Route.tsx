/* eslint-disable multiline-ternary */
/* eslint-disable indent */
import React from 'react';
import { Route as ReactDOMRoute, RouteProps, Redirect } from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface IRouteProps extends RouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<IRouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  console.log(user);
  console.log(isPrivate);
  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location }
            }}
          />
        );
      }}
    />
  );
};

export default Route;
