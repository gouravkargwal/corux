import { createTransform } from "redux-persist";

const authTransform = createTransform(
  // transform state on its way to being serialized and persisted.
  (inboundState, key) => {
    // You can add other transformations here if necessary
    return inboundState;
  },
  // transform state being rehydrated
  (outboundState, key) => {
    // Reset isRefreshing during rehydration
    return { ...outboundState, isRefreshing: false };
  },
  // define which reducers this transform gets called for.
  { whitelist: ["auth"] } // Use the name of your auth slice or reducer
);
export default authTransform;
