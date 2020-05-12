import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* updateProfile(action) {
  try {
    yield axios.put("/api/user/update", action.payload);
    yield put({
      type: "FETCH_USER",
    });
    yield put({
      type: "GET_USER_DETAILS",
    });
  } catch (err) {
    console.warn(err);
  }
}

function* updateProfileSaga() {
  yield takeLatest("UPDATE_PROFILE", updateProfile);
}

export default updateProfileSaga;
