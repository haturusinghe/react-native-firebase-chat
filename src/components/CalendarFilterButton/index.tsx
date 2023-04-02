import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Icon, Overlay, Text} from 'react-native-elements';
import {colors} from '../../constants';
import {styles} from './style';
import DatePicker from 'react-native-date-picker';

enum FilterTypes {
  'today' = 'Today',
  'yesterday' = 'Yesterday',
  'customDate' = 'Custom Date',
}

export const CalendarFilterButton = ({
  reload,
}: {
  reload: (fromDate: Date, toDate: Date) => void;
}) => {
  const [visible, setVisible] = useState(false);
  const [filter, setFilter] = useState<FilterTypes | null>();

  const [fromDate, setFromDate] = useState(new Date());
  const [fromDateOpen, setFromDateOpen] = useState(false);

  const [toDate, setToDate] = useState(new Date());
  const [toDateOpen, setToDateOpen] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    if (filter === FilterTypes.today) {
      setFromDate(new Date(moment(new Date()).format('YYYY-MM-DD')));
      setToDate(
        new Date(moment(new Date()).add(1, 'days').format('YYYY-MM-DD')),
      );
    } else if (filter === FilterTypes.yesterday) {
      setFromDate(
        new Date(moment(new Date()).add(-1, 'days').format('YYYY-MM-DD')),
      );
      setToDate(new Date(moment(new Date()).format('YYYY-MM-DD')));
    }
  }, [filter]);

  useEffect(() => {
    if (moment(fromDate).isBefore(toDate)) {
      // reload
      reload(fromDate, toDate);
    }
  }, [fromDate, toDate]);

  return (
    <View>
      <TouchableOpacity style={styles.filterSelection} onPress={toggleOverlay}>
        <Icon
          name="calendar"
          type="font-awesome"
          size={18}
          color={colors.white}
        />
        <Text style={styles.filterText}>{'Filter by Date  & Time'}</Text>
        <Icon
          name="caret-down"
          type="font-awesome"
          size={18}
          color={colors.white}
        />
      </TouchableOpacity>
      {filter === FilterTypes.customDate && (
        <View>
          <TouchableOpacity
            style={styles.filterSelection}
            onPress={() => setFromDateOpen(true)}>
            <Text style={styles.filterText}>
              {'From ' + moment(fromDate).format('YYYY-MM-DD HH:mm a')}
            </Text>
            <DatePicker
              modal
              open={fromDateOpen}
              date={fromDate}
              onConfirm={date => {
                setFromDateOpen(false);
                setFromDate(date);
              }}
              onCancel={() => {
                setFromDateOpen(false);
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filterSelection}
            onPress={() => setToDateOpen(true)}>
            <Text style={styles.filterText}>
              {'To ' + moment(toDate).format('YYYY-MM-DD HH:mm a')}
            </Text>
            <DatePicker
              modal
              open={toDateOpen}
              date={toDate}
              minimumDate={fromDate}
              onConfirm={date => {
                setToDateOpen(false);
                setToDate(date);
              }}
              onCancel={() => {
                setToDateOpen(false);
              }}
            />
          </TouchableOpacity>
        </View>
      )}
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <View style={styles.timeTitle}>
          <TouchableOpacity
            onPress={() => {
              setFilter(FilterTypes.today);
              setVisible(false);
            }}>
            <Text>{FilterTypes.today}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.timeTitle}>
          <TouchableOpacity
            onPress={() => {
              setFilter(FilterTypes.yesterday);
              setVisible(false);
            }}>
            <Text>{FilterTypes.yesterday}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.timeTitle}>
          <TouchableOpacity
            onPress={() => {
              setFilter(FilterTypes.customDate);
              setVisible(false);
            }}>
            <Text>{FilterTypes.customDate}</Text>
          </TouchableOpacity>
        </View>
      </Overlay>
    </View>
  );
};
