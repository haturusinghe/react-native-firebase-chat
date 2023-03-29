import {StyleSheet} from 'react-native';
import {colors} from '../../constants';

export const styles = StyleSheet.create({
  filterSelection: {
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: colors.grey,
    marginLeft: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
    width: 200,
    marginVertical: 10,
  },
  filterText: {
    paddingHorizontal: 10,
    color: colors.white,
    fontWeight: '600',
  },
  FromDateView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingBottom: 5,
    marginHorizontal: 5,
    borderBottomColor: colors.grey,
    borderBottomWidth: 2,
  },
  FromDate: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.black,
  },
  timeTitle: {
    minWidth: 300,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.grey,
  },
});
