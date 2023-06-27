import store from './index';
import {CHANGE_USER_TYPE} from './constants';

const changeUserType = (type) => {
  store.dispatch({
    type: CHANGE_USER_TYPE,
    userType: type,
  });
};
const mapStateToProps = (state) => ({
  userType: state.userType,
});
const mapDispatchToProps = (dispatch) => ({
  addUser: (userType) => dispatch(changeUserType(userType)),
});

export default {
  changeUserType,
  mapStateToProps,
  mapDispatchToProps,
};
