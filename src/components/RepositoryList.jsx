import { FlatList, View, StyleSheet } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import { Picker } from '@react-native-community/picker';

import useFilter from '../hooks/useFilter';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;
const RenderRepositoryItem = ({ item }) => <RepositoryItem item={item} />;

export const RepositoryListContainer = ({
  repositories,
  selectedValue,
  setFilter,
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
        <FilterDialog selectedValue={selectedValue} setFilter={setFilter} />
      }
    />
  );
};
const FilterDialog = ({ selectedValue, setFilter }) => {
  return (
    <View>
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
const RepositoryList = () => {
  const [{ filterValues, selectedValue }, setFilter] = useFilter();

  const { repositories } = useRepositories(filterValues);

  return (
    <View>
      <RepositoryListContainer
        repositories={repositories}
        selectedValue={selectedValue}
        setFilter={setFilter}
      />
    </View>
  );
};

export default RepositoryList;
