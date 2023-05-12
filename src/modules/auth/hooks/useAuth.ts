import { useCallback, useMemo } from "react"

import { useDispatch, useSelector } from "store/hooks"

import type { User } from "../types"
import type { SignIn } from "../contracts"
import { signIn, selectUser } from "../slice"

export type UseAuthReturn = {
  user: User | null;
  signIn: SignIn;
};

export type UseAuth = () => UseAuthReturn;

const useAuth: UseAuth = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  const handleSignIn: SignIn = useCallback((data) => dispatch(signIn(data)).unwrap(), [dispatch]);

  return useMemo(() => ({
    user,
    signIn: handleSignIn,
  }), [handleSignIn, user]);
}

export default useAuth;