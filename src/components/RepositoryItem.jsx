import React from 'react';
import { Image, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import theme from '../theme';
import { kFormatter } from '../utils';
import Text from './Text';
import * as Linking from 'expo-linking';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    marginBottom: 10,
    padding: 12,
    backgroundColor: theme.colors.secondary,
  },
  flexItemA: {
    flexDirection: 'row',
  },
  flexItemB: {
    justifyContent: 'space-around',
    marginLeft: 12,
    marginBottom: 12,
  },
  flexItemStats: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  StatsItem: {
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
  urlButton: {
    backgroundColor: theme.colors.primary,
    alignSelf: 'stretch',
    alignItems: 'center',
    borderRadius: 2,
    marginTop: 6,
    padding: 12,
  },
});

const RepositoryItem = ({ item, showUrl = '' }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/${item.id}`);
  };
  return (
    <Pressable onPress={handleNavigate}>
      <View testID="repositoryItem" style={styles.container}>
        <Details item={item} />
        <View testID="stats" style={styles.flexItemStats}>
          <Stats value={item.stargazersCount} description="Stars" />
          <Stats value={item.forksCount} description="Forks" />
          <Stats value={item.reviewCount} description="Reviews" />
          <Stats value={item.ratingAverage} description="Rating" />
        </View>
        {showUrl && (
          <Pressable onPress={() => Linking.openURL(showUrl)}>
            <View style={styles.urlButton}>
              <Text color={'secondary'}>Open in GitHub</Text>
            </View>
          </Pressable>
        )}
      </View>
    </Pressable>
  );
};

const Details = ({ item }) => {
  return (
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
  );
};
const Stats = ({ value, description }) => {
  return (
    <View style={styles.StatsItem}>
      <Text fontWeight="bold">{kFormatter(value)} </Text>
      <Text>{description}</Text>
    </View>
  );
};
export default RepositoryItem;
