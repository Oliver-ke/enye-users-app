
import app from 'firebase';
import 'firebase/database';
import { ADD_USER, USERS_LOADING, GET_ALL_USERS } from './types'

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};
app.initializeApp(config)
const db = app.firestore()


export const addUser =  async (userInfo, dispatch) => {
  dispatch(setLoading())
  try {
    const userRef = await db.collection("users").add(userInfo);
    dispatch({ type: ADD_USER, payload: userRef })
  } catch (error) {
    console.log(error)
  }
}

export const getUsers = async (dispatch) =>{
  dispatch(setLoading());
  let usersRef = db.collection('users');
  const users = []
  usersRef.get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        users.push({ ...doc.data(), id: doc.id })
      });
      dispatch({ type: GET_ALL_USERS, payload: users })
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });
}

const setLoading = () =>({ type: USERS_LOADING })