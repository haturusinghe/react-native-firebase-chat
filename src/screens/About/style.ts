import {StyleSheet} from 'react-native';
import {colors} from '../../constants';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: colors.white,
  },
  row: {
    flexDirection: 'row',
  },
  image: {
    height: 300,
  },
  centerContent: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  marginTop: {
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
  },
  subTitle: {
    fontSize: 17,
    fontWeight: '700',
  },
  text: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.grey,
  },
  textAlignCenter: {
    textAlign: 'center',
  },
  rowData: {
    flex: 1,
  },
  icon: {
    marginRight: 15,
  },
});
