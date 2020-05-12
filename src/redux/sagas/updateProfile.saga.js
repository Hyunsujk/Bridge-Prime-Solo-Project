import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* updateProfile(action) {
  try {
    yield axios.delete(`/api/user/delete/specialty/${action.payload.id}`);
    yield axios.put("/api/user/update", action.payload);
    if (action.payload.type_id === 2) {
      yield axios.post("api/user/update/repairman", action.payload);
    }
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
