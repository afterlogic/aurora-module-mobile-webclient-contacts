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

  // removeContact: (state, contact) => {
  //   const contactsList = state.contactsList
  //   const index = contactsList.findIndex((currentContact) => contact.UUID === currentContact.UUID)
  //   if (index !== -1) {
  //     contactsList.splice(index, 1)
  //   }
  // },
}
