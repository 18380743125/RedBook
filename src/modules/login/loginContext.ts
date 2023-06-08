import { createContext } from 'react';

interface ILoginContext {
  check: boolean;
  setCheck: (flag: boolean) => void;
}

const initialState: ILoginContext = {
  check: true,
  setCheck: (flag: boolean) => {},
};

export const LoginContext = createContext<ILoginContext>(initialState);
