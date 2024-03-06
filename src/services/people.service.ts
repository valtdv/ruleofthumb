import { API_URL } from '@/constants/env'
import type { Person } from '@/models/interfaces/person.interface'

const getAll = async (): Promise<Person[]> =>
  await fetch(`${API_URL}/data`).then((response) => response.json())

const updateData = async (id: String, data: Object) => {
  return await fetch(`${API_URL}/data/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then((response) => response.json())
}

export const PeopleService = {
  getAll,
  updateData
}
