import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  FlatList,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useUser} from '../../context/user';
import {Theme} from '../../theme/colors';
import BottomModal from './BottomModal';
import {rspF, rspH, rspW} from '../../theme/responsive';
import ItemSeparatorComponent from '../ItemSeparatorComponent';
import StyledButton from '../buttons/StyledButton';
import StyledDatePicker from '../DatePicker/DatePicker';
import moment from 'moment';

export interface FilterModalType {
  title: string;
  id: string;
  showDate?: boolean;
  data?: FilterModalType[];
  singleSelect?: boolean;
  dateField?: string;
  dateValue?: string;
}

interface FilterModalProps {
  data: FilterModalType[];

  show?: boolean;
  onClose: () => void;
  snapPoints?: string[];
  value?: Record<string, string[]>;
  onSave: (value: Record<string, string[]>) => void;
  onUpdate?: (value: Record<string, string[]>) => void;
}

interface FilterItemProps {
  item: FilterModalType;
  selected: string[];
  id: string;
  onSelect: (id: string, value: string) => void;
}

const FilterItem = ({item, selected = [], id, onSelect}: FilterItemProps) => {
  const {theme} = useUser();
  const styles = style(theme);

  const isSelected = selected.includes(item.id);

  const onPress = useCallback(() => {
    onSelect(id, item.id);
  }, [id, item, onSelect]);

  return (
    <TouchableOpacity
      style={[styles.item, isSelected && styles.selectedItem]}
      onPress={onPress}>
      <Text
        style={[styles.filterText, isSelected && styles.selectedFilterText]}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );
};

const FilterModal = ({
  data,
  onClose,
  show,
  snapPoints,
  value,
  onSave,
  onUpdate,
}: FilterModalProps) => {
  const {theme} = useUser();
  const styles = style(theme);

  const [values, setValues] = useState<Record<string, string[]>>();

  useEffect(() => {
    if (show && value) {
      setValues({
        ...JSON.parse(JSON.stringify(value)),
      });
    }
  }, [value, show]);

  const onSelect = useCallback(
    (id: string, label: string) => {
      const isSingle = data.find(ele => ele.id === id)?.singleSelect;
      const temp = values?.[id] ?? [];
      console.log('TEMP', temp, temp.includes(label), typeof temp);

      if (temp?.includes(label)) {
        if (!isSingle) {
          const index = temp.findIndex(ele => ele === label);
          temp.splice(index, 1);
        }
      } else if (isSingle) {
        temp.splice(0, 1);
        temp.push(label);
      } else {
        temp.push(label);
      }

      setValues({
        ...values,
        [id]: temp,
      });

      onUpdate?.({
        ...values,
        [id]: temp,
      });
    },
    [values, data, onUpdate],
  );

  const onDateChanged = useCallback(
    (date: Date, item: FilterModalType) => {
      if (item?.dateField && item?.dateValue) {
        setValues({
          ...values,
          [item.dateField]: [moment(date).format('DD-MM-YYYY').toString()],
          [item.id]: [item.dateValue]
        });
        onUpdate?.({
          ...values,
          [item.dateField]: [moment(date).format('DD-MM-YYYY').toString()],
          [item.id]: [item.dateValue]
        });
      }
    },
    [values, data, onUpdate],
  );

  return (
    <BottomModal show={show} snapPoints={snapPoints} onClose={onClose}>
      <FlatList
        data={data}
        contentContainerStyle={{
          paddingHorizontal: rspW(24),
          paddingVertical: rspH(8),
        }}
        keyExtractor={item => item.title}
        renderItem={({item}) => {
          return (
            <>
              <Text style={styles.title}>{item.title}</Text>
              <View style={styles.itemContainer}>
                {item.data?.map(ele => {
                  return (
                    <FilterItem
                      item={ele}
                      id={item.id}
                      key={ele.id}
                      selected={values?.[item.id] ?? []}
                      onSelect={onSelect}
                    />
                  );
                })}
                {item?.showDate && (
                  <>
                    <StyledDatePicker
                      onDateChanged={date => {
                        onDateChanged(date, item);
                      }}
                      date={item?.dateField && values && values[item?.dateField]?.[0] ? moment(values[item?.dateField]?.[0],'DD-MM-YYYY').toDate() : undefined}
                      maxDate={new Date()}
                      minDate={moment().subtract(100,'years').toDate()}
                    />
                  </>
                )}
              </View>
            </>
          );
        }}
        ItemSeparatorComponent={() => {
          return <ItemSeparatorComponent style={styles.seperator} />;
        }}
        ListFooterComponent={() => {
          return (
            <View style={styles.row}>
              <StyledButton
                label="Cancel"
                onPress={() => {
                  onClose();
                }}
                containerStyle={[styles.button, styles.cancel]}
                color={theme.black}
              />
              <StyledButton
                label="Apply"
                onPress={() => {
                  if (values) onSave(values);
                }}
                containerStyle={[styles.button]}
              />
            </View>
          );
        }}
      />
    </BottomModal>
  );
};
const style = (theme: Theme) =>
  StyleSheet.create({
    title: {
      fontSize: rspF(16),
      color: theme.black,
      fontWeight: '500',
      marginBottom: rspW(16),
    },
    itemContainer: {
      flexWrap: 'wrap',
      flexDirection: 'row',
      gap: 10,
    },
    item: {
      paddingHorizontal: 16,
      paddingVertical: 4,
      backgroundColor: '#EFEFEF',
      borderRadius: 16,
    },
    filterText: {
      fontSize: rspF(16),
      color: theme.doveGrey,
      fontWeight: '400',
    },
    selectedItem: {
      backgroundColor: theme.lightBlue,
    },
    selectedFilterText: {
      color: theme.black,
    },
    seperator: {
      marginVertical: rspH(16),
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 16,
      gap: 8,
    },
    button: {
      flex: 1,
    },
    cancel: {
      backgroundColor: theme.lightBlue,
    },
  });

export default FilterModal;
