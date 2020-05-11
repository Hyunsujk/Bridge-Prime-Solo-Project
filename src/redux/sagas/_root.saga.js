import { all } from "redux-saga/effects";
import loginSaga from "./login.saga";
import registrationSaga from "./registration.saga";
import userSaga from "./user.saga";
import openCageSaga from "./opencage.saga";
import criteriaSaga from "./criteria.saga";
import availableRepairmanSaga from "./availableRepairman.saga";
import repairmanSaga from "./repairman.saga";

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    criteriaSaga(),
    openCageSaga(),
    availableRepairmanSaga(),
    repairmanSaga(),
  ]);
}
