import {useLinkTo} from '@react-navigation/native';
import React, {FC, useEffect, ComponentType} from 'react';
import {routes} from '../../constants';
import {useAppSelector} from '../../hooks/useRedux';

export function withoutAuth<P>(WrappedComponent: ComponentType<P>): FC<P> {
  const VisibityControlled = (props: any) => {
    const {authenticated, user} = useAppSelector(store => store.user);
    const linkTo = useLinkTo();

    useEffect(() => {
      checkPermission();
    }, [authenticated]);

    const checkPermission = () => {
      if (authenticated === true) {
        linkTo('/' + routes.home);
        return;
      }
    };
    return <WrappedComponent {...props} />;
  };
  return VisibityControlled;
}
