import {StackActions, useNavigation} from '@react-navigation/native';
import React, {FC, useEffect, ComponentType} from 'react';
import {LoadingWrapper} from '../../components/LoadingWrapper';
import {routes} from '../../constants';
import {useAppSelector} from '../../hooks/useRedux';

export function withoutAuth<P>(WrappedComponent: ComponentType<P>): FC<P> {
  const VisibityControlled = (props: any) => {
    const {authenticated, user, loading} = useAppSelector(store => store.user);
    const navigation = useNavigation();

    useEffect(() => {
      checkPermission();
    }, [authenticated, loading]);

    const checkPermission = () => {
      if (authenticated === true && !loading) {
        if (navigation.canGoBack()) {
          navigation.goBack();
        } else {
          navigation.dispatch(StackActions?.replace(routes.home));
        }
        return;
      }
    };
    return (
      <LoadingWrapper loading={loading}>
        <WrappedComponent {...props} />
      </LoadingWrapper>
    );
  };
  return VisibityControlled;
}
