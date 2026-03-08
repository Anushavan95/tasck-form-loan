import { FormContext, type StepOneData, type StepTwoData,  type StepThreeData } from "@/utils/types";
import React, { useState} from "react";
import type { ReactNode } from 'react';

// I decided to use Context API instead of Redux because it is a simpler, more lightweight solution that is sufficient for this project.
// Я решил использовать Context API вместо Redux, поскольку это более простое и легкое решение, которого достаточно для данного проекта.


type Props = { children: ReactNode };


export const FormProvider: React.FC<Props> = ({ children }) => {
  const [userForm, setUserForm] = useState<StepOneData>({
    phone: "",
    firstName: "",
    lastName: "",
    gender: "",
  });
  const [formAddress, setFormAddressPlace] = useState<StepTwoData>({
    workplace: "",
    address: "",
  });

  const [loanAmount, setLoanAmount] = useState<StepThreeData>({
    loanAmount: 200,
    loanDays: 10,
  });

  const reset = () => {
    setUserForm({ phone: "", firstName: "", lastName: "", gender: "" });
    setFormAddressPlace({ workplace: "", address: "" });
    setLoanAmount({ loanAmount: 200, loanDays: 10 });
  };

  return (
    <FormContext.Provider
      value={{
        userForm,
        formAddress,
        loanAmount,
        setUserForm: setUserForm,
        setFormAddressPlace: setFormAddressPlace,
        setLoanAmount:  setLoanAmount,
        reset,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
