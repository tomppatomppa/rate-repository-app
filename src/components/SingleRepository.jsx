import React from 'react';
import { Alert, FlatList, Pressable, StyleSheet, View } from 'react-native';
import { useNavigate, useParams } from 'react-router-native';

import useRepository from '../hooks/useRepository';
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
  reviewButtons: {
    flexDirection: 'row',
    padding: 6,

    alignContent: 'stretch',
  },
  buttonNormal: {
    backgroundColor: theme.colors.primary,
    padding: 12,
    borderRadius: 4,
  },
  buttonDelete: {
    backgroundColor: theme.colors.warning,
    padding: 12,
    borderRadius: 4,
    marginLeft: 32,
  },
});

export const ItemSeparator = () => <View style={styles.separator} />;

export const ReviewItem = ({ review, showUser = true, onDeleteReview }) => {
  const navigate = useNavigate();
  const { id, rating, user, createdAt, text, repository } = review;

  const handleDelete = () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'OK', onPress: () => onDeleteReview(id) },
      ]
    );
  };

  return (
    <View style={styles.reviewContainer}>
      <View style={styles.rating}>
        <Text color="primary" fontWeight={'bold'}>
          {rating}
        </Text>
      </View>
      <View style={styles.reviewContent}>
        <Text fontWeight={'bold'}>
          {showUser ? user.username : repository.fullName}
        </Text>
        <Text color={theme.colors.textSecondary}>{parseDate(createdAt)}</Text>
        <Text>{text}</Text>
        {!showUser && (
          <View style={styles.reviewButtons}>
            <Pressable
              style={styles.buttonNormal}
              onPress={() => navigate(`/${repository.id}`)}
            >
              <Text color={'secondary'}>View repository</Text>
            </Pressable>
            <Pressable style={styles.buttonDelete} onPress={handleDelete}>
              <Text color={'secondary'}>Delete review</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
};

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, loading, fetchMore } = useRepository(id);

  if (loading) {
    return <Text>loading..</Text>;
  }
  const { url, reviews, ...rest } = repository;

  const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : [];

  const onEndReach = () => {
    console.log('Reached the end of reviews');
    fetchMore();
  };

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryItem item={rest} showUrl={url} />}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
    />
  );
};

export default SingleRepository;
