import { useCreateContext } from "./create-context";

const initialState = {
  currentWallet: "",
};
type State = typeof initialState;
type Action = any;
function reducer(state: State, action: Action) {
  switch (action.type) {
    case "SET_WALLET":
      return {
        ...state,
        currentWallet: action.data,
      };
    default:
      return state;
  }
}
const [useWalletState, useWalletDispatch, WalletProvider] = useCreateContext(
  initialState,
  reducer
);

export { useWalletState, useWalletDispatch, WalletProvider };
