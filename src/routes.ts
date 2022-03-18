import { ComponentType } from 'react';
import { RouteProps as RouterRouteProps } from 'react-router-dom';

export type RouteProps = RouterRouteProps & {
  name: string;
  component: ComponentType<any>;
};

export const publicRoutes: RouteProps[] = [];
export const privateRoutes: RouteProps[] = [];
