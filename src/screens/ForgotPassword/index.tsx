import * as React from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
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

interface forgotEmailType {
  email: string;
}

const forgotpasswordValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Badly formatted email')
    .required('Email is Required'),
});

export const ForgotPasswordPage = () => {
  const navigation = useNavigation();

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
            <Text style={styles.intro}>
              Enter the email address assiciated with your account and we'll
              send you a link to reset the password.
            </Text>
            <Formik
              validationSchema={forgotpasswordValidationSchema}
              initialValues={{email: '', password: ''}}
              validateOnChange={true}
              // onReset={(value: any)=> {console.log(value);
              //   email:"he"
              // }}
              onSubmit={(values: forgotEmailType, {resetForm}) => {}}>
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
                    <View style={{marginVertical: 20}}>
                      <X_Button
                        onPress={handleSubmit}
                        disabled={isSubmitting}
                        title={'Continue'}
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
                ...StackActions.push(routes.home),
              });
            }}>
            <Text style={styles.forgotPassword}>Try another way</Text>
          </TouchableOpacity>
          <Text style={styles.about}>By Young Construction Forum of NCASL</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
