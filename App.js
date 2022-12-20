import { NativeRouter } from 'react-router-native';

import createApolloClient from './src/utils/apolloClient';
import { ApolloProvider } from '@apollo/client';

import Main from './src/components/Main';

const apolloClient = createApolloClient();

const App = () => {
  return (
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <Main />
      </ApolloProvider>
    </NativeRouter>
  );
};

export default App;
