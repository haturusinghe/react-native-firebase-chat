import {StyleSheet} from 'react-native';
import {colors} from '../../constants';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
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
  marginTop: {
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  text: {
    fontSize: 14,
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
  avatar: {
    backgroundColor: colors.black,
    marginTop: 7,
    marginRight: 5,
  },
});
