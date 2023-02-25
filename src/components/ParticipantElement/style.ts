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
  image: {
    borderRadius: 50,
    width: 50,
    height: 50,
    flex: 1,
  },
  content: {
    marginLeft: 20,
    flex: 5,
  },
  title: {
    fontWeight: '800',
    fontSize: 15,
  },
  flexEnd: {
    justifyContent: 'center',
  },
});
