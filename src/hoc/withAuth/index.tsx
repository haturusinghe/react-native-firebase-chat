import * as React from 'react';

export const withAuth = ({
  WrappedComponent,
}: {
  WrappedComponent: React.ComponentType;
}) => {
  React.useEffect(() => {
    // check state on the redux
  }, []);

  return (props: any) => <WrappedComponent {...props} />;
};
