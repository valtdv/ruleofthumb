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
})
