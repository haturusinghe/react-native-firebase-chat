import {StyleSheet} from 'react-native';
import {colors} from '../../constants';

export const styles = StyleSheet.create({
  tabContainer: {
    backgroundColor: colors.black,
  },
  tabTitle: {
    color: colors.white,
    textTransform: 'none',
  },
  tabBorder: {
    backgroundColor: colors.primary,
  },
  marginVertical: {
    marginVertical: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
  },
  text: {
    fontSize: 14,
    color: colors.grey,
  },
  textAlignCenter: {
    textAlign: 'center',
  },
  image: {
    borderRadius: 100,
    width: 100,
    height: 100,
    flex: 1,
    borderColor: colors.black,
    borderWidth: 5,
  },
  centerContent: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
