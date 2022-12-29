import { useQuery } from '@apollo/client';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { ME } from '../graphql/queries';

import theme from '../theme';
import Tab from './Tab';

const styles = StyleSheet.create({
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 80,
    backgroundColor: theme.colors.primary,
  },
});

const AppBar = () => {
  const { data, loading } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return <Text>loading</Text>;
  }
  console.log(data);
  const user = data?.me ? true : false;

  return (
    <View style={styles.flexContainer}>
      <ScrollView horizontal>
        <Tab title={'Repositories'} navigate={'/'} />
        {user ? (
          <>
            <Tab title={'Create a review'} navigate={'/review'} />
            <Tab title={'My Reviews'} navigate={'/myreviews'} />
            <Tab title={'Sign out'} navigate={'/signout'} />
          </>
        ) : (
          <>
            <Tab title={'Sign in'} navigate={'/login'} />
            <Tab title={'Sign up'} navigate={'/signup'} />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
