import { createSlice } from "./src/createSlice";
import { createStore } from "./src/createStore";

const helloFooSlice = createSlice({
  initialState: { hello: "world", foo: "bar" },
  name: "SuperSlice",
  reducers: {
    editHello: (state, payload: string) => {
      state.hello = payload;
      return { ...state };
    },
    editFoo: (state, payload: string) => {
      state.foo = payload;
      return { ...state };
    },
  },
});

const barSlice = createSlice({
  initialState: { bar: 1 },
  name: "barSlice",
  reducers: {
    editBar: (state, payload: number) => {
      state.bar = payload;
      return { ...state };
    },
  },
});

const { editHello, editFoo } = helloFooSlice.actions;
const { editBar } = barSlice.actions;

const store = createStore({
  reducers: {
    [helloFooSlice.name]: helloFooSlice.reducers,
    [barSlice.name]: barSlice.reducers,
  },
  slices: [helloFooSlice, barSlice],
});

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(editFoo("Slay"));
store.dispatch(editHello("Whaw"));
store.dispatch(editBar(22));
