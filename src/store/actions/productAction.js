import axios from "axios";

const setProductData = (payload) => {
  return {
    type: "productData/setProductData",
    payload: payload,
  };
};

const setHeart = (payload) => {
  return {
    type: "heart/setHeart",
    payload: payload.heart,
    id: payload.id,
  };
};

export const fetchProductData = () => {
  return (dispatch, getState) => {
    axios({
      // configure your ip here
      url: "http://192.168.1.7:3000/products",
      method: "GET",
    })
      .then((response) => {
        dispatch(setProductData(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const toggleHeart = (payload) => {
  return (dispatch, getState) => {
    if (payload.heart == false) {
      dispatch(setHeart({ heart: true, id: payload.id }));
    } else {
      dispatch(setHeart({ heart: false, id: payload.id }));
    }
  };
};
