import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { getRandomCredentials } from '@tests/utils';

import type { SignInData } from '../../../contracts';
import { EMPTY_SIGN_IN_DATA } from '../../../constants';
import Form from './Form';

const user = userEvent.setup();

describe('Form', () => {
  it('should call reset callback', async () => {
    const callback = jest.fn<void, [void]>();
    render(<Form onReset={callback} />);

    await user.click(screen.getByRole('button', { name: /reset/i }));

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should call submit callback', async () => {
    const callback = jest.fn<void, [SignInData]>();
    render(<Form onSubmit={callback} />);

    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should call signIn with empty data', async () => {
    const callback = jest.fn<void, [SignInData]>();
    render(<Form onSubmit={callback} />);

    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(callback).toHaveBeenLastCalledWith(EMPTY_SIGN_IN_DATA);
  });

  it('should call submit callback with correct data', async () => {
    const data: SignInData = getRandomCredentials();
    const callback = jest.fn<void, [SignInData]>();
    render(<Form onSubmit={callback} />);

    await user.type(
      screen.getByRole('textbox', { name: /email/i }),
      data.email,
    );
    await user.type(screen.getByLabelText(/password/i), data.password);
    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(callback).toHaveBeenLastCalledWith(data);
  });
});
