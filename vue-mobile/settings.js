
import typesUtils from 'src/utils/types'

class ContactsSettings {
  constructor (appData) {
    const contactsData = typesUtils.pObject(appData.Contacts)
    console.log('contactsData', contactsData)
  }
}

let settings = null

export default {
  init (appData) {
    settings = new ContactsSettings(appData)
  },
}
