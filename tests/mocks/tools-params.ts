import { faker } from '@faker-js/faker'

export const toolsParams = {
  id: faker.number.int({ max: 10, min: 1 }),
  name: faker.person.fullName(),
  description: faker.lorem.words(),
  status: faker.helpers.arrayElement(['available', 'reserved', 'inUse']),
  dateOfCollection: new Date(),
  dateOfDevolution: new Date(faker.date.anytime()),
  mechanicName: faker.person.fullName(),
  error: new Error(faker.lorem.word())
}
