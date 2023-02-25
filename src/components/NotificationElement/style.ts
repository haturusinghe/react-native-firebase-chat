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
  },
  row: {
    flexDirection: 'row',
  },
  content: {
    flex: 5,
    justifyContent: 'center',
  },
  title: {
    fontWeight: '800',
    fontSize: 15,
  },
  text: {
    fontSize: 14,
    color: colors.grey,
  },
  time: {
    fontSize: 11,
    color: colors.grey,
  },
  flexEnd: {
    justifyContent: 'flex-end',
  },
});
