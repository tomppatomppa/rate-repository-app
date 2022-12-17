import { View, StyleSheet, ScrollView } from 'react-native';

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
  return (
    <View style={styles.flexContainer}>
      <ScrollView horizontal>
        <Tab title={'Repositories'} navigate={'/'} />
        <Tab title={'Sign in'} navigate={'/login'} />
      </ScrollView>
    </View>
  );
};

export default AppBar;
