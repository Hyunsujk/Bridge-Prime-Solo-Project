import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* getRepairman(action) {
  try {
    const repairmanId = action.payload;
    const response = yield axios.get(`/api/repairman/details/${repairmanId}`);
    yield put({
      type: "SET_REPAIRMAN",
      payload: response.data[0],
    });
  } catch (err) {
    console.warn(err);
  }
}

function* repairmanSaga() {
  yield takeLatest("GET_REPAIRMAN", getRepairman);
}

export default repairmanSaga;
