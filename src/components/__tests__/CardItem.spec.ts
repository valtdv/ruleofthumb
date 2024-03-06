import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import CardItem from '../CardItem.vue'

const mockData = {
  name: 'Kanye West',
  description:
    'Born in Atlanta and raised in Chicago, West was first known as a producer for Roc-A-Fella Records in the early 2000s, producing singles for several mainstream artists.',
  category: 'entertainment',
  picture: 'kanye.png',
  lastUpdated: '2020-03-10T23:08:57.892Z',
  votes: {
    positive: 23,
    negative: 36
  }
}

describe('CardItem Component', () => {
  it('should render properly and display prop data as well as gauge bar', () => {
    const wrapper = mount(CardItem, { props: { person: mockData, isListView: false } })

    expect(wrapper.findAll('[data-testid="card"]')).toHaveLength(1)

    expect(wrapper.find('[data-testid="name"]').text()).toEqual('Kanye West')

    expect(wrapper.find('[data-testid="positive-percentage"]').text()).toEqual('39%')
    expect(wrapper.find('[data-testid="negative-percentage"]').text()).toEqual('61%')
  })

  it('should render as list when specified', () => {
    const wrapper = mount(CardItem, { props: { person: mockData, isListView: true } })

    expect(wrapper.find('[data-testid="card"]').classes()).toHaveLength(2)
  })

  it('should let user vote once an option is selected and reflect result on gauge bar', async () => {
    const wrapper = mount(CardItem, { props: { person: mockData, isListView: false } })
    const voteBtn = wrapper.find('[data-testid="vote-btn"]')
    const upvote = wrapper.find('[data-testid="upvote"]')
    const form = wrapper.find('[data-testid="form"]')

    expect(voteBtn.attributes('disabled')).toBe('')

    await upvote.setValue(true)

    expect(voteBtn.attributes('disabled')).toBeUndefined()

    await form.trigger('submit.prevent')

    const downvote = wrapper.find('[data-testid="downvote"]')
    expect(downvote.exists()).toBe(false)

    const date = wrapper.find('[data-testid="date"]').find('span')
    expect(date.text()).toEqual('Thank you for your vote!')

    expect(wrapper.find('[data-testid="positive-percentage"]').text()).toEqual('40%')
  })
})
