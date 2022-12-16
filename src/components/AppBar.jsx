import { View, StyleSheet } from 'react-native';

import theme from '../theme';
import Tab from './Tab';

const styles = StyleSheet.create({
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 60,
    backgroundColor: theme.colors.primary,
  },
  flexItemA: {
    margin: 12,
  },

  // ...
});

const AppBar = () => {
  return (
    <View style={styles.flexContainer}>
      <View style={styles.flexItemA}>
        <Tab title={'Repositories'} />
      </View>
    </View>
  );
};

export default AppBar;
