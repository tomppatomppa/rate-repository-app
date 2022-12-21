import React from 'react';
import { View } from 'react-native';
import { Link } from 'react-router-native';
import Text from './Text';

const Tab = ({ title, navigate }) => {
  return (
    <View style={{ margin: 12 }}>
      <Link to={navigate}>
        <Text color={'secondary'}>{title}</Text>
      </Link>
    </View>
  );
};

export default Tab;
