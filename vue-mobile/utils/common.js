import types from 'src/utils/types'
import { i18n } from "src/boot/i18n";
const { t } = i18n.global
// import store from 'src/store'
// import { getApiHost } from 'src/api/helpers'

// import { fileFormats } from './formats'

const parseContact = (data) => {
  return {
    loading: false,
    isSelected: false,
    
    UUID: types.pString(data.UUID),
    fullName: types.pString(data.FullName),
    userId: types.pInt(data.IdUser),
    hasPgpKey: types.pBool(data.HasPgpPublicKey),
    storage: types.pString(data.Storage),
    email: types.pString(data?.ViewEmail),
  }
}

const parseAddressBook = (item) => {
  return {
    // isSelected: false,
    id: types.pString(item.Id),
    ctag: types.pInt(item.CTag),
    display: types.pBool(item.Display),
    order: types.pInt(item.Order),

    // default: item.Default ? types.pBool(item.Default) : false,
    default: types.pBool(item.Default),
    icon: item.Id[0].toUpperCase() + item.Id.slice(1),
    name: item.DisplayName ? item.DisplayName : t(`CONTACTSWEBCLIENT.LABEL_STORAGE_${item.Id.toUpperCase()}`)
  }
}

export const getParseAddressBook = (items) => {
  const books = []
  items.forEach((item) => {
    books.push(parseAddressBook(item))
  })
  return books
}

export const getParseContacts = (items) => {
  const contacts = []
  items.forEach((item) => {
    contacts.push(parseContact(item))
  })
  return contacts
}

export const getFilteredItems = (items, key) => {
  return items.filter((item) => {
    if (item[key]) {
      return item
    }
  })
}