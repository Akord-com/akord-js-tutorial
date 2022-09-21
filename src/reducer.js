export const initialState = {
  state: "DEFAULT",
  current_user: null,
};

export const Reducer = (state, action) => {
  console.log(state, action);
  switch (action.type) {
    case "INIT":
      return initialState;
    case "USER_LOGIN":
      return {
        ...state,
        state: "WALLET",
        current_user: action.payload,
      };
    case "USER_LOGOUT":
      return {
        ...state,
        state: "DEFAULT",
        current_user: null,
      };
    default:
      return state;
  }
};
