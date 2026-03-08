
import HomePage from "@/Components/homePage";
import HomeAddressPage from "@/Components/homeAddressPage";
import FinalPage from "@/Components/finalPage";
import type { RoutesArray } from "./types";

export const base_url = import.meta.env.VITE_API_BASE_URL;

export const routes: RoutesArray = [
  {
    path: "/",
    element:HomePage,
  },
  {
    path: "/step2",
    element: HomeAddressPage,
  },
  {
    path: "/step3",
    element: FinalPage,
  },
];

export const formatPhoneNumber = (value: string): string => {
  const digits = value.replace(/\D/g, "");

  const limited = digits.substring(0, 11);

  if (limited.length === 0) return value.includes('+') ? '+' : '';

  let formatted = `+${limited.slice(0, 1)}`;

  if (limited.length > 1) {
    formatted += ` ${limited.slice(1, 4)}`;
  }
  if (limited.length > 4) {
    formatted += ` ${limited.slice(4, 10)}`;
  }
  if (limited.length > 10) {
    formatted += ` ${limited.slice(10)}`;
  }

  return formatted;
};
