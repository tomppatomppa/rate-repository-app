import { FlatList, View, StyleSheet } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;
const RenderRepositoryItem = ({ item }) => <RepositoryItem item={item} />;

const RepositoryList = () => {
  const { repositories } = useRepositories();
  //console.log(repositories);

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={RenderRepositoryItem}
    />
  );
};

export default RepositoryList;
