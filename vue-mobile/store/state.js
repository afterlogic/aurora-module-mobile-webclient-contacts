export default function () {
  return {
    storageList: [],
    groupsList: [],
    contactsList: [],

    currentStorage: {},
    currentGroup: {},
    currentContact: {},

    searchText: '',
    contactsPage: 1,
    numberOfContacts: 0,

    currentHeader: null,
    isLoading: false,
    newContact: {},
    // newGroup: {},
    dialogComponent: ''
  }
}
