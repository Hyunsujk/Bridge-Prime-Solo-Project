import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* getSpecialty(action) {
  try {
    const response = yield axios.get("/api/criteria/specialty");
    yield put({
      type: "SET_SPECIALTY",
      payload: response.data,
    });
  } catch (err) {
    console.warn(err);
  }
}

function* getRadius(action) {
  try {
    const response = yield axios.get("/api/criteria/radius");
    yield put({
      type: "SET_RADIUS",
      payload: response.data,
    });
  } catch (err) {
    console.warn(err);
  }
}

function* criteriaSaga() {
  yield takeLatest("FETCH_SPECIALTY", getSpecialty);
  yield takeLatest("FETCH_RADIUS", getRadius);
}

export default criteriaSaga;
