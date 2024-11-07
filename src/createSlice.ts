import type {
  ActionCreator,
  CreateSliceConfig,
  Reducers,
  Slice,
} from "./types";

export const createSlice = <S, N extends string, R extends Reducers<S>>({
  initialState,
  name,
  reducers,
}: CreateSliceConfig<S, N, R>) => {
  const actions: any = {};

  // create corresponding actions
  for (const reducerName of Object.keys(reducers)) {
    const actionType = `${name}.${reducerName}`;
    const action: ActionCreator = (payload) => ({
      type: actionType as any,
      payload,
    });
    actions[reducerName] = action;
  }

  return {
    name,
    initialState,
    reducers,
    actions,
  } as Slice<S, N, R>;
};
