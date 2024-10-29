import { createContext, ReactNode, useContext, useState } from "react";

interface FormStateInterface {
  type: "task" | "board" | null;
}

interface FormContextInterface extends FormStateInterface {
  openForm: (type: "task" | "board") => void;
  closeForm: () => void;
}

const FormContext = createContext<FormContextInterface | undefined>(undefined);

export const useForm = () => {
  const context = useContext(FormContext);

  if (!context) throw new Error("useForm must be used within a FormProvider");

  return context;
};

interface FormProviderPropsInterface {
  children: ReactNode;
}

export const FormProvider = ({ children }: FormProviderPropsInterface) => {
  const [formState, setFormState] = useState<FormStateInterface>({
    type: null,
  });

  const openForm = (type: "task" | "board") => {
    setFormState({
      type,
    });
  };

  const closeForm = () => {
    setFormState({
      type: null,
    });
  };

  return (
    <FormContext.Provider value={{ ...formState, openForm, closeForm }}>
      {children}
    </FormContext.Provider>
  );
};
