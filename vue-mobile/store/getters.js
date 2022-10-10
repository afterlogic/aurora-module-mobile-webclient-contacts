import { getFilteredItems } from '../utils/common'

export default {
  contactsList: (state) => state.contactsList,
  storageList: (state) => state.storageList,
  groupsList: (state) => state.groupsList,
  currentContact: (state) => state.currentContact,
  currentStorage: (state) => state.currentStorage,
  currentGroup: (state) => state.currentGroup,
  loadingStatus: (state) => state.isLoading,
  currentHeader: (state) => state.currentHeader,
  searchText: (state) => state.searchText,
  contactsPage: (state) => state.contactsPage,
  contactsPagesCount: (state) => Math.ceil(state.contactsCount / 20),
  dialogComponent: (state) => state.dialogComponent ? state.dialogComponent : { component: '' },
  newContact: (state) => state.newContact,
  newGroup: (state) => state.newGroup,
  
  selectedContacts: (state) => {
    const items = getFilteredItems(state.contactsList, 'isSelected')
    return items
  },
}
