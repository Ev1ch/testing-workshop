import { type TypedUseSelectorHook, useSelector as useReduxSelector } from 'react-redux';

import type { State } from '../types';

const useSelector: TypedUseSelectorHook<State> = useReduxSelector;

export default useSelector;
