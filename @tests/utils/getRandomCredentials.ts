import { faker } from '@faker-js/faker';

export default function getRandomUser() {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
  }
}