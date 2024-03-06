import { defineStore } from 'pinia'
import type { Person } from '@/models/interfaces/person.interface'
import { PeopleService } from '@/services/people.service'

export const usePeopleStore = defineStore('people', {
  state: () => ({
    peopleData: [] as Person[]
  }),
  getters: {
    getPeopleData():Person[] {
      return this.peopleData
    }
  },
  actions: {
    setPeopleData(data: Person[]) {
      this.peopleData = data
    },
    fetchPeopleData() {
      PeopleService.getAll().then((resp: Person[]) => {        
        this.setPeopleData(resp)
      });
    },
    updatePeople(name: string, attrs: Object) {
      const newPeopleData = this.peopleData.map((person: Person) => {
        if (person.name === name) {
          person = { ...person, ...attrs }
        }
        return person
      })

      this.setPeopleData(newPeopleData)
    }
  }
})
