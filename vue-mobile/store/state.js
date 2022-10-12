export default function () {
  return {
    contactsList: [],
    storageList: [],
    groupsList: [],
    currentContact: {},
    currentStorage: {},
    currentGroup: {},

    searchText: '',
    contactsPage: 1,
    numberOfContacts: 0,

    currentHeader: null,
    isLoading: false,
    newContact: {},
    newGroup: {},
    dialogComponent: ''
  }
}
