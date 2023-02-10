import { faker } from '@faker-js/faker';

import type { User } from 'modules/auth/types'; 
    
export default function getRandomUser(): User {
    return {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
    }
}