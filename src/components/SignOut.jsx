import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native';
import { useNavigate } from 'react-router-native';

import useSignOut from '../hooks/useSignOut';

const SignOut = () => {
  const [signOut] = useSignOut();
  const navigate = useNavigate();

  useEffect(() => {
    signOut();
    navigate('/');
  }, []);

  return (
    <View>
      <Text>Logging out......</Text>
    </View>
  );
};

export default SignOut;
