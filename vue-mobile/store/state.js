export default function () {
  return {
    storageList: [],
    groupsList: [],
    contactsList: [],

    currentStorage: {},
    currentGroup: null,
    currentContact: {},

    searchText: '',
    contactsPage: 1,
    numberOfContacts: 0,

    currentHeader: null,
    isLoading: false,
    dialogComponent: ''
  }
}
