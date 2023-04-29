import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import {
  ACCESS_TOKEN,
  API_ROUTES,
  colors,
  HTTP_TYPES,
  routes,
} from '../../constants';
import {InputField} from '../../components/InputField';
import {StackActions, useNavigation} from '@react-navigation/native';
import {X_Button} from '../../components/Button';
import {Image} from 'react-native';
import {styles} from './style';
import {useMutation} from '../../hooks/useMutate';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoadingWrapper} from '../../components/LoadingWrapper';
import {useAppDispatch, useAppSelector} from '../../hooks/useRedux';
import {GENDERTYPES, userSlice} from '../../store/user';
import {MyHeader} from '../../components/MyHeader';
import {withAuth} from '../../hoc/withAuth';
import {CheckBox} from 'react-native-elements';
import {launchImageLibrary} from 'react-native-image-picker';
import {BASE_URL} from '@env';

const updateProfileValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Badly formatted email')
    .required('Email is Required'),
  name: yup.string().required('User name is Required'),
  mobile: yup.number().min(9).max(10).required('Phone number is required'),
  background: yup.string().required('Background is required'),
  gender: yup.string().required('gender is required'),
  quote: yup.string().optional(),
  shortDescription: yup.string().optional(),
  addressLineOne: yup.string().required('Address line one is required'),
  addressLineTwo: yup.string().optional(),
  // TODO previous and current work place details
});

