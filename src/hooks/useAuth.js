import { useContext } from 'react';

// project-imports
import AuthContext from 'contexts/JWTContext';

// ==============================|| HOOKS - AUTH ||============================== //

export default function useAuth() {
  const context = useContext(AuthContext);

  if (!context) throw new Error('context must be use inside provider');

  return context;
}
