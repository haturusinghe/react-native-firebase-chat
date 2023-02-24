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
  row: {
    flexDirection: 'row',
  },
  forMoreDetails: {
    justifyContent: 'flex-end',
    marginTop: 5,
  },
  forMoreDetailsText: {
    fontSize: 12,
    color: colors.grey,
    marginRight: 5,
    alignSelf: 'center',
  },
});
