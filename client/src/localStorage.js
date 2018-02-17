export const loadState = () => {
  try {
    // save it to the state
    const serializedState = localStorage.getItem("p!nm@g!c");
    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (err) {
    console.log(err);
    return undefined
  }
};

export const saveState = (state) => {
  try {
    // save it in localStorage
    var serializedState = JSON.stringify(state);
    localStorage.setItem("p!nm@g!c", serializedState);
  } catch (err) {
    console.log("Sorry. There is a technical error.");
  }
};
