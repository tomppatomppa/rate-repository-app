import React from 'react';
import { Pressable } from 'react-native';
import Text from './Text';
const Tab = ({ title }) => {
  return (
    <Pressable onPress={() => console.log(title)}>
      <Text color="secondary">{title}</Text>
    </Pressable>
  );
};

export default Tab;
