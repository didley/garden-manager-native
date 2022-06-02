import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { VeggieLogNormalised } from "../types";
import { getInitialNormalisedGardenData } from "../utils/getInitialNormalisedGardenData";
import { RootState } from "../../store";

const logAdaptor = createEntityAdapter<VeggieLogNormalised>();

// initializing createEntityAdapter state https://github.com/reduxjs/redux-toolkit/issues/493#issuecomment-612471868
const preInitialisedState = logAdaptor.getInitialState();
const normalisedLogData = getInitialNormalisedGardenData().logs ?? {};
const initialisedState = logAdaptor.upsertMany(
  preInitialisedState,
  normalisedLogData
);

export const logSlice = createSlice({
  name: "logs",
  initialState: initialisedState,
  reducers: {},
});

export const gardenActions = logSlice.actions;

export type LogSlice = {
  [logSlice.name]: ReturnType<typeof logSlice["reducer"]>;
};

export const selectors = logAdaptor.getSelectors<LogSlice>(
  (state) => state[logSlice.name]
);

const customSelectors = {
  selectByIds: (state: RootState, ids: string[]) =>
    ids.map((id) => state[logSlice.name].entities[id]!),
};

export const logSelectors = {
  ...selectors,
  ...customSelectors,
};
