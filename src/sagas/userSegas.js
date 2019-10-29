import app from '../firebase';
import { GET_ALL_USERS, ADD_USER_ASYNC, ADD_USER, GET_INIT_USERS } from '../actions/types';
import { put, take, takeLatest, all, fork } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

const funcUrl = 'https://us-central1-envyuser-f1981.cloudfunctions.net/users';

function* startListener() {
	const channel = new eventChannel((emiter) => {
		const userRef = app.database().ref('/users');
		const listener = userRef.on('value', (snapshot) => {
			emiter({ data: snapshot.val() || {} });
		});
		return () => {
			listener.off();
		};
	});

	while (true) {
		const { data } = yield take(channel);
		yield put({ type: GET_ALL_USERS, payload: data });
	}
}

function* addUserAsync({ payload }) {
	const json = yield fetch(funcUrl, {
		method: 'POST',
		body: JSON.stringify(payload),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then((response) => response.json());
	yield put({ type: ADD_USER, payload: json });
}

function* getUserAsync() {
	const json = yield fetch(funcUrl).then((response) => response.json());
	const values = Object.values(json);
	yield put({ type: GET_ALL_USERS, payload: values });
}

function* watchAddUser() {
	yield takeLatest(ADD_USER_ASYNC, addUserAsync);
	//yield takeLatest(GET_INIT_USERS, getUserAsync);
}

function* watchInit() {
	yield takeLatest(GET_INIT_USERS, getUserAsync);
}

export default function* rootSaga() {
	// having issues with the channel, not getting feeds from the database
	yield all([ fork(startListener), watchAddUser(), watchInit() ]);
}
