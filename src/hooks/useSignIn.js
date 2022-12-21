import { useApolloClient, useMutation } from '@apollo/client';
import { AUTHORIZE_USER } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
  const client = useApolloClient();
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(AUTHORIZE_USER);

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: { credentials: { username, password } },
    });

    await authStorage.setAccessToken(data.authenticate.accessToken);
    client.resetStore();

    return data;
  };
  return [signIn, result];
};

export default useSignIn;
