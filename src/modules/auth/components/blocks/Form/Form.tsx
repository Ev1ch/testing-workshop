import { type ChangeEvent, type FormEvent, useState } from "react";

import { Button } from "@ui";

import type { SignInData } from "../../../contracts";
import { EMPTY_SIGN_IN_DATA } from "../../../constants";

enum State {
  LOADING,
  ERROR,
  SUCCESS,
  DEFAULT,
}

export interface FormProps {
  onSubmit?: (data: SignInData) => void;
}

export default function Form({ onSubmit }: FormProps) {
  const [state, setState] = useState(State.DEFAULT);
  const [data, setData] = useState<SignInData>(EMPTY_SIGN_IN_DATA);
  const isLoading = state === State.LOADING;
  const isErrored = state === State.ERROR;
  const isSuccess = state === State.SUCCESS;

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

  return (
    <form onSubmit={handleSubmit}>
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
          <input onChange={getChangeHandler("email")} />
        </label>
        <label>
          <p>Password</p>
          <input onChange={getChangeHandler("password")} />
        </label>
      </fieldset>
      <Button disabled={isLoading || isErrored}>Submit</Button>
    </form>
  );
}
