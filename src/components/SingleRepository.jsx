import { useQuery } from '@apollo/client';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useParams } from 'react-router-native';
import { GET_REPOSITORY } from '../graphql/queries';
import theme from '../theme';
import { parseDate } from '../utils';
import RepositoryItem from './RepositoryItem';
import Text from './Text';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  reviewContainer: {
    flexDirection: 'row',
    padding: 11,
    backgroundColor: theme.colors.secondary,
  },
  rating: {
    marginRight: 12,
    width: 34,
    height: 34,
    borderWidth: 2,
    borderRadius: 34 / 2,
    borderStyle: 'solid',
    borderColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewContent: {
    flexDirection: 'column',
    alignContent: 'center',
    flexShrink: 1,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review }) => {
  const { rating, user, createdAt, text } = review;

  return (
    <View style={styles.reviewContainer}>
      <View style={styles.rating}>
        <Text color="primary" fontWeight={'bold'}>
          {rating}
        </Text>
      </View>
      <View style={styles.reviewContent}>
        <Text fontWeight={'bold'}>{user.username}</Text>
        <Text color={theme.colors.textSecondary}>{parseDate(createdAt)}</Text>
        <Text>{text}</Text>
      </View>
    </View>
  );
};

const SingleRepository = () => {
  const { id } = useParams();
  const { data, loading } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { repositoryId: id },
  });

  if (loading) {
    return <Text>loading..</Text>;
  }
  const { url, reviews, ...rest } = data.repository;

  const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : [];

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryItem item={rest} showUrl={url} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default SingleRepository;
