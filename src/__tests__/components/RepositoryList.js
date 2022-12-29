import { RepositoryListContainer } from '../../components/RepositoryList';
import { render } from '@testing-library/react-native';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      //useNavigate causes test to fail with error "useNavigate() may be used only in the context of a <Router> component."
      //Wrapping <Router> around  <RepositoryListContainer /> doesn't help
      //Remove useNavigate hook from RepositoryItem for the test to work
      const { getAllByTestId } = render(
        <RepositoryListContainer
          repositories={repositories}
          selectedValue={'CREATED_AT'}
          setFilter={'DESC'}
          setKeyword={() => console.log('dummy function')}
          onEndReached={() => console.log('dummy function')}
        />
      );
      const repositoryItems = getAllByTestId('repositoryItem');
      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;

      expect(firstRepositoryItem).toBeDefined();
      expect(secondRepositoryItem).toBeDefined();

      //Check that first item contains the proper content
      expect(firstRepositoryItem).toHaveTextContent('jaredpalmer/formik');
      expect(firstRepositoryItem).toHaveTextContent(
        'Build forms in React, without the tears'
      );
      expect(firstRepositoryItem).toHaveTextContent('TypeScript');
      //kFormatter formats correctly values over 999
      expect(firstRepositoryItem).toHaveTextContent('1.6k');
      //kFormatter formats correctly values over 999
      expect(firstRepositoryItem).toHaveTextContent('21.9k');
      expect(firstRepositoryItem).toHaveTextContent('88');
      expect(firstRepositoryItem).toHaveTextContent('3');
    });
  });
});
