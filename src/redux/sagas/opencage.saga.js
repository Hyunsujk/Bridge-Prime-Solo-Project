import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* fetchOpenCage(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const search_url = encodeURI(action.payload.search_string);
    const openCageURL = `https://api.opencagedata.com/geocode/v1/json?q=${search_url}&key=${process.env.REACT_APP_OPEN_CAGE}&language=en&pretty=1`;

    const response = yield axios.get(openCageURL, config);
    const cords = response.data.results[0].geometry;

    yield put({
      type: "SET_CORD",
      payload: {
        lat: cords.lat,
        lng: cords.lng,
        updateNeeded: true,
      },
    });
  } catch (error) {
    console.log("Error in Open Cage call");
  }
}

// function* fetchRepairman(action) {
//   try {
//     const config = {
//       headers: { "Content-Type": "application/json" },
//       // params: { q: encodeURI(zip_code), key: process.env.REACT_APP_OPEN_CAGE },
//     };

//     const openCageURL = `https://api.opencagedata.com/geocode/v1/json?`;

//     const response = yield axios.get(openCageURL, config);
//     console.log(response);
//     yield put({
//       type: "SET_REPAIRMAN_CORD",
//       payload: response.data,
//     });
//   } catch (error) {
//     console.log("Error in Open Cage call");
//   }
// }

function* openCageSaga() {
  yield takeLatest("FETCH_OPEN_CAGE", fetchOpenCage);
  // yield takeLatest("FETCH_REPAIRMAN_CORD", fetchRepairman);
}

export default openCageSaga;
