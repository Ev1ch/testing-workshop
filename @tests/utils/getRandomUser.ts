import { faker } from '@faker-js/faker';

export default function getRandomUser() {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  }
}