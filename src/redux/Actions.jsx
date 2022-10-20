import { GET_WEATHER } from "./Constants";

import { toast } from "react-toastify";



export const searchCity = (location = "hyderabad") => async dispatch => {
    dispatch({ type: GET_WEATHER.CITY , payload :  "location"});
    
  };


export const GetWeatherDetails = (location = "hyderabad") => async dispatch => {
  dispatch({ type: GET_WEATHER.PENDING });
  fetch(`http://api.weatherstack.com/current?access_key=${"6897c2a78c65645726bf011a015d4f69"}&query=${location}`,{method: 'GET'}).then(response => {return response.json()})
    .then(response => {
        if(response?.success === 'false')
        {
            console.log(response.error.type);
            toast.error(response.error.type, {
              position: "bottom-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: false
            });
            dispatch({ type: GET_WEATHER.REJECTED, payload: response });
        }
        else{
      dispatch({ type: GET_WEATHER.SUCCESS, payload: response })
        }
    }
      )
    .catch(err => {
      console.log(err.response, err);
      toast.error(err.response.data.message, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false
      });
      dispatch({ type: GET_WEATHER.REJECTED, payload: err.response });
    });
};
