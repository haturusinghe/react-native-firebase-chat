import {StyleSheet} from 'react-native';
import {colors} from '../../constants';

export const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    marginHorizontal: 10,
    borderRadius: 8,
  },
  card: {
    marginTop: 5,
    marginHorizontal: 10,
    padding: 15,
    borderRadius: 8,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    elevation: 4,
    shadowRadius: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 10,
  },
  date: {
    fontSize: 11,
    color: colors.grey,
    marginBottom: 10,
  },
  subText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.grey,
  },
});
