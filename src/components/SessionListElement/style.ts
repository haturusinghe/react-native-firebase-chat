import {StyleSheet} from 'react-native';
import {colors} from '../../constants';

export const styles = StyleSheet.create({
  card: {
    marginHorizontal: 15,
    paddingRight: 10,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    elevation: 4,
    shadowRadius: 14,
    borderColor: colors.grey,
    borderWidth: 0.5,
  },
  row: {
    flexDirection: 'row',
  },
  content: {
    marginLeft: 10,
    flex: 5,
    justifyContent: 'center',
  },
  title: {
    fontWeight: '800',
    fontSize: 15,
  },
  subTitle: {
    fontWeight: '500',
    fontSize: 12,
    color: colors.error,
  },
  flexEnd: {
    justifyContent: 'center',
  },
  flexOne: {
    flex: 1,
  },
  dateRangeSection: {
    marginRight: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: colors.primary,
  },
  dateRange: {
    fontSize: 18,
    color: colors.black,
    fontWeight: '900',
    // textAlign: 'center',
  },
  TextRed: {
    color: colors.error,
  },
  subContent: {
    marginVertical: 15,
    marginHorizontal: 15,
  },
  marginTop: {
    marginTop: 5,
  },
  SubContentText: {
    color: colors.grey,
  },
  SeatCard: {
    padding: 10,
    backgroundColor: colors.white,
    borderColor: colors.grey,
    borderWidth: 0.5,
    borderRadius: 8,
  },
  seatContent: {
    marginLeft: 10,
  },
  seatTitle: {
    fontWeight: '800',
    fontSize: 12,
  },
  buttonSet: {
    justifyContent: 'space-evenly',
    marginVertical: 15,
  },
});
