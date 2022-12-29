import React from 'react';
import { FlatList } from 'react-native';

import useMe from '../hooks/useMe';
import { ItemSeparator, ReviewItem } from './SingleRepository';
import Text from './Text';

const MyReviews = () => {
  const { me, loading, fetchMore } = useMe({ includeReviews: true });

  if (loading) {
    return <Text>loading...</Text>;
  }

  const userReviews = me ? me.reviews.edges.map((edge) => edge.node) : [];

  const onEndReach = () => {
    console.log('Reached the end of reviews');
    fetchMore();
  };
  console.log(me);
  return (
    <FlatList
      data={userReviews}
      renderItem={({ item }) => (
        <ReviewItem
          review={item}
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
