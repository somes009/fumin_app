// const {CHANGE_NAME, CHANGE_AGE} = require('./constants');
import {CHANGE_USER_TYPE} from './constants';

// 创建的要存储的初始化state
const initialState = {
  name: 'chenyq',
  age: 18,
};

// 定义reducer, 将要存储的state作为返回值返回
// 第一次state是undefined, 因此给一个默认值将初始化数据添加到store中
function reducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_USER_TYPE:
      return {...state, name: action.userType};
  }

  // 没有数据更新时, 返回之前的state
  return state;
}
export default reducer;
