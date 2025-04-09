import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { SearchIcon } from '../../../../assets/icons/svg/SvgIcons';

const SearchBar = React.memo(() => (
  <View style={styles.container}>
    <SearchIcon width={20} height={20} />
    <TextInput
      placeholder="Search doctor..."
      placeholderTextColor="#9CA3AF"
      style={styles.input}
    />
  </View>
));

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 10,
  },
  input: {
    marginLeft: 10,
    fontSize: 14,
    flex: 1,
    color: '#111827',
  },
});
