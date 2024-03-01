import { SAVE } from "./actionType";

const saveData = (payload) => ({
  type: SAVE,
  payload
});

export { saveData };