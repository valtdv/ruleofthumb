import { API_URL } from '@/constants/env'
import type { Person } from '@/models/interfaces/person.interface'

const getAll = async (): Promise<Person[]> =>
  await fetch(`${API_URL}/data`).then((response) => response.json())

export const PeopleService = {
  getAll
}
