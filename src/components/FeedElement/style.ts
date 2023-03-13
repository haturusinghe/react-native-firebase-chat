import {StyleSheet} from 'react-native';
import {colors} from '../../constants';

export const styles = StyleSheet.create({
  card: {
    marginHorizontal: 15,
    marginVertical: 5,
    padding: 15,
    borderRadius: 8,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    elevation: 4,
    shadowRadius: 14,
    height: 400,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
  },
  date: {
    fontSize: 10,
    color: colors.grey,
  },
});
