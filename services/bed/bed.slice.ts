import {
  createEntityAdapter,
  createSlice,
  nanoid,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { BedNormalised } from "../types";
import { getInitialNormalisedGardenData } from "../utils/getInitialNormalisedGardenData";

const bedAdaptor = createEntityAdapter<BedNormalised>();

// initializing createEntityAdapter state https://github.com/reduxjs/redux-toolkit/issues/493#issuecomment-612471868
const preInitialisedState = bedAdaptor.getInitialState();
const normalisedBedData = getInitialNormalisedGardenData().beds;
const initialisedState = bedAdaptor.upsertMany(
  preInitialisedState,
  normalisedBedData
);

export const bedSlice = createSlice({
  name: "beds",
  initialState: initialisedState,
  reducers: {
    add: (state, { payload }: PayloadAction<Omit<BedNormalised, "id">>) =>
      bedAdaptor.addOne(state, { ...payload, id: nanoid() }),

    remove: bedAdaptor.removeOne,
    update: bedAdaptor.updateOne,
  },
});

export const bedActions = bedSlice.actions;

export type BedSlice = {
  [bedSlice.name]: ReturnType<typeof bedSlice["reducer"]>;
};

const genericSelectors = bedAdaptor.getSelectors<BedSlice>(
  (state) => state[bedSlice.name]
);

const customSelectors = {
  selectByIds: (state: RootState, ids: string[]) =>
    ids.map((id) => state[bedSlice.name].entities[id]!),
  selectByGarden: (state: RootState, gardenId: string) =>
    genericSelectors.selectAll(state).filter((bed) => bed.garden === gardenId),
};

export const bedSelectors = {
  ...genericSelectors,
  ...customSelectors,
};