/// <reference types="vite/client" />

type SlotType = {
  _id: string;
  slot: string;
  day: string;
  isBooked: boolean;
};

type UserType = {
  _id: string;
  email: string;
  role: string;
  free_slots?: SlotType[];
};
