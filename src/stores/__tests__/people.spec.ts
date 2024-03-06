import { setActivePinia, createPinia } from 'pinia'
import { nextTick } from 'vue'
import { usePeopleStore } from '../people'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { PeopleService } from '@/services/people.service'
import { mockData } from './__mocks__/data'

vi.mock('@/services/people.service')

describe('People store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  // States and Getters

  it('should have an initial state', () => {
    const peopleStore = usePeopleStore()
    const peopleData = peopleStore.getPeopleData

    expect(peopleData).toHaveLength(0)
  })

  // Actions

  it('should set data after fetch', async () => {
    const getAll = vi.spyOn(PeopleService, 'getAll').mockResolvedValue(mockData)

    const peopleStore = usePeopleStore()
    await peopleStore.fetchPeopleData()

    expect(getAll).toHaveBeenCalled()
  })

  it('should update data and its attributes', () => {
    const peopleStore = usePeopleStore()

    peopleStore.setPeopleData(mockData)

    expect(peopleStore.peopleData).toHaveLength(6)

    const name = 'Kanye West'
    const newVoteValues = {
      votes: {
        positive: 24,
        negative: 36
      }
    }

    peopleStore.updatePeople(name, newVoteValues)

    const peopleData = peopleStore.getPeopleData

    expect(peopleData[0].votes.positive).toBe(24)
  })
})
