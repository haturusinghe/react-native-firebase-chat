import {StyleSheet} from 'react-native';
import {colors} from '../../constants';

export const styles = StyleSheet.create({
  textType: {
    fontSize: 14,
  },
  image: {
    borderRadius: 100,
    width: 100,
    height: 100,
    borderColor: colors.black,
    borderWidth: 5,
  },
  scrollview: {
    backgroundColor: 'white',
  },
  forgotPassword: {
    fontSize: 14,
    textAlign: 'center',
  },
  about: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 30,
  },
  errorText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 10,
    color: colors.error,
    marginLeft: 10,
  },
  genderText: {
    marginTop: 5,
    marginLeft: 10,
  },
  centerContent: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  marginTop: {
    marginTop: 20,
  },
});
