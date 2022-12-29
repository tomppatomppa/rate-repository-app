import { useMutation } from '@apollo/client';
import React from 'react';
import { FlatList } from 'react-native';
import { DELETE_REVIEW } from '../graphql/mutations';

import useMe from '../hooks/useMe';
import { ItemSeparator, ReviewItem } from './SingleRepository';
import Text from './Text';

const MyReviews = () => {
  const [mutate] = useMutation(DELETE_REVIEW);
  const { me, loading, fetchMore, refetch } = useMe({ includeReviews: true });

  if (loading) {
    return <Text>loading...</Text>;
  }
  const userReviews = me ? me.reviews.edges.map((edge) => edge.node) : [];

  const onDeleteReview = async (id) => {
    try {
      await mutate({
        variables: { reviewId: id },
      });
      refetch();
    } catch (e) {
      console.log(e);
    }
  };
  const onEndReach = () => {
    fetchMore();
  };

  return (
    <FlatList
      data={userReviews}
      renderItem={({ item }) => (
        <ReviewItem
          review={item}
          onDeleteReview={onDeleteReview}
          showUser={false}
          keyExtractor={({ id }) => id}
        />
      )}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
    ></FlatList>
  );
};

export default MyReviews;
