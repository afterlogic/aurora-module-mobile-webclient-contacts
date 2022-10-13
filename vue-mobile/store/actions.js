import types from 'src/utils/types'
import contactsWebApi from '../contacts-web-api'

import { getParseAddressBook, getParseContacts } from '../utils/common'

export default {
  asyncGetStorages: async ({ commit, getters }) => {
    const storagesData = await contactsWebApi.getStorages()
    if (types.pArray(storagesData) && storagesData.length > 0) {
      storagesData[0].Default = true
      if (storagesData.length > 2) {
        storagesData.unshift({Id: 'all', CTag: 0, Display: true, Order: 0})
      }
      const storages = getParseAddressBook(storagesData)
      commit('setStorageList', storages)
    }
  },

  asyncGetGroups: async ({ commit }) => {
    const groups = await contactsWebApi.getGroups()
    if (types.pArray(groups)) {
      commit('setGroupList', groups)
    }
  },

  asyncGetContacts: async ({ commit, getters, dispatch }) => {
    dispatch('changeLoadingStatus', true)
    const currentStorage = getters['currentStorage']
    const currentGroup = getters['currentGroup']
    const searchText = getters['searchText']
    const page = getters['contactsPage']
    const parameters = {
      Storage: currentStorage.id ?? 'all',
      GroupUUID: currentGroup?.UUID,
      Search: searchText,
      Offset: ((page || 1) - 1) * 20,
      Limit: 20
    }
    const data = await contactsWebApi.getContacts(parameters)
    if (types.pArray(data?.List)) {
      let contacts = getParseContacts(data.List)
      if (page > 1) {
        contacts = getters['contactsList'].concat(contacts)
      }
      commit('setContactsList', contacts)
      commit('setNumberOfContacts', parseInt(data.ContactCount, 10))
    } else {
      commit('setContactsList', [])
      commit('setNumberOfContacts', 0)
    }
    dispatch('changeLoadingStatus', false)
  },

  asyncGetContact: async ({ commit, dispatch }, parameters) => {
    dispatch('changeLoadingStatus', true)
    const data = await contactsWebApi.getContact(parameters)
    // console.log(data)
    commit('setCurrentContact', data)
    dispatch('changeLoadingStatus', false)
  },

  asyncGetContactsSuggestions: async ({}, parameters) => {
    return await contactsWebApi.getContactSuggestions(parameters)
  },

  asyncCreateContact: async ({ getters, dispatch }) => {
    const newContact = getters['newContact']
    await contactsWebApi.createContact({ Contact: newContact })
  },

  asyncCreateGroup: async ({ getters, dispatch }) => {
    const newGroup = getters['newGroup']
    await contactsWebApi.createGroup({ Group: newGroup })
  },

  changeContactsPage: ({ commit }, page) => {
    commit('setContactsPage', page)
  },

  changeCurrentStorage: ({ commit }, storage) => {
    commit('setCurrentGroup', '')
    commit('setCurrentStorage', storage)
    commit('setContactsPage', 1)
  },

  changeCurrentGroup: ({ commit }, group) => {
    commit('setCurrentStorage', {})
    commit('setCurrentGroup', group)
    commit('setContactsPage', 1)
  },

  changeLoadingStatus: ({ commit }, status) => {
    commit('setLoadingStatus', status)
  },

  changeCurrentHeader: ({ commit }, headerName) => {
    commit('setCurrentHeaderName', headerName)
  },

  changeSearchText: ({ commit }, text) => {
    commit('setSearchText', text)
    commit('setContactsPage', 1)
  },

  changeNewContact: ({ commit }, contact) => {
    commit('setNewContact', contact)
  },

  changeNewGroup: ({ commit }, group) => {
    commit('setNewGroup', group)
  },

  changeDialogComponent: ({ commit }, dialogComponent) => {
    commit('setDialogComponent', dialogComponent)
  },


  /* TODO Why these methods are here? They are not related to Vuex */
  asyncDeleteContacts: async ({}, params) => {
    return await contactsWebApi.deleteContacts(params)
  },

  asyncShareContact: async ({}, params) => {
    return await contactsWebApi.shareContact(params)
  },

  asyncUnShareContact: async ({}, params) => {
    return await contactsWebApi.shareContact(params)
  },

  asyncEditContact: async ({}, params) => {
    return await contactsWebApi.updateContact(params)
  },

  asyncRemoveFromGroup: async ({}, params) => {
    return await contactsWebApi.removeFromGroup(params)
  },

  changeSelectStatus: ({ commit }, contact) => {
    commit('setSelectStatus', contact)
  },

  resetSelectedItems: ({ commit }, { items }) => {
    commit('resetSelectedItems', items)
  },

  removeContactsFromList: ({ commit }, contacts) => {
    commit('removeContactsFromList', contacts)
  },
}
