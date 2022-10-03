import types from 'src/utils/types'
import contactsWebApi from '../contacts-web-api'

import { getParseContacts } from '../utils/common'

export default {
  asyncGetStorages: async ({ commit }) => {
    const storages = await contactsWebApi.getStorages()
    if (types.pArray(storages)) {
      if (storages.length > 2) {
        storages.unshift({Id: 'all'})
      }
      commit('setStorageList', storages)
      commit('setCurrentStorage', storages.length ? storages[0] : {})
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
    const parameters = {
      Storage: currentStorage?.Id ?? 'all',
      GroupUUID: currentGroup?.UUID,
      Search: searchText
    }
    const data = await contactsWebApi.getContacts(parameters)
    if (types.pArray(data?.List)) {
      const contacts = getParseContacts(data.List)
      commit('setContactsList', contacts)
    }
    dispatch('changeLoadingStatus', false)
  },

  asyncGetContact: async ({ commit, dispatch }, parameters) => {
    dispatch('changeLoadingStatus', true)
    const data = await contactsWebApi.getContact(parameters)
    commit('setCurrentContact', data)
    dispatch('changeLoadingStatus', false)
  },

  asyncGetContactsSuggestions: async ({}, parameters) => {
    return await contactsWebApi.getContactSuggestions(parameters)
  },

  asyncCreateContact: async ({ getters, dispatch }) => {
    const newContact = getters['newContact']

    await contactsWebApi.createContact({ Contact: newContact })
    dispatch('asyncGetContacts')
  },

  asyncCreateGroup: async ({ getters, dispatch }) => {
    const newGroup = getters['newGroup']

    await contactsWebApi.createGroup({ Group: newGroup })
    dispatch('asyncGetGroups')
  },

  changeCurrentStorage: ({ commit }, storage) => {
    commit('setCurrentGroup', '')
    commit('setCurrentStorage', storage)
  },

  changeCurrentGroup: ({ commit }, group) => {
    commit('setCurrentStorage', {})
    commit('setCurrentGroup', group)
  },

  changeLoadingStatus: ({ commit }, status) => {
    commit('setLoadingStatus', status)
  },

  changeCurrentHeader: ({ commit }, headerName) => {
    commit('setCurrentHeaderName', headerName)
  },

  changeSearchText: ({ commit }, text) => {
    commit('setSearchText', text)
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

  asyncDeleteContacts: async ({}, params) => {
    return await contactsWebApi.deleteContacts(params)
  },

  removeContactsFromList: ({ commit }, contacts) => {
    commit('removeContactsFromList', contacts)
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

  changeSelectStatus: ({ commit }, contact) => {
    commit('setSelectStatus', contact)
  },

  resetSelectedItems: ({ commit }, { items }) => {
    commit('resetSelectedItems', items)
  },
}
