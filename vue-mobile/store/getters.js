import { getFilteredItems } from '../utils/common'

export default {
  //main data collections
  storageList: (state) => state.storageList,
  groupsList: (state) => state.groupsList,
  contactsList: (state) => state.contactsList,

  //currently selected items
  currentStorage: (state) => state.currentStorage,
  currentGroup: (state) => state.currentGroup,
  currentContact: (state) => state.currentContact,
  
  //list-related data
  loadingStatus: (state) => state.isLoading,
  numberOfContacts: (state) => state.numberOfContacts,
  searchText: (state) => state.searchText,
  getDefaultStorage: (state) => state.storageList.length ? state.storageList.find(item => item.default === true) : {},
  contactsPage: (state) => state.contactsPage,
  contactsPagesCount: (state) => Math.ceil(state.numberOfContacts / 20),
  
  currentHeader: (state) => state.currentHeader,
  
  dialogComponent: (state) => state.dialogComponent ? state.dialogComponent : { component: '' },
  newContact: (state) => state.newContact,
  newGroup: (state) => state.newGroup,
  
  selectedContacts: (state) => {
    const items = getFilteredItems(state.contactsList, 'isSelected')
    return items
  },
}
