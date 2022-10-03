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

  setNewContact: (state, contact) => { state.newContact = contact },
  setNewGroup: (state, group) => { state.newGroup = group },

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
}
