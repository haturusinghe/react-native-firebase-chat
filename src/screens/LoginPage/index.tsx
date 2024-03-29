import * as React from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import {ACCESS_TOKEN, API_ROUTES, colors, routes} from '../../constants';
import {InputField} from '../../components/InputField';
import {StackActions, useNavigation} from '@react-navigation/native';
import {X_Button} from '../../components/Button';
import {Button, CheckBox} from 'react-native-elements';
import {Image} from 'react-native';
import {styles} from './style';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {useMutation} from '../../hooks/useMutate';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoadingType, LoadingWrapper} from '../../components/LoadingWrapper';
import {useAppDispatch} from '../../hooks/useRedux';
import {userSlice} from '../../store/user';
import {withoutAuth} from '../../hoc/withoutAuth';
import OneSignal from 'react-native-onesignal';

interface LoginType {
  email: string;
  password: string;
  keepMeSignedIn: boolean;
}

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Badly formatted email')
    .required('Email is Required'),
  password: yup.string().required('Password is Required'),
});

const LoginPage: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(true);
  const {loading, mutate} = useMutation({url: API_ROUTES.USER.LOGIN});
  const [resStatus, setresStatus] = React.useState<any>(undefined);
  const windowsWidth = Dimensions.get('window').width;

  const handleLogin = async (values: LoginType, setErrors: any) => {
    try {
      const onesignalData = await OneSignal.getDeviceState();
      const res = await mutate({
        email: values.email,
        password: values.password,
        deviceId: onesignalData?.userId,
      });
      if (res.success) {
        if (values.keepMeSignedIn) {
          AsyncStorage.setItem(ACCESS_TOKEN, res.data?.data?.token);
        }
        dispatch(
          userSlice.actions.setUser({
            ...res.data.data.user,
            token: res.data?.data?.token,
          }),
        );
      } else {
        setErrors({
          email: 'Invalid Credentials',
          password: 'Invalid Credentials',
        });
      }
      setresStatus(res.errors);
    } catch (error) {
      console.log({error});
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        backgroundColor={colors.primary_dark}
        barStyle={'light-content'}
      />
      <LoadingWrapper loading={loading} type={LoadingType.OVERLAY}>
        <ScrollView style={[styles.scrollview]}>
          <View>
            <KeyboardAvoidingView
              style={{
                paddingTop: 40,
                paddingHorizontal: 30,
                borderRadius: 10,
                // height: maskHeight,
              }}>
              <View
                style={{
                  alignItems: 'center',
                }}>
                <Image
                  resizeMode="contain"
                  source={require('../../assets/images/LOGO.jpg')}
                  style={[styles.image, {maxWidth: windowsWidth - 75}]}
                />
              </View>
              <Formik
                validationSchema={loginValidationSchema}
                initialValues={{email: '', password: '', keepMeSignedIn: false}}
                validateOnChange={true}
                onSubmit={async (
                  values: LoginType,
                  {setErrors, setSubmitting},
                ) => {
                  await handleLogin(values, setErrors);
                  setSubmitting(false);
                }}>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                  setFieldValue,
                  isValid,
                  setFieldTouched,
                  isSubmitting,
                }) => (
                  <>
                    <View>
                      <InputField
                        placeholder={'Email'}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={values.email}
                        onChangeText={(value: string) =>
                          setFieldValue('email', value)
                        }
                        onBlur={() => setFieldTouched('email')}
                        editable={!isSubmitting}
                        errorMessage={
                          touched.email && errors.email
                            ? errors.email
                            : undefined
                        }
                        borderWidths={1}
                      />
                      <InputField
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        autoCapitalize="none"
                        rightIcon={() => (
                          <Button
                            icon={
                              !passwordVisible
                                ? {
                                    type: 'ionicon',
                                    name: 'eye-outline',
                                    color: colors.grey,
                                  }
                                : {
                                    type: 'ionicon',
                                    name: 'eye-off-outline',
                                    color: colors.grey,
                                  }
                            }
                            type={'clear'}
                            onPress={() =>
                              setPasswordVisible(!passwordVisible)
                            }>
                            <Icon name="save" color="white" />
                          </Button>
                        )}
                        placeholder="Password"
                        secureTextEntry={passwordVisible}
                        value={values.password}
                        editable={!isSubmitting}
                        errorMessage={
                          touched.password && errors.password
                            ? errors.password
                            : undefined
                        }
                        borderWidths={1}
                      />
                      <CheckBox
                        title="Keep Me Signed In"
                        checked={values.keepMeSignedIn}
                        onPress={() => {
                          setFieldValue(
                            'keepMeSignedIn',
                            !values.keepMeSignedIn,
                          );
                        }}
                        containerStyle={styles.checkboxContainer}
                        textStyle={styles.checkboxText}
                        uncheckedColor={colors.grey}
                        checkedColor={colors.grey}
                      />
                      <View style={{marginTop: 75}}>
                        <X_Button
                          onPress={handleSubmit}
                          disabled={isSubmitting}
                          title={'Login'}
                          color={colors.black}
                          fontSize={20}
                          fontWeight="bold"
                        />
                      </View>
                    </View>
                  </>
                )}
              </Formik>
            </KeyboardAvoidingView>
            <TouchableOpacity
              onPress={() => {
                navigation.dispatch({
                  ...StackActions.push(routes.forgotPassword),
                });
              }}>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
            <Text style={styles.about}>
              By Young Construction Forum of NCASL
            </Text>
          </View>
        </ScrollView>
      </LoadingWrapper>
    </SafeAreaView>
  );
};

export default withoutAuth(LoginPage);
