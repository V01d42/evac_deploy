import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

export const initialValue: string = '';

export const AuthContext = createContext<{
  uid: string;
  setUid: Dispatch<SetStateAction<string>>;
}>({
  uid: initialValue,
  setUid: () => {},
});

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  return { ...context };
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [uid, setUid] = useState<string>(initialValue);

  const value = {
    uid,
    setUid,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
