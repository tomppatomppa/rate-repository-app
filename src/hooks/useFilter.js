import { useState } from 'react';

const useFilter = () => {
  const [filterValues, setFilterValues] = useState({
    orderBy: 'CREATED_AT',
    orderDirection: 'DESC',
    searchKeyword: '',
    first: 3,
  });
  const [selectedValue, setSelectedValue] = useState();

  const setFilter = (filterParams) => {
    if (filterParams === 'DESC' || filterParams === 'ASC') {
      setFilterValues({
        ...filterValues,
        orderBy: 'RATING_AVERAGE',
        orderDirection: filterParams,
      });
    }
    if (filterParams === 'CREATED_AT') {
      setFilterValues({ ...filterValues, orderBy: filterParams });
    }
    setSelectedValue(filterParams);
    // console.log(filterValues);
  };

  const setKeyword = (keyword) => {
    setFilterValues({ ...filterValues, searchKeyword: keyword });
  };
  return [{ filterValues, selectedValue }, setFilter, setKeyword];
};

export default useFilter;
