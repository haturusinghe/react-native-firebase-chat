import moment from 'moment';
import * as React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {Icon, Overlay, Text} from 'react-native-elements';
import {colors} from '../../constants';
import {styles} from './style';
import * as yup from 'yup';
import {Formik} from 'formik';
import {InputField} from '../InputField';
import {X_Button} from '../Button';

interface TimeType {
  from: number;
  to: number;
}

export const CalendarFilterButton = () => {
  const TimeValidationSchema = yup.object().shape({
    from: yup
      .number()
      .min(0, 'Mininum at least 0')
      .max(23, 'Allow maximum is 23')
      .required('Email is Required'),
    to: yup
      .number()
      .max(0, 'Mininum at least 0')
      .max(24, 'Allow maximum is 23')
      .required('Email is Required'),
  });
  const [visible, setVisible] = React.useState(false);
  const [markedDate, setMarkedDate] = React.useState({
    [moment().format('YYYY-MM-DD')]: {
      selected: true,
      selectedColor: colors.primary_dark,
    },
  });

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const onDayPress = (day: string) => {
    setMarkedDate({
      ...markedDate,
      [day]: {selected: true, selectedColor: colors.primary_dark},
    });
  };
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
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <View style={styles.FromDateView}>
          <Text style={styles.FromDate}>From Date</Text>
          <Text style={styles.FromDate}>
            {moment(new Date()).format('DD/MM/YYYY')}
          </Text>
        </View>
        <View style={styles.FromDateView}>
          <Text style={styles.FromDate}>To Date</Text>
          <Text style={styles.FromDate}>
            {moment(new Date()).format('DD/MM/YYYY')}
          </Text>
        </View>
        <Calendar
          theme={{
            arrowColor: colors.black,
            calendarBackground: colors.white,
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 14,
            textMonthFontSize: 14,
            textDayHeaderFontSize: 14,
          }}
          style={{backgroundColor: colors.white}}
          minDate={moment().add(-30, 'days').format('YYYY-MM-DD').toString()}
          maxDate={moment().add(30, 'days').format('YYYY-MM-DD').toString()}
          headerStyle={{backgroundColor: colors.white}}
          current={moment().format('YYYY-MM-DD').toString()}
          markedDates={markedDate}
          onDayPress={day => {
            onDayPress(day.dateString);
          }}
        />
        <Formik
          validationSchema={TimeValidationSchema}
          initialValues={{from: 0, to: 1}}
          validateOnChange={true}
          // onReset={(value: any)=> {console.log(value);
          //   email:"he"
          // }}
          onSubmit={(values: TimeType, {resetForm}) => {}}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
            isValid,
            setFieldTouched,
            isSubmitting,
          }) => (
            <>
              <View>
                <InputField
                  placeholder={'From'}
                  keyboardType="number-pad"
                  autoCapitalize="none"
                  value={values.from}
                  onChangeText={(value: string) => setFieldValue('from', value)}
                  onBlur={() => setFieldTouched('from')}
                  editable={!isSubmitting}
                  errorMessage={
                    touched.from && errors.from ? errors.from : undefined
                  }
                />
                <InputField
                  onChangeText={handleChange('to')}
                  onBlur={handleBlur('to')}
                  autoCapitalize="none"
                  placeholder="to"
                  editable={!isSubmitting}
                  value={values.to}
                  errorMessage={touched.to && errors.to ? errors.to : undefined}
                />
                {/* <CheckBox checked title="Keep me signed in" /> */}
                <View style={{marginVertical: 10}}>
                  <X_Button
                    onPress={handleSubmit}
                    disabled={isSubmitting}
                    title={'Search'}
                    color={colors.grey}
                    fontSize={14}
                    borderWidth={1.5}
                  />
                </View>
              </View>
            </>
          )}
        </Formik>
      </Overlay>
    </View>
  );
};
