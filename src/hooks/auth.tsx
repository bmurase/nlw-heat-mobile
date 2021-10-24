import React, { 
  createContext, 
  ReactNode, 
  useContext, 
  useEffect, 
  useState 
} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSessions from 'expo-auth-session';

import { api } from "../services/api";

const CLIENT_ID = 'd6c70845db4863800f16';
const SCOPE = 'read:user';
const USER_STORAGE = '@nlwheat:user';
const TOKEN_STORAGE = '@nlwheat:token';

type AuthContextData = {
  user: User | null;
  isSigningIn: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

type AuthProviderProps = {
  children: ReactNode;
}

type AuthResponse = {
  token: string;
  user: User;
}

type AuthorizationResponse = {
  params: {
    code?: string;
    error?: string;
  },
  type?: string;
}

type User = {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider(props: AuthProviderProps) {
  const [loggedUser, setLoggedUser] = useState<User | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(true);

  async function signIn() {
    try {
      setIsSigningIn(true);

      const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`;
      const authSessionResponse = await AuthSessions.startAsync({ authUrl }) as AuthorizationResponse;

      if (
        authSessionResponse.type === 'success' && 
        authSessionResponse.params.error !== 'access_denied'
      ) {
        const response = await api.post<AuthResponse>('authenticate', {
          code: authSessionResponse.params.code,
        });

        const { token, user } = response.data;

        api.defaults.headers.common.authorization = `Bearer ${token}`;
        setLoggedUser(user);

        await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
        await AsyncStorage.setItem(TOKEN_STORAGE, token);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsSigningIn(false);    
    }
  }

  async function signOut() {
    setLoggedUser(null);
    await AsyncStorage.removeItem(TOKEN_STORAGE);
    await AsyncStorage.removeItem(USER_STORAGE);
  }

  useEffect(() => {
    async function loadUserStorageData() {
      const user = await AsyncStorage.getItem(USER_STORAGE);
      const token = await AsyncStorage.getItem(TOKEN_STORAGE);

      if (token && user) {
        api.defaults.headers.common.authorization = `Bearer ${token}`;
        setLoggedUser(JSON.parse(user));
      }

      setIsSigningIn(false);
    }

    loadUserStorageData();
  }, []);
  
  return (
    <AuthContext.Provider value={{ isSigningIn, user: loggedUser, signOut, signIn}}>
      {props.children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}