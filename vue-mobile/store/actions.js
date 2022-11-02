import types from 'src/utils/types'
import contactsWebApi from '../contacts-web-api'

import { getParseAddressBook, getParsedGroups, getParseContacts } from '../utils/common'

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
    const groupsData = await contactsWebApi.getGroups()
    if (types.pArray(groupsData)) {
      const groups = getParsedGroups(groupsData);
      commit('setGroupList', groups)
    }
  },

  asyncGetContacts: async ({ commit, getters, dispatch }) => {
    dispatch('setLoadingStatus', true)
    const currentStorage = getters['currentStorage']
    const currentGroup = getters['currentGroup']
    const searchText = getters['searchText']
    const page = getters['contactsPage']
    const parameters = {
      Storage: currentStorage?.id ?? 'all',
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
    dispatch('setLoadingStatus', false)
  },

  clearContactList: ({ commit }) => {
    commit('setContactsList', [])
  },

  asyncGetContact: async ({ commit, dispatch }, parameters) => {
    if (parameters?.UUID) {
      dispatch('setLoadingStatus', true)
      const data = await contactsWebApi.getContact(parameters)
      commit('setCurrentContact', data)
      dispatch('setLoadingStatus', false)
    } else {
      commit('setCurrentContact', {})
    }
  },

  asyncGetContactsSuggestions: async ({}, parameters) => {
    return await contactsWebApi.getContactSuggestions(parameters)
  },

  asyncCreateContact: async ({}, params) => {
    // const newContact = getters['newContact']
    return await contactsWebApi.createContact(params)
  },

  asyncEditContact: async ({}, params) => {
    return await contactsWebApi.updateContact(params)
  },

  asyncCreateGroup: async ({}, params) => {
    return await contactsWebApi.createGroup(params)
  },

  asyncEditGroup: async ({}, params) => {
    return await contactsWebApi.updateGroup(params)
  },

  asyncDeleteGroup: async ({}, params) => {
    return await contactsWebApi.deleteGroup(params)
  },

  changeContactsPage: ({ commit }, page) => {
    commit('setContactsPage', page)
  },

  setCurrentStorage: ({ commit }, storage) => {
    commit('setCurrentGroup', null)
    commit('setCurrentStorage', storage)
    commit('setContactsPage', 1)
  },

  setCurrentGroup: ({ commit }, group) => {
    commit('setCurrentStorage', {})
    commit('setCurrentGroup', group)
    commit('setContactsPage', 1)
  },

  setLoadingStatus: ({ commit }, status) => {
    commit('setLoadingStatus', status)
  },

  changeCurrentHeader: ({ commit }, headerName) => {
    commit('setCurrentHeaderName', headerName)
  },

  changeSearchText: ({ commit }, text) => {
    commit('setSearchText', text)
    commit('setContactsPage', 1)
  },

  changeDialogComponent: ({ commit }, dialogComponent) => {
    commit('setDialogComponent', dialogComponent)
  },

  asyncDeleteContacts: async ({}, params) => {
    return await contactsWebApi.deleteContacts(params)
  },

  asyncShareContact: async ({}, params) => {
    return await contactsWebApi.shareContact(params)
  },

  asyncUnShareContact: async ({}, params) => {
    return await contactsWebApi.shareContact(params)
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

  removeGroupFromList: ({ commit }, group) => {
    commit('removeGroupFromList', group)
  },
}
