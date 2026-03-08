import {   createContext, type Dispatch, type  ReactNode, type SetStateAction } from "react"

export type RouteItem = {
  path: string;
  element: React.ComponentType | ReactNode;
};
export type RoutesArray = RouteItem[]

export type StepOneData = {
  phone: string;
  firstName: string;
  lastName: string;
  gender: string;
};

export type StepTwoData = {
  workplace: string;
  address: string;
};

export type StepThreeData = {
  loanAmount: number;
  loanDays: number;
};

export type FormData = StepOneData & StepTwoData & StepThreeData;

type FormContextType = {
  userForm: StepOneData;
  formAddress: StepTwoData;
  loanAmount: StepThreeData;
  setUserForm: Dispatch<SetStateAction<StepOneData>>;
  setFormAddressPlace:  Dispatch<SetStateAction<StepTwoData>>;
  setLoanAmount: Dispatch<SetStateAction<StepThreeData>>;
  reset: () => void;
};

export const FormContext = createContext<FormContextType | undefined>(undefined);
