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
  title: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 10,
  },
  date: {
    fontSize: 12,
    color: colors.grey,
    flex: 1,
    paddingBottom: 3,
  },
  textWeight: {
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.black,
    paddingBottom: 3,
  },
  description: {
    fontSize: 12,
    color: colors.grey,
    paddingBottom: 13,
  },
  buttonSet: {
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
});
