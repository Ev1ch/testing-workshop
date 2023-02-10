import type { User } from "../types";

export interface SignInData {
  email: string;
  password: string;
}

type SignIn = (data: SignInData) => Promise<User>;

export default SignIn;