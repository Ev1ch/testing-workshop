import type { User } from '../types'

interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
}

export default initialState;