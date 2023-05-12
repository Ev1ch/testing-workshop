import { post } from 'api';

import type { SignIn } from "../contracts";
import type { User } from '../types';

const signIn: SignIn = async (data) => {
  const user = await post<User>('/auth/sign-in', data)
  return user;
};

export default signIn;