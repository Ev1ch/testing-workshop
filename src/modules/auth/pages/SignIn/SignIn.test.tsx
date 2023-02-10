import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import path from "path";
import url from "url";

import { mockImport, getRandomUser } from "@tests/utils";

import { useAuth } from "../../hooks";
import { EMPTY_SIGN_IN_DATA } from "../../constants";
import SignIn from "./SignIn";

// const FILENAME = path.dirname(url.fileURLToPath(import.meta.url));
const RANDOM_USER = getRandomUser();
const MOCKED_USE_AUTH_RETURN = { user: null, signIn: jest.fn() };

jest.mock("../../hooks", () => {
  const originalModule = jest.requireActual("../../hooks");

  return {
    __esModule: true,
    ...originalModule,
    useAuth: jest.fn(() => MOCKED_USE_AUTH_RETURN),
  };
});

// mockImport(path.resolve(FILENAME, "../../hooks"), {
//   useAuth: jest.fn(() => MOCKED_USE_AUTH_RETURN),
// });

describe("SignIn", () => {
  it("rendered component should be in document", () => {
    MOCKED_USE_AUTH_RETURN.signIn.mockReturnValueOnce(
      new Promise((resolve) => {
        {
          MOCKED_USE_AUTH_RETURN.user = RANDOM_USER;
          resolve(RANDOM_USER);
        }
      })
    );
    render(<SignIn />);

    userEvent.click(screen.getByRole("button"));

    const signInCalls = MOCKED_USE_AUTH_RETURN.signIn.mock.calls;
    expect(signInCalls).toHaveLength(1);
    expect(signInCalls[0][0]).toEqual(EMPTY_SIGN_IN_DATA);
  });
});
