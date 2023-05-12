import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { getRandomCredentials } from '@tests/utils';

import type { SignInData } from '../../contracts';
import type { User } from '../../types';
import { type UseAuthReturn, useAuth } from '../../hooks';
import { EMPTY_SIGN_IN_DATA } from '../../constants';
import SignIn from './SignIn';

const user = userEvent.setup();

const MOCKED_USE_AUTH = useAuth as jest.Mock<UseAuthReturn, [void]>;
jest.mock('../../hooks', () => {
  const originalModule = jest.requireActual('../../hooks');

  return {
    __esModule: true,
    ...originalModule,
    useAuth: jest.fn<UseAuthReturn, [void]>(),
  };
});

describe('SignIn', () => {
  beforeEach(() => {
    MOCKED_USE_AUTH.mockClear();
  });

  it('should call signIn with empty data', async () => {
    const mockedSignIn = jest.fn<Promise<User>, [SignInData]>();
    MOCKED_USE_AUTH.mockReturnValue({
      user: null,
      signIn: mockedSignIn,
    });
    render(<SignIn />);

    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(mockedSignIn).toHaveBeenLastCalledWith(EMPTY_SIGN_IN_DATA);
  });

  it('should call signIn with correct data', async () => {
    const data: SignInData = getRandomCredentials();
    const mockedSignIn = jest.fn<Promise<User>, [SignInData]>();
    MOCKED_USE_AUTH.mockReturnValue({
      user: null,
      signIn: mockedSignIn,
    });
    render(<SignIn />);

    await user.type(
      screen.getByRole('textbox', { name: /email/i }),
      data.email,
    );
    await user.type(screen.getByLabelText(/password/i), data.password);
    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(mockedSignIn).toHaveBeenLastCalledWith(data);
  });
});
