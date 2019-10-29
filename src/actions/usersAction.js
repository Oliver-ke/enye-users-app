import { ADD_USER_ASYNC, USERS_LOADING, GET_INIT_USERS } from './types';

export const addUser = async (userInfo, dispatch) => {
	dispatch(setLoading());
	dispatch({ type: ADD_USER_ASYNC, payload: userInfo });
};

export const initialUsers = async (dispatch) => {
	dispatch(setLoading());
	dispatch({ type: GET_INIT_USERS });
};

const setLoading = () => ({ type: USERS_LOADING });
