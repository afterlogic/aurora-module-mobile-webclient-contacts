import types from 'src/utils/types'
import contactsWebApi from '../contacts-web-api'

export default {
  asyncGetStorages: async ({ commit }) => {
    const storages = await contactsWebApi.getStorages()
    if (types.pArray(storages)) {
      storages.unshift({Id: 'all'})
      commit('SET_STORAGE_LIST', storages)
      commit('SET_CURRENT_STORAGE', storages.length ? storages[0] : {})
    }
  },
  asyncGetGroups: async ({ commit }) => {
    const groups = await contactsWebApi.getGroups()
    if (types.pArray(groups)) {
      commit('SET_GROUPS_LIST', groups)
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
      commit('SET_CONTACTS_LIST', data.List)
    }
    dispatch('changeLoadingStatus', false)
  },
  asyncGetContact: async ({ commit, dispatch }, parameters) => {
    dispatch('changeLoadingStatus', true)
    const data = await contactsWebApi.getContact(parameters)
    commit('SET_CURRENT_CONTACT', data)
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
    commit('SET_CURRENT_GROUP', '')
    commit('SET_CURRENT_STORAGE', storage)
  },
  changeCurrentGroup: ({ commit }, group) => {
    commit('SET_CURRENT_STORAGE', {})
    commit('SET_CURRENT_GROUP', group)
  },
  changeLoadingStatus: ({ commit }, status) => {
    commit('SET_LOADING_STATUS', status)
  },
  changeCurrentHeader: ({ commit }, headerName) => {
    commit('SET_CURRENT_HEADER_NAME', headerName)
  },
  changeSearchText: ({ commit }, text) => {
    commit('SET_SEARCH_TEXT', text)
  },
  changeNewContact: ({ commit }, contact) => {
    commit('SET_NEW_CONTACT', contact)
  },
  changeNewGroup: ({ commit }, group) => {
    commit('SET_NEW_GROUP', group)
  },
  changeDialogComponent: ({ commit }, dialogComponent) => {
    commit('setDialogComponent', dialogComponent)
  },
}
