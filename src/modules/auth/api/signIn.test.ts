import { getRandomCredentials, getRandomUser } from '@tests/utils';
import { post } from 'api';

import type { SignInData } from '../contracts';
import signIn from './signIn';

const RANDOM_USER = getRandomUser();

const MOCKED_POST = post as jest.Mock<any, [string, unknown]>;
jest.mock('api', () => {
  const originalModule = jest.requireActual('api');

  return {
    __esModule: true,
    ...originalModule,
    post: jest.fn<any, [string, unknown]>(),
  };
});

describe('Form', () => {
  beforeEach(() => {
    MOCKED_POST.mockClear();
  });

  it('should call reset callback', async () => {
    const data: SignInData = getRandomCredentials();

    await signIn(data);

    expect(MOCKED_POST).toHaveBeenCalledTimes(1);
  });

  it('should call reset callback', async () => {
    const data: SignInData = getRandomCredentials();

    await signIn(data);

    expect(MOCKED_POST.mock.lastCall?.at(1)).toEqual(data);
  });

  it('should call reset callback', async () => {
    const data: SignInData = getRandomCredentials();
    MOCKED_POST.mockResolvedValueOnce(RANDOM_USER);

    const user = await signIn(data);

    expect(user).toEqual(RANDOM_USER);
  });
});
