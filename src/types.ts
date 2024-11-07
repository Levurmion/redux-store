export type ValueOf<T> = T[keyof T];

export type DeepValues<T> = T extends object
  ? keyof T extends never
    ? T
    : {
        [K in keyof T]: DeepValues<T[K]>;
      }[keyof T]
  : T;

export type UnionKeys<T> = T extends any ? keyof T : never;

export type SliceReducers = Record<string, Reducers>;

export type StoreReducers<ER extends SliceReducers> = DeepValues<ER>;

export type Callback = () => void;

export interface CreateStoreConfig<R extends SliceReducers, S extends Slice> {
  reducers: R;
  slices: S[];
}

export type StoreActions<
  ER extends SliceReducers,
  Reducers extends StoreReducers<ER> = StoreReducers<ER>,
  SliceNames extends string = Extract<keyof ER, string>,
  ReducerNames extends UnionKeys<ER[SliceNames]> = UnionKeys<ER[SliceNames]>
> = Action<PayloadType<Reducers>, SliceNames, ReducerNames>;

export type Reducer<S = any, P = any> = (state: S, payload?: P) => S;
export type PayloadType<R extends Reducer> = Parameters<R>[1];

export type Reducers<S = any, P = any> = {
  [name: string]: Reducer<S, P>;
};

export type ActionName<ReducerName> = ReducerName extends string
  ? `${ReducerName}Action`
  : never;
export type ActionType<
  SliceName extends string,
  ReducerName
> = ReducerName extends string ? `${SliceName}.${ReducerName}` : never;

export type Action<
  P,
  SliceName extends string = string,
  ReducerName = string
> = { type: ActionType<SliceName, ReducerName>; payload: P };

export type ActionCreator<
  P = any,
  SliceName extends string = string,
  ReducerName = string
> = (payload: P) => Action<P, SliceName, ReducerName>;

export type SliceActions<R extends Reducers, SliceName extends string> = {
  [ReducerName in keyof R]: ActionCreator<
    PayloadType<R[ReducerName]>,
    SliceName,
    ReducerName
  >;
};

export interface Slice<
  S = any,
  N extends string = string,
  R extends Reducers = Reducers
> {
  initialState: S;
  name: N;
  reducers: R;
  actions: SliceActions<R, N>;
}

export interface CreateSliceConfig<S, N extends string, R extends Reducers> {
  initialState: S;
  name: N;
  reducers: R;
}
