import React, { createContext, useEffect, useReducer } from 'react';

// third-party
import { Chance } from 'chance';
import { jwtDecode } from 'jwt-decode';

// reducer - state management
import { LOGIN, LOGOUT } from 'contexts/auth-reducer/actions';
import authReducer from 'contexts/auth-reducer/auth';

// project-imports
import Loader from 'components/Loader';
import axios from 'utils/axios';

const chance = new Chance();

// constant
const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};

const verifyToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }
  try {
    const decoded = jwtDecode(accessToken);
    return decoded.exp > Date.now() / 1000;
  } catch (e) {
    return false;
  }
};

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //

const JWTContext = createContext(null);

export const JWTProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const init = async () => {
      try {
        let accessToken = window.localStorage.getItem('accessToken');

        // If token doesn't exist or is expired, try refresh
        if (!verifyToken(accessToken)) {
          const refreshResponse = await axios.get('/auth/refresh');
          accessToken = refreshResponse.data.accessToken;

          if (accessToken) {
            setSession(accessToken);
          } else {
            throw new Error('Unable to refresh access token');
          }
        } else {
          setSession(accessToken);
        }

        // Decode user from token
        const decoded = jwtDecode(accessToken);
        const user = decoded.user || {
          id: decoded.id,
          name: decoded.name,
          role: decoded.role
        };

        dispatch({
          type: LOGIN,
          payload: {
            isLoggedIn: true,
            user
          }
        });
      } catch (err) {
        console.error(err);
        setSession(null);
        dispatch({ type: LOGOUT });
      } finally {
        // Always mark as initialized
        dispatch((prev) => ({
          ...prev,
          type: 'INIT', // Optional: use in reducer if needed
          payload: {
            isInitialized: true
          }
        }));
      }
    };

    init();
  }, []);

  const login = async (email, password) => {
    const response = await axios.post('/auth/login', { email, password });
    const { accessToken, user } = response.data;
    setSession(accessToken);
    dispatch({
      type: LOGIN,
      payload: {
        isLoggedIn: true,
        user
      }
    });
  };

  const register = async (email, password, firstName, lastName) => {
    const id = chance.bb_pin();
    const response = await axios.post('/api/account/register', {
      id,
      email,
      password,
      firstName,
      lastName
    });
    let users = response.data;

    if (window.localStorage.getItem('users') !== undefined && window.localStorage.getItem('users') !== null) {
      const localUsers = window.localStorage.getItem('users');
      users = [
        ...JSON.parse(localUsers),
        {
          id,
          email,
          password,
          name: `${firstName} ${lastName}`
        }
      ];
    }

    window.localStorage.setItem('users', JSON.stringify(users));
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: LOGOUT });
  };

  const resetPassword = async (email) => {
    console.log('email - ', email);
  };

  const updateProfile = () => {};

  // Show loader until initialized
  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  }

  return (
    <JWTContext.Provider
      value={{ ...state, login, logout, register, resetPassword, updateProfile }}
    >
      {children}
    </JWTContext.Provider>
  );
};

export default JWTContext;
