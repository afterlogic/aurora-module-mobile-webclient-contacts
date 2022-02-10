// import types from 'src/utils/types'

class ContactsSettings {
  constructor (appData) {
    // const contactsData = types.pObject(appData.Contacts)
  }
}

let settings = null

export default {
  init (appData) {
    settings = new ContactsSettings(appData)
  },
}
