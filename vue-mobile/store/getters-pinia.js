export default {
  getDefaultStorage: (state) =>
    state.storageList.length ? state.storageList.find((item) => item.default === true) : {},
  contactsPagesCount: (state) => Math.ceil(state.numberOfContacts / 20),
  selectedContacts: (state) => state.contactsList.filter((item) => item.isSelected),
}
