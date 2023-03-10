import axios from "axios";

export function getCountries() {
  return async function (dispatch) {
    try {
      var json = await axios.get("/countries");
      return dispatch({
        type: "GET_COUNTRIES",
        payload: json.data,
      });
    } catch (error) {
      console.log("Error en action", error);
    }
  };
}
export function getNameCountries(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        `/countries?name=${name}`
      );
      return dispatch({
        type: "GET_NAME_COUNTRIES",
        payload: json.data,
      });
    } catch (error) {
      console.log("error en GET_NAME_COUNTRIES", error);
    }
  };
}

export function getActivities() {
  return async function (dispatch) {
    var info = await axios.get("/activities");

    return dispatch({
      type: "GET_ACTIVITIES",
      payload: info.data,
    });
  };
}
export function addActivities(payload) {
  return async function (dispatch) {
    var info = await axios.post("/activities", payload);
    return dispatch({
      type: "POST_ACTIVITIES",
      payload: info.data,
    });
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      let json = await axios.get(`/countries/${id}`);
     return dispatch({
        type: "GET_DETAILS",
        payload: json.data,
      });
    } catch (error) {
      console.log("Error en GET_DETAILS", error);
    }
  };
}
//_________________________________________________FILTROS___________________________________________

export function filterCountriesByContinents(payload) {
  console.log(payload);
  return {
    type: "FILTER_BY_CONTINENTS",
    payload,
  };
}

export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}
export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}
export function orderByPopulation(payload) {
  return {
    type: "ORDER_BY_POPULATION",
    payload,
  };
}