import * as React from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import {colors, routes} from '../../constants';
import {InputField} from '../../components/InputField';
import {StackActions, useNavigation} from '@react-navigation/native';
import {X_Button} from '../../components/Button';
import {Button, CheckBox, Icon} from 'react-native-elements';
import {Image} from 'react-native';
import {styles} from './style';

interface LoginType {
  email: string;
  password: string;
}

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Badly formatted email')
    .required('Email is Required'),
  password: yup.string().required('Password is Required'),
});

export const LoginPage = () => {
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(true);

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor={colors.primary} barStyle={'light-content'} />
      <ScrollView style={styles.scrollview}>
        <View>
          <KeyboardAvoidingView
            style={{
              paddingVertical: 40,
              paddingHorizontal: 30,
              borderRadius: 10,
              // height: maskHeight,
            }}>
            <Image
              source={require('../../assets/images/LOGO.png')}
              style={styles.image}
            />
            <Formik
              validationSchema={loginValidationSchema}
              initialValues={{email: '', password: ''}}
              validateOnChange={true}
              // onReset={(value: any)=> {console.log(value);
              //   email:"he"
              // }}
              onSubmit={(values: LoginType, {resetForm}) => {}}>
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
                        touched.email && errors.email ? errors.email : undefined
                      }
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
                          onPress={() => setPasswordVisible(!passwordVisible)}>
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
                    />
                    {/* <CheckBox checked title="Keep me signed in" /> */}
                    <View style={{marginVertical: 20}}>
                      <X_Button
                        onPress={handleSubmit}
                        disabled={isSubmitting}
                        title={'Sign in'}
                        color={colors.grey}
                        fontSize={14}
                        borderWidth={1.5}
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
          <Text style={styles.about}>By Young Construction Forum of NCASL</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
