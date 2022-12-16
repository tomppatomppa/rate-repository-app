import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import theme from '../theme';
import { kFormatter } from '../utils';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginBottom: 2,
    backgroundColor: theme.colors.secondary,
    padding: 12,
  },
  flexItemA: {
    flexDirection: 'row',
  },
  flexItemB: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginLeft: 12,
    marginBottom: 12,
  },
  flexItemStats: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  StatsItem: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  LanguageItem: {
    backgroundColor: theme.colors.primary,
    alignSelf: 'flex-start',
    borderRadius: 2,
    marginTop: 6,
    padding: 4,
  },
});

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.flexItemA}>
        <Image
          style={styles.tinyLogo}
          source={{ uri: item.ownerAvatarUrl }}
        ></Image>
        <View style={styles.flexItemB}>
          <Text fontWeight="bold">{item.fullName}</Text>
          <Text>{item.description}</Text>
          <Text style={styles.LanguageItem} color="secondary">
            {item.language}
          </Text>
        </View>
      </View>
      <View style={styles.flexItemStats}>
        <StatsItem value={item.stargazersCount} description="Stars" />
        <StatsItem value={item.forksCount} description="Forks" />
        <StatsItem value={item.reviewCount} description="Reviews" />
        <StatsItem value={item.ratingAverage} description="Rating" />
      </View>
    </View>
  );
};

const StatsItem = ({ value, description }) => {
  return (
    <View style={styles.StatsItem}>
      <Text fontWeight="bold">{kFormatter(value)} </Text>
      <Text>{description}</Text>
    </View>
  );
};
export default RepositoryItem;
