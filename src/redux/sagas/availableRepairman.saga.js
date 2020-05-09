import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* getAvailableRepairman(action) {
  try {
    const response = yield axios.get("/api/repairman");
    yield put({
      type: "SET_REPAIRMAN",
      payload: response.data,
    });
  } catch (err) {
    console.warn(err);
  }
}

function* availableRepairmanSaga() {
  yield takeLatest("GET_AVAILABLE_REPAIRMAN", getAvailableRepairman);
}

export default availableRepairmanSaga;
