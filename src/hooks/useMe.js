import { useQuery } from '@apollo/client';

import { ME } from '../graphql/queries';

const useMe = (variables) => {
  const { data, loading, fetchMore, refetch, ...result } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
    variables: { ...variables },
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.me.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }
    //Not fetching more reviews for some reason
    fetchMore({
      variables: {
        after: data.me.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    me: data?.me,
    fetchMore: handleFetchMore,
    refetch,
    loading,
    ...result,
  };
};

export default useMe;
