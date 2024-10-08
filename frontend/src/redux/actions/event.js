import axios from "axios";
import { server } from "../../server";

// create event

export const createEvent = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "eventCreateRequest",
    });
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(
      `${server}/event/create-event`,
      newForm,
      config
    );
    dispatch({
      type: "eventCreateSuccess",
      payload: data.event,
    });
  } catch (error) {
    dispatch({
      type: "eventCreateFailure",
      payload: error.response.data.message,
    });
  }
};

// get all shop events

export const getAllEventsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllEventsShopRequest",
    }); 

    const { data } = await axios.get(
      `${server}/event/get-all-events/${id}`
    );
    
    dispatch({
      type: "getAllEventsShopSuccess",
      payload: data.events,
    });

  } catch (error) {
    dispatch({
      type: "getAllEventsShopFailure",
      payload: error.response.data.message,
    });
  }
};


// delete shop event

export const deleteEvent = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteEventRequest",
    });

    const { data } = await axios.delete(
      `${server}/event/delete-shop-event/${id}`, {
        withCredentials: true
      });
    
    dispatch({
      type: "deleteEventSuccess",
      payload: data.message,
    });

  } catch (error) { 
    dispatch({
      type: "deleteEventFailure",
      payload: error.response.data.message,
    });
  }
};


// get all events site

export const getAllEvents = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllEventsRequest",
    }); 

    const { data } = await axios.get(
      `${server}/event/get-all-events` 
    );
    
    dispatch({
      type: "getAllEventsSuccess",
      payload: data.events,
    });

  } catch (error) {
    dispatch({
      type: "getAllEventsFailure",
      payload: error.response.data.message,
    });
  }
};

