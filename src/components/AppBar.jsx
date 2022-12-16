import { View, StyleSheet } from 'react-native';

import theme from '../theme';
import Tab from './Tab';

const styles = StyleSheet.create({
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    backgroundColor: theme.colors.primary,
  },
});

const AppBar = () => {
  return (
    <View style={styles.flexContainer}>
      <Tab title={'Repositories'} navigate={'/'} />
      <Tab title={'Sign in'} navigate={'/login'} />
    </View>
  );
};

export default AppBar;
