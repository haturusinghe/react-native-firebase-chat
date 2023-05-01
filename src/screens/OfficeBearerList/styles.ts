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
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.success,
    marginHorizontal: 15,
  },
});
