export default {
  setContactsList: (state, contactsList) => { state.contactsList = contactsList },
  setStorageList: (state, storages) => { state.storageList = storages },
  setGroupList: (state, groupsList) => { state.groupsList = groupsList },

  setCurrentContact: (state, contact) => { state.currentContact = contact },
  setCurrentStorage: (state, storage) => { state.currentStorage = storage },
  setCurrentGroup: (state, group) => { state.currentGroup = group },

  setLoadingStatus: (state, status) => { state.isLoading = status },
  setCurrentHeaderName: (state, headerName) => { state.currentHeader = headerName },
  setSearchText: (state, text) => { state.searchText = text },
  setContactsPage: (state, page) => { state.contactsPage = page },
  setNumberOfContacts: (state, number) => { state.numberOfContacts = number },
  
  setDialogComponent: (state, dialogComponent) => { state.dialogComponent = dialogComponent },

  setSelectStatus: (state, contact) => { contact.isSelected = !contact.isSelected },

  resetSelectedItems: (state, items) => {
    if (items.length) {
      items.forEach((item) => {
        item.isSelected = false
      })
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
