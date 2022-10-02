export default {
  SET_CONTACTS_LIST: (state, contactsList) => (state.contactsList = contactsList),
  SET_STORAGE_LIST: (state, storages) => (state.storageList = storages),
  SET_GROUPS_LIST: (state, groupsList) => (state.groupsList = groupsList),
  SET_CURRENT_CONTACT: (state, contact) =>
      (state.currentContact = contact),
  SET_CURRENT_STORAGE: (state, storage) =>
      (state.currentStorage = storage),
  SET_CURRENT_GROUP: (state, group) =>
      (state.currentGroup = group),
  SET_LOADING_STATUS: (state, status) => (state.isLoading = status),
  SET_CURRENT_HEADER_NAME: (state, headerName) =>
      (state.currentHeader = headerName),
  SET_SEARCH_TEXT: (state, text) => (state.searchText = text),
  REMOVE_CONTACT: (state, contact) => {
    console.log(contact, 'REMOVE_CONTACT')
  },
  SET_DIALOG_COMPONENT: (state, dialogComponent) =>
      (state.dialogComponent = dialogComponent),
  SET_NEW_CONTACT: (state, contact) => (state.newContact = contact),
  SET_NEW_GROUP: (state, group) => (state.newGroup = group),
  setDialogComponent: (state, dialogComponent) =>
      (state.dialogComponent = dialogComponent),
  removeContact: (state, contact) => {
    const contactsList = state.contactsList
    const index = contactsList.findIndex((currentContact) => contact.UUID === currentContact.UUID)
    if (index !== -1) {
      contactsList.splice(index, 1)
    }
  },
  setSelectStatus: (state, contact) => (contact.isSelected = !contact.isSelected),
  resetSelectedItems: (state, items) => {
    if (items.length) {
      items.forEach((item) => {
        item.isSelected = false
      })
    }
  },
}
