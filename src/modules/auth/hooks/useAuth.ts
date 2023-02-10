import { useMemo } from "react"

import { useDispatch, useSelector } from "store/hooks"

import type { User } from "../types"
import type { SignIn } from "../contracts"
import { signIn, selectUser } from "../slice"

type UseAuth = () => {
  user: User | null;
  signIn: SignIn;
}

const useAuth: UseAuth = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  const handleSignIn: SignIn = (data) => dispatch(signIn(data)).unwrap();

  return useMemo(() => ({
    user,
    signIn: handleSignIn,
  }), []);
}

export default useAuth;