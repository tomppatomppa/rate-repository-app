import { FlatList, View, StyleSheet, TextInput } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import { Picker } from '@react-native-community/picker';

import useFilter from '../hooks/useFilter';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  searchBar: {
    alignContent: 'center',
    marginEnd: 12,
    marginLeft: 12,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;
const RenderRepositoryItem = ({ item }) => <RepositoryItem item={item} />;

const FilterDialog = ({ selectedValue, setFilter, setKeyword }) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedKeyword] = useDebounce(searchKeyword, 1000);

  useEffect(() => {
    setKeyword(debouncedKeyword);
  }, [debouncedKeyword]);

  return (
    <View>
      <TextInput
        style={styles.searchBar}
        placeholder="search"
        value={searchKeyword}
        onChangeText={(value) => setSearchKeyword(value)}
      />
      <Picker
        prompt="Select an item..."
        selectedValue={selectedValue}
        onValueChange={(itemValue) => setFilter(itemValue)}
      >
        <Picker.Item label="Latest repositories" value={'CREATED_AT'} />
        <Picker.Item label="Highest rated repositories" value={'DESC'} />
        <Picker.Item label="Lowest rated repositories" value={'ASC'} />
      </Picker>
    </View>
  );
};

export const RepositoryListContainer = ({
  repositories,
  selectedValue,
  setFilter,
  setKeyword,
  onEndReached,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={RenderRepositoryItem}
      ListHeaderComponent={
        <FilterDialog
          selectedValue={selectedValue}
          setFilter={setFilter}
          setKeyword={setKeyword}
        />
      }
      onEndReached={onEndReached}
      onEndReachedThreshold={0.3}
    />
  );
};

const RepositoryList = () => {
  const [{ filterValues, selectedValue }, setFilter, setKeyword] = useFilter();

  const { repositories, fetchMore } = useRepositories(filterValues);

  const onEndReach = () => {
    console.log('You have reached the end of the list');
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      selectedValue={selectedValue}
      setFilter={setFilter}
      setKeyword={setKeyword}
      onEndReached={onEndReach}
    />
  );
};

export default RepositoryList;
