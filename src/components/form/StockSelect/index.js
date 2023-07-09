import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import './index.scss';

import Select from 'react-select';

import {getStockList, setCurrentStock} from 'redux/actions';
const StockSelect = () => {
  const dispatch = useDispatch();
  const {stockList, currentStock} = useSelector(({common}) => common);

  useEffect(() => {
    dispatch(getStockList());
  }, []);

  return (
    <Select
      value={currentStock}
      onChange={(stock) => {
        dispatch(setCurrentStock(stock));
      }}
      isClearable
      options={stockList}
      className='stock-select-min-w'
      placeholder='Hisse Seçiniz...'
      getOptionValue={(option) => `${option.stock_code}`}
      getOptionLabel={(option) => `${option.stock_code}`}
    />
  );
};

export default StockSelect;
