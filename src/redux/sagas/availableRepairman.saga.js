import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* getAvailableRepairman(action) {
  try {
    const response = yield axios.get("/api/repairman");
    const data = [...response.data];
    const openCagePromises = [];

    const openCageURL = `https://api.opencagedata.com/geocode/v1/json?`;

    data.forEach((row) => {
      const zip_code = row.zip_code;
      const config = {
        headers: { "Content-Type": "application/json" },
        params: {
          q: encodeURI(zip_code),
          key: process.env.REACT_APP_OPEN_CAGE,
        },
      };
      openCagePromises.push(
        axios.get(openCageURL, config).then((response) => {
          const coordinate = response.data.results[0].geometry;
          row.longitude = coordinate.lng;
          row.latitude = coordinate.lat;
        })
      );
    });

    yield Promise.all(openCagePromises);

    yield put({
      type: "SET_AVAILABLE_REPAIRMAN",
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
