const initalState = {
  productData: [],
};

export default function productReducer(state = initalState, action) {
  switch (action.type) {
    case "productData/setProductData":
      return { ...state, productData: action.payload };
    case "heart/setHeart":
      return {
        ...state,
        productData: state.productData.map((productData) =>
          productData.id === action.id
            ? { ...productData, heart: action.payload }
            : productData
        ),
      };
    default:
      return state;
  }
}
