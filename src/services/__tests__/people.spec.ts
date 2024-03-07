import { describe, it, expect, beforeEach, vi } from 'vitest'
import { PeopleService } from '@/services/people.service'
import createFetchMock from 'vitest-fetch-mock'
import { mockData } from './__mocks__/data'

const fetchMocker = createFetchMock(vi)

describe('People service', () => {
  beforeEach(() => {
    fetchMocker.enableMocks()
  })

  it('should return the people array empty', async () => {
    fetchMocker.mockResponseOnce(JSON.stringify([]))
    await PeopleService.getAll().then((res) => {
      expect(res).toEqual([])
    })
  })

  it('should return the people array with data', async () => {
    fetchMocker.mockResponseOnce(JSON.stringify(mockData))
    await PeopleService.getAll().then((res) => {
      expect(res).toEqual(mockData)
    })
  })

  it('should update data', async () => {
    const mockAnswer = {
      name: 'Kanye West',
      description:
        'Born in Atlanta and raised in Chicago, West was first known as a producer for Roc-A-Fella Records in the early 2000s, producing singles for several mainstream artists.',
      category: 'entertainment',
      picture: 'kanye.png',
      lastUpdated: '2020-03-10T23:08:57.892Z',
      votes: {
        positive: 24,
        negative: 36
      }
    }

    const newVotes = {
      votes: {
        positive: 24,
        negative: 36
      }
    }

    fetchMocker.mockResponseOnce(JSON.stringify(mockAnswer))
    await PeopleService.updateData("1", newVotes).then(((res) =>
      expect(res).toEqual(mockAnswer)
    ))
  })
})
