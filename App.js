import { NativeRouter } from 'react-router-native';

import createApolloClient from './src/utils/apolloClient';
import { ApolloProvider } from '@apollo/client';
import Constants from 'expo-constants';
import Main from './src/components/Main';

const apolloClient = createApolloClient();

const App = () => {
  console.log(Constants.manifest);
  return (
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <Main />
      </ApolloProvider>
    </NativeRouter>
  );
};

export default App;
