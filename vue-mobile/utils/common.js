import types from 'src/utils/types'
import { i18n } from "src/boot/i18n";
const { t } = i18n.global
// import store from 'src/store'
// import { getApiHost } from 'src/api/helpers'
// import { fileFormats } from './formats'

export const parseContact = (data) => {
  return {    
    UUID: types.pString(data.UUID),
    
    // userId: types.pInt(data.IdUser),
    Storage: types.pString(data.Storage),
    
    ViewEmail: types.pString(data.ViewEmail),
    PrimaryEmail: types.pInt(data.PrimaryEmail),
    PrimaryPhone: types.pInt(data.PrimaryPhone),
    PrimaryAddress: types.pInt(data.PrimaryAddress),
    FullName: types.pString(data.FullName),
    FirstName: types.pString(data.FirstName),
    LastName: types.pString(data.LastName),
    NickName: types.pString(data.NickName),
    Skype: types.pString(data.Skype),
    Facebook: types.pString(data.Facebook),
    PersonalEmail: types.pString(data.PersonalEmail),
    PersonalAddress: types.pString(data.PersonalAddress),
    PersonalCity: types.pString(data.PersonalCity),
    PersonalState: types.pString(data.PersonalState),
    PersonalZip: types.pString(data.PersonalZip),
    PersonalCountry: types.pString(data.PersonalCountry),
    PersonalWeb: types.pString(data.PersonalWeb),
    PersonalFax: types.pString(data.PersonalFax),
    PersonalPhone: types.pString(data.PersonalPhone),
    PersonalMobile: types.pString(data.PersonalMobile),

    BusinessEmail: types.pString(data.BusinessEmail),
    BusinessCompany: types.pString(data.BusinessCompany),
    BusinessJobTitle: types.pString(data.BusinessJobTitle),
    BusinessDepartment: types.pString(data.BusinessDepartment),
    BusinessOffice: types.pString(data.BusinessOffice),
    BusinessAddress: types.pString(data.BusinessAddress),
    BusinessCity: types.pString(data.BusinessCity),
    BusinessState: types.pString(data.BusinessState),
    BusinessZip: types.pString(data.BusinessZip),
    BusinessCountry: types.pString(data.BusinessCountry),
    BusinessFax: types.pString(data.BusinessFax),
    BusinessPhone: types.pString(data.BusinessPhone),
    BusinessWeb: types.pString(data.BusinessWeb),

    OtherEmail: types.pString(data.OtherEmail),
    Notes: types.pString(data.Notes),
    BirthDay: types.pInt(data.BirthDay),
    BirthMonth: types.pInt(data.BirthMonth),
    BirthYear: types.pInt(data.BirthYear),

    PublicPgpKey: types.pString(data.PublicPgpKey),
    PgpEncryptMessages: types.pBool(data.PgpEncryptMessages),
    PgpSignMessages: types.pBool(data.PgpSignMessages),
    
    GroupUUIDs: types.pArray(data.GroupUUIDs),
  }
}

export const parseContactListItem = (data) => {
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

export const parseGroup = (item) => {
  return {
    UUID: types.pString(item.UUID),
    name: types.pString(item.Name),
    isOrganization: types.pBool(item.IsOrganization),

    city: types.pString(item.City),
    company: types.pString(item.Company),
    country: types.pString(item.Country),
    email: types.pString(item.Email),
    fax: types.pString(item.Fax),
    phone: types.pString(item.Phone),
    state: types.pString(item.State),
    street: types.pString(item.Street),
    web: types.pString(item.Web),
    zip: types.pString(item.Zip),

    // CreatedAt
    // Events
    // Id
    // IdUser
    // Properties
    // UpdatedAt
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

export const getParsedGroups = (items) => {
  const groups = []
  items.forEach((item) => {
    groups.push(parseGroup(item))
  })
  return groups
}

export const getParseContacts = (items) => {
  const contacts = []
  items.forEach((item) => {
    contacts.push(parseContactListItem(item))
  })
  return contacts
}

// export const getFilteredItems = (items, key) => {
//   return typeof items !== 'array' ? [] : items.filter((item) => {
//     if (item[key]) {
//       return item
//     }
//   })
// }