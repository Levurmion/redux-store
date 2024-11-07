import type {
  Callback,
  CreateStoreConfig,
  SliceReducers,
  Slice,
  StoreActions,
} from "./types";

export const createStore = <R extends SliceReducers, S extends Slice>({
  reducers,
  slices,
}: CreateStoreConfig<R, S>) => {
  let state = {} as any;
  let subscribers: Callback[] = [];

  for (const slice of slices) {
    state[slice.name] = slice.initialState;
  }

  const getState = () => state;

  const dispatch = (action: StoreActions<typeof reducers>) => {
    const [slicePath, reducerPath] = action.type.split(".");
    state[slicePath] = reducers[slicePath][reducerPath](
      state[slicePath],
      action.payload
    );
    for (const callback of subscribers) {
      callback();
    }
  };

  const subscribe = (callback: Callback) => {
    subscribers.push(callback);
    return () => (subscribers = subscribers.filter((cb) => cb !== callback));
  };

  return {
    getState,
    dispatch,
    subscribe,
  };
};
