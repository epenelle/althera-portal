import React, { createContext, useContext, useState, ReactNode, FunctionComponent } from 'react';

interface ButtonContextValue {
    buttonValue: number;
    setButtonValue: (value: number) => void;
}

const defaultContextValue: ButtonContextValue = {
    buttonValue: 1,
    setButtonValue: () => {}
};

const ButtonContext = createContext<ButtonContextValue>(defaultContextValue);

interface ButtonContextProviderProps {
    children: ReactNode;
}

export const ButtonContextProvider: FunctionComponent<ButtonContextProviderProps> = ({ children }) => {
    const [buttonValue, setButtonValue] = useState<number>(1);

    const value = { buttonValue, setButtonValue };

    return <ButtonContext.Provider value={value}>{children}</ButtonContext.Provider>;
};

export const useButtonContext = (): ButtonContextValue => {
    return useContext(ButtonContext);
};