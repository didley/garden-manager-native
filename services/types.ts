type Months =
  | "JAN"
  | "FEB"
  | "MAR"
  | "APR"
  | "MAY"
  | "JUN"
  | "JUL"
  | "AUG"
  | "SEP"
  | "OCT"
  | "NOV"
  | "DEC";

export type Garden = {
  name: string;
  id: string;
  beds?: Bed[];
};

export type NewGardenForm = {
  newGardenName: string;
};

export type NewBedForm = {
  newBedName: string;
};

export type Bed = {
  name: string;
  id: string;
  veggies?: Veggie[];
};

export type Veggie = {
  id: string;
  veggieInfoId: string;
  name: string;
  notes?: string;
  sowDate?: string;
  harvestDate?: string;
  logs?: VeggieLog[];
};

export type VeggieLog = {
  id: string;
  creationDate: string;
  editedDate?: string;
  soilDescription?: string;
  phLevel?: number;
  notes?: string;
  photos?: string[];
};

export type VeggieInfo = {
  id: string;
  name: string;
  description?: string; // TODO: won't be optional once all veggies added with descriptions
  growSeason: { from: Months; to: Months };
  companionVeggieIds?: string[];
  combativeVeggieIds?: string[];
  image?: string;
  starred: boolean;
};
