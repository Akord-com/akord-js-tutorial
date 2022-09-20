export const initialState = {
  current_user: null,
};

export const Reducer = (state, action) => {
  const time_stamp = new Date()
    .toISOString()
    .replace(/T/, " ")
    .replace(/\..+/, "");

  // console.log("prevState: ", state);
  // console.log("action: ", action);

  switch (action.type) {
    case "INIT":
      scrollToRef(`board-position-${state.position}`);
      return initialState;
    case "SHOW":
      scrollToRef("about-this-position");
      return {
        ...state,
        displayPosition: action.payload,
      };
    case "HIDE":
      return {
        ...state,
        displayPosition: null,
      };
    case "LOAD":
      return action.payload;
    case "ROLL":
      var dice_roll = getRandomInt(6); // 0 - 5
      var next_pos = GetBoardPosition(state.position).moves[dice_roll];
      var prevPositions = state.prevPositions;
      prevPositions.push(state.position);
      // calc merit change
      var meritPos = next_pos === 0 ? state.position : next_pos;
      var meritChange = Math.pow((meritPos - MERIT_CENTER) * MERIT_FACTOR, 3);

      const timer = setTimeout(() => {
        scrollToRef(`board-position-${next_pos}`);
      }, 500);

      // if true, we move to new position, else we stay on current position
      if (next_pos > 0) {
        return {
          ...state,
          position: next_pos,
          displayPosition: next_pos,
          diceRoll: dice_roll + 1, // 1-6
          prevPositions,
          timeStamp: time_stamp,
          meritChange,
          meritTotal: state.meritTotal + meritChange,
        };
      } else {
        return {
          ...state,
          diceRoll: dice_roll + 1, // 1-6
          prevPositions,
          timeStamp: time_stamp,
          meritChange,
          meritTotal: state.meritTotal + meritChange,
        };
      }
    default:
      return state;
  }
};
