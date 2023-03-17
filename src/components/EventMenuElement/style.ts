import {StyleSheet} from 'react-native';
import {colors} from '../../constants';

export const styles = StyleSheet.create({
  card: {
    marginHorizontal: 15,
    marginVertical: 5,
    // padding: 15,
    borderRadius: 8,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    elevation: 4,
    shadowRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  dateRangeSection: {
    marginRight: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: colors.primary,
    borderBottomRightRadius: 20,
    maxWidth: 150,
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateRange: {
    fontSize: 18,
    color: colors.black,
    fontWeight: '900',
    textAlign: 'center',
  },
  dateRangeMonth: {
    fontWeight: '500',
    fontSize: 14,
    color: colors.black,
  },
});
