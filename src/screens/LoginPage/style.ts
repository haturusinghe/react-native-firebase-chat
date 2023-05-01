import {StyleSheet} from 'react-native';
import {colors} from '../../constants';

export const styles = StyleSheet.create({
  textType: {
    fontSize: 14,
  },
  image: {
    marginBottom: 75,
  },
  scrollview: {
    backgroundColor: colors.white,
    // flex: 1,
  },
  forgotPassword: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
  },
  about: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 50,
    fontWeight: '400',
    color: colors.grey,
  },
  checkboxContainer: {
    backgroundColor: 'white',
    borderWidth: 0,
  },
  checkboxText: {
    fontSize: 14,
    fontWeight: 'normal',
    color: 'grey',
  },
});
