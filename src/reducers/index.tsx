import { combineReducers } from 'redux';
import currentCity from './currentCity';
import favoritsCitys from './favoritsCitys';

const rootReducer = combineReducers({ currentCity, favoritsCitys });

export default rootReducer;
