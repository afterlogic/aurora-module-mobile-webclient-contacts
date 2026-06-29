import { CONTACTS_LOAD_CHUNK_SIZE } from './constants'

export default {
  getDefaultStorage: (state) =>
    state.storageList?.length ? state.storageList.find((item) => item.default === true) : {},

  contactsPagesCount: (state) => Math.ceil((state.numberOfContacts || 0) / CONTACTS_LOAD_CHUNK_SIZE),

  isContactsListEndReached: (state) => {
    if (state.contactsList.length === 0) {
      return true
    }

    if (state.contactsList.length >= state.numberOfContacts) {
      return true
    }

    return state.contactsListLastPageCount < CONTACTS_LOAD_CHUNK_SIZE
  },

  selectedContacts: (state) => (state.contactsList || []).filter((item) => item.isSelected),
}
