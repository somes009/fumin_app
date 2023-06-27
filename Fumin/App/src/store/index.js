import {createStore} from 'redux';

// 创建的要存储的state: initialState
const initialState = {
  userType: 1, //1用户 2商户
};

function reducer() {
  return initialState;
}

// 创建的store, 内部会自动回调reducer, 拿到initialState
const store = createStore(reducer);

// 导出store
export default store;
