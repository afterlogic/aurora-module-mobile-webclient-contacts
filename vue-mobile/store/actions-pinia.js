import types from 'src/utils/types'
import contactsWebApi from '../contacts-web-api'

import { getParseAddressBook, getParsedGroups, getParseContacts, parseGroup } from '../utils/common'

export default {
  async asyncGetStorages() {
    const storagesData = await contactsWebApi.getStorages()
    if (types.pArray(storagesData) && storagesData.length > 0) {
      storagesData[0].Default = true
      if (storagesData.length > 2) {
        storagesData.unshift({ Id: 'all', CTag: 0, Display: true, Order: 0 })
      }
      const storages = getParseAddressBook(storagesData)
      this.storageList = storages
    }
  },

  async asyncGetGroups() {
    const groupsData = await contactsWebApi.getGroups()
    if (types.pArray(groupsData)) {
      const groups = getParsedGroups(groupsData)
      this.groupsList = groups
    }
  },

  async asyncGetContacts() {
    this.isLoading = true
    const currentStorage = this.currentStorage
    const currentGroup = this.currentGroup
    const searchText = this.searchText
    const page = this.contactsPage
    const itemsPerPage = 20
    const parameters = {
      Storage: currentStorage?.id ?? 'all',
      GroupUUID: currentGroup?.UUID,
      Search: searchText,
      Offset: ((page || 1) - 1) * itemsPerPage,
      Limit: itemsPerPage,
    }

    const data = await contactsWebApi.getContacts(parameters)
    if (types.pArray(data?.List)) {
      let contacts = getParseContacts(data.List)
      if (page > 1) {
        contacts = this.contactsList.concat(contacts)
      }
      this.contactsList = contacts
      this.numberOfContacts = parseInt(data.ContactCount, 10)
    } else {
      this.contactsList = []
      this.numberOfContacts = 0
    }
    this.isLoading = false
  },

  clearContactList() {
    this.contactsList = []
  },

  async asyncGetContact(parameters) {
    if (parameters?.UUID) {
      this.isLoading = true

      const data = await contactsWebApi.getContact(parameters)
      this.currentContact = data
      this.isLoading = false
    } else {
      this.currentContact = {}
    }
  },

  asyncGetContactsSuggestions: async ({}, parameters) => {
    return await contactsWebApi.getContactSuggestions(parameters)
  },

  async asyncCreateContact(params) {
    return await contactsWebApi.createContact(params)
  },

  async asyncEditContact(params) {
    return await contactsWebApi.updateContact(params)
  },

  async asyncCreateGroup(params) {
    return await contactsWebApi.createGroup(params)
  },

  async asyncEditGroup(params) {
    return await contactsWebApi.updateGroup(params)
  },

  async asyncDeleteGroup(params) {
    return await contactsWebApi.deleteGroup(params)
  },

  changeContactsPage(page) {
    this.contactsPage = page
  },

  setCurrentStorage(storage) {
    this.currentGroup = null
    this.currentStorage = storage
    this.contactsPage = 1
  },

  setCurrentGroup(group) {
    this.currentStorage = {}
    this.currentGroup = group
    this.contactsPage = 1
  },

  setLoadingStatus(status) {
    this.isLoading = status
  },

  changeCurrentHeader(headerName) {
    this.currentHeader = headerName
  },

  changeSearchText(text) {
    this.searchText = text
    this.contactsPage = 1
  },

  changeDialogComponent(dialogComponent) {
    this.dialogComponent = dialogComponent
  },

  async asyncDeleteContacts(params) {
    return await contactsWebApi.deleteContacts(params)
  },

  async asyncShareContact(params) {
    return await contactsWebApi.shareContact(params)
  },

  async asyncUnShareContact(params) {
    return await contactsWebApi.shareContact(params)
  },

  async asyncRemoveFromGroup(params) {
    return await contactsWebApi.removeFromGroup(params)
  },

  setCurrentContact(contact) {
    this.currentContact = contact
  },

  updateGroup(group) {
    const parsedGroup = parseGroup(group)

    const itemIndex = this.groupsList.findIndex((item) => item.UUID === group.UUID)
    if (itemIndex !== -1) {
      this.groupsList.splice(itemIndex, 1, group)
    }

    if (this.currentGroup && parsedGroup.UUID === this.currentGroup.UUID) {
      this.currentGroup = parsedGroup
    }
  },

  resetSelectedItems() {
    this.contactsList.forEach((contact) => {
      contact.isSelected = false
    })
  },

  removeContactsFromList(contacts) {
    contacts.forEach((contact) => {
      const itemIndex = this.contactsList.findIndex((item) => item.UUID === contact.UUID)
      if (itemIndex !== -1) {
        this.contactsList.splice(itemIndex, 1)
      }
    })
  },

  removeGroupFromList(group) {
    if (group) {
      const itemIndex = this.groupsList.findIndex((item) => item.UUID === group.UUID)
      if (itemIndex !== -1) {
        this.groupsList.splice(itemIndex, 1)
      }
    }
  },
}
