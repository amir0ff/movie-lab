import { FunctionComponent } from 'react';

export type PrivateRouteComponentType = {
  component: FunctionComponent;
  path: string;
  exact: boolean;
  pathname: string;
};