const UpdateProfilePage: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(store => store.user);
  const [imageFile, setImageFile] = useState<any>(null);

  const {loading, mutate} = useMutation({url: API_ROUTES.USER.UPDATE_USER});

  const selectImage = async () => {
    launchImageLibrary(
      {mediaType: 'photo', selectionLimit: 1},
      (response: any) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          setImageFile(response.assets[0]);
        }
      },
    );
  };

  const handleUpdateUser = async (values: any, setErrors: any) => {
    const data = new FormData();

    if (imageFile !== null) {
      data.append('photo', {
        name: imageFile.fileName,
        type: imageFile.type,
        uri:
          Platform.OS === 'android'
            ? imageFile.uri
            : imageFile.uri.replace('file://', ''),
      });
    }

    Object.keys(values).forEach(key => {
      data.append(key, values[key]);
    });

    const res = await mutate(data, HTTP_TYPES.PUT, {
      'content-type': 'multipart/form-data',
    });
    if (res.success) {
      console.log('success', res.data);
    } else {
      console.log(res);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <MyHeader title="Update Profile" backenable={true} />
      <LoadingWrapper loading={loading}>
        <ScrollView style={styles.scrollview}>
          <View style={styles.centerContent}>
            <View style={styles.marginTop}>
              <TouchableOpacity onPress={selectImage}>
                <View style={styles.centerContent}>
                  <Image
                    source={{
                      uri: imageFile?.uri || `${BASE_URL}${user?.imageUrl}`,
                    }}
                    style={styles.image}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <KeyboardAvoidingView
              style={{
                paddingVertical: 40,
                paddingHorizontal: 30,
                borderRadius: 10,
                // height: maskHeight,
              }}>
              <Formik
                validationSchema={updateProfileValidationSchema}
                initialValues={{
                  email: user?.email || '',
                  name: user?.name || '',
                  mobile: user?.mobile || '',
                  background: user?.background || '',
                  gender: user?.gender,
                  quote: user?.quote || '',
                  shortDescription: user?.shortDescription || '',
                  addressLineOne: user?.address?.address_line_1 || '',
                  addressLineTwo: user?.address?.address_line_2 || '',
                }}
                validateOnChange={true}
                onSubmit={(values, {setErrors}) => {
                  handleUpdateUser(values, setErrors);
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
                      />
                      <InputField
                        placeholder={'Name'}
                        autoCapitalize="none"
                        value={values.name}
                        onChangeText={(value: string) =>
                          setFieldValue('name', value)
                        }
                        onBlur={() => setFieldTouched('name')}
                        editable={!isSubmitting}
                        errorMessage={
                          touched.name && errors.name ? errors.name : undefined
                        }
                      />
                      <InputField
                        placeholder={'Your quote'}
                        autoCapitalize="none"
                        value={values.quote}
                        onChangeText={(value: string) =>
                          setFieldValue('quote', value)
                        }
                        onBlur={() => setFieldTouched('quote')}
                        editable={!isSubmitting}
                        errorMessage={
                          touched.quote && errors.quote
                            ? errors.quote
                            : undefined
                        }
                      />
                      <InputField
                        placeholder={'Your short description'}
                        autoCapitalize="none"
                        value={values.shortDescription}
                        onChangeText={(value: string) =>
                          setFieldValue('shortDescription', value)
                        }
                        onBlur={() => setFieldTouched('shortDescription')}
                        editable={!isSubmitting}
                        errorMessage={
                          touched.shortDescription && errors.shortDescription
                            ? errors.shortDescription
                            : undefined
                        }
                      />
                      <InputField
                        placeholder={'Your address line one'}
                        autoCapitalize="none"
                        value={values.addressLineOne}
                        onChangeText={(value: string) =>
                          setFieldValue('addressLineOne', value)
                        }
                        onBlur={() => setFieldTouched('addressLineOne')}
                        editable={!isSubmitting}
                        errorMessage={
                          touched.addressLineOne && errors.addressLineOne
                            ? errors.addressLineOne
                            : undefined
                        }
                      />
                      <InputField
                        placeholder={'Your address line two'}
                        autoCapitalize="none"
                        value={values.addressLineTwo}
                        onChangeText={(value: string) =>
                          setFieldValue('addressLineTwo', value)
                        }
                        onBlur={() => setFieldTouched('addressLineTwo')}
                        editable={!isSubmitting}
                        errorMessage={
                          touched.addressLineTwo && errors.addressLineTwo
                            ? errors.addressLineTwo
                            : undefined
                        }
                      />
                      <InputField
                        placeholder={'Phone'}
                        keyboardType="phone-pad"
                        autoCapitalize="none"
                        value={values.mobile}
                        onChangeText={(value: string) =>
                          setFieldValue('mobile', value)
                        }
                        onBlur={() => setFieldTouched('mobile')}
                        editable={!isSubmitting}
                        errorMessage={
                          touched.mobile && errors.mobile
                            ? errors.mobile
                            : undefined
                        }
                      />
                      <InputField
                        multiline={true}
                        height={100}
                        placeholder={'Background'}
                        autoCapitalize="none"
                        value={values.background}
                        onChangeText={(value: string) =>
                          setFieldValue('background', value)
                        }
                        onBlur={() => setFieldTouched('background')}
                        editable={!isSubmitting}
                        errorMessage={
                          touched.background && errors.background
                            ? errors.background
                            : undefined
                        }
                      />
                      <Text style={styles.genderText}>Gender</Text>
                      <CheckBox
                        title="Male"
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        checked={values.gender === GENDERTYPES.MALE}
                        onPress={() => {
                          setFieldValue('gender', GENDERTYPES.MALE);
                        }}
                      />
                      <CheckBox
                        title="Female"
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        checked={values.gender === GENDERTYPES.FEMALE}
                        onPress={() => {
                          setFieldValue('gender', GENDERTYPES.FEMALE);
                        }}
                      />
                      <CheckBox
                        title="Prefer not to say"
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        checked={values.gender === GENDERTYPES.NOTSAY}
                        onPress={() => {
                          setFieldValue('gender', GENDERTYPES.NOTSAY);
                        }}
                      />
                      {errors.gender && (
                        <Text style={styles.errorText}>{errors.gender}</Text>
                      )}
                      {/* <CheckBox checked title="Keep me signed in" /> */}
                      <View style={{marginVertical: 20}}>
                        <X_Button
                          onPress={handleSubmit}
                          disabled={isSubmitting}
                          title={'Update Profile'}
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
          </View>
        </ScrollView>
      </LoadingWrapper>
    </SafeAreaView>
  );
};

export default withAuth(UpdateProfilePage);
