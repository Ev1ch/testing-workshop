import { type ChangeEvent, type FormEvent, useState } from 'react';

import { Button } from '@ui';

import type { SignInData } from '../../../contracts';
import { EMPTY_SIGN_IN_DATA } from '../../../constants';

enum State {
  LOADING,
  ERROR,
  SUCCESS,
  DEFAULT,
}

export interface FormProps {
  onSubmit?: (data: SignInData) => void;
  onReset?: () => void;
}

export default function Form({ onSubmit, onReset }: FormProps) {
  const [state, setState] = useState(State.DEFAULT);
  const [data, setData] = useState<SignInData>(EMPTY_SIGN_IN_DATA);
  const isLoading = state === State.LOADING;
  const isErrored = state === State.ERROR;
  const isSuccess = state === State.SUCCESS;
  const isButtonEnabled = !isLoading && !isErrored;

  const getChangeHandler =
    (field: keyof typeof data) => (event: ChangeEvent<HTMLInputElement>) => {
      setData((prevState) => ({ ...prevState, [field]: event.target.value }));
      setState(State.DEFAULT);
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState(State.LOADING);

    try {
      await onSubmit?.(data);
      setState(State.SUCCESS);
    } catch (error) {
      setState(State.ERROR);
    }
  };

  const handleReset = () => {
    setData(EMPTY_SIGN_IN_DATA);
    onReset?.();
  };

  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      {isSuccess && (
        <div>
          <p>Success</p>
        </div>
      )}
      {isErrored && (
        <div>
          <p>Error</p>
        </div>
      )}
      <fieldset disabled={isLoading}>
        <label>
          <p>Email</p>
          <input
            type="email"
            onChange={getChangeHandler('email')}
            value={data.email}
          />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={getChangeHandler('password')}
            value={data.password}
          />
        </label>
      </fieldset>
      <div>
        <Button type="reset" disabled={!isButtonEnabled}>
          Reset
        </Button>
        <Button type="submit" disabled={!isButtonEnabled}>
          Submit
        </Button>
      </div>
    </form>
  );
}
