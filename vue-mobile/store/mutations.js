export default {
  setStorageList: (state, storages) => { state.storageList = storages },
  setContactsList: (state, contactsList) => { state.contactsList = contactsList },
  setGroupList: (state, groupsList) => { state.groupsList = groupsList },

  setCurrentStorage: (state, storage) => { state.currentStorage = storage },
  setCurrentContact: (state, contact) => { state.currentContact = contact },
  setCurrentGroup: (state, group) => { state.currentGroup = group },

  setLoadingStatus: (state, status) => { state.isLoading = status },
  setCurrentHeaderName: (state, headerName) => { state.currentHeader = headerName },
  setSearchText: (state, text) => { state.searchText = text },
  setContactsPage: (state, page) => { state.contactsPage = page },
  setNumberOfContacts: (state, number) => { state.numberOfContacts = number },

  setDialogComponent: (state, dialogComponent) => { state.dialogComponent = dialogComponent },

  updateCurrentContact: (state, contact) => { state.currentContact = contact },
  
  //TODO update contact in list
  setSelectStatus: (state, contact) => { contact.isSelected = !contact.isSelected },

  resetSelectedItems: (state) => {
    state.contactsList.forEach((contact) => {
      contact.isSelected = false
    })
  },

  updateGroup: (state, group) => {
    const itemIndex = state.groupsList.findIndex(
      (item) => item.UUID === group.UUID
    )
    if (itemIndex !== -1) {
      state.groupsList.splice(itemIndex, 1, group)
    }
  },

  removeContactsFromList: (state, contacts) => {
    contacts.forEach((contact) => {
      const itemIndex = state.contactsList.findIndex(
        (item) => item.UUID === contact.UUID
      )
      if (itemIndex !== -1) {
        state.contactsList.splice(itemIndex, 1)
      }
    })
  },

  removeGroupFromList: (state, group) => {
    if (group) {
      const itemIndex = state.groupsList.findIndex(
        (item) => item.UUID === group.UUID
      )
      if (itemIndex !== -1) {
        state.groupsList.splice(itemIndex, 1)
      }
    }
  },
}
