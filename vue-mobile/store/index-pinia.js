import { defineStore } from 'pinia'

import state from './state'
import actionsPinia from './actions-pinia'
import gettersPinia from './getters-pinia'

export const useContactsStore = defineStore('ContactsStore', {
  state: () => (state()),
  actions: actionsPinia,
  getters: gettersPinia,
})
