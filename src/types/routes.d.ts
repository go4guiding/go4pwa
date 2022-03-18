import { ComponentType } from 'react';
import { RouteProps as RouterRouteProps } from 'react-router-dom';

import { UserState } from './auth';
import { Role } from 'common';

export declare type RouteProps = RouterRouteProps & {
  name: string;
  type: Role | 'public';
  exact?: boolean;
  component: ComponentType<any>;
};

export declare type RoutesProps = {
  user: UserState;
  isAuthorised: boolean;
};
