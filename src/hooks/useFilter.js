import { useState } from 'react';

const useFilter = () => {
  const [filterValues, setFilterValues] = useState({
    orderBy: 'CREATED_AT',
    orderDirection: 'DESC',
  });
  const [selectedValue, setSelectedValue] = useState();

  const setFilter = (filterParams) => {
    if (filterParams === 'DESC' || filterParams === 'ASC') {
      setFilterValues({
        orderBy: 'RATING_AVERAGE',
        orderDirection: filterParams,
      });
    }
    if (filterParams === 'CREATED_AT') {
      setFilterValues({ ...filterValues, orderBy: filterParams });
    }
    setSelectedValue(filterParams);
  };

  return [{ filterValues, selectedValue }, setFilter];
};

export default useFilter;
