import types from 'src/utils/types'
import { i18n } from "src/boot/i18n";
const { t } = i18n.global
// import store from 'src/store'
// import { getApiHost } from 'src/api/helpers'
// import { fileFormats } from './formats'

const PGP_KEY_PROP = 'OpenPgpWebclient::PgpKey'
const PGP_ENCRYPT_PROP = 'OpenPgpWebclient::PgpEncryptMessages'
const PGP_SIGN_PROP = 'OpenPgpWebclient::PgpSignMessages'

const getPgpFlagValue = (data, flagName, storage, userId) => {
  if (storage === 'team' && userId) {
    return types.pBool(data[`${flagName}_${userId}`])
  }

  return types.pBool(data[flagName])
}

const getPublicPgpKey = (data) => {
  return types.pString(data.PublicPgpKey || data[PGP_KEY_PROP])
}

export const parseContact = (data) => {
  const storage = types.pString(data.Storage)
  const userId = types.pInt(data.IdUser)
  const publicPgpKey = getPublicPgpKey(data)

  return {    
    UUID: types.pString(data.UUID),
    
    IdUser: userId,
    Storage: storage,
    
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

    PublicPgpKey: publicPgpKey,
    [PGP_KEY_PROP]: publicPgpKey,
    PgpEncryptMessages: getPgpFlagValue(data, PGP_ENCRYPT_PROP, storage, userId)
      || types.pBool(data.PgpEncryptMessages),
    PgpSignMessages: getPgpFlagValue(data, PGP_SIGN_PROP, storage, userId)
      || types.pBool(data.PgpSignMessages),
    
    GroupUUIDs: types.pArray(data.GroupUUIDs),
  }
}

const hasContactPgpKey = (data) => {
  const storage = types.pString(data.Storage)
  const userId = types.pInt(data.IdUser)

  return types.pBool(data.HasPgpPublicKey)
    || !!getPublicPgpKey(data)
    || types.pBool(data.PgpEncryptMessages)
    || types.pBool(data.PgpSignMessages)
    || getPgpFlagValue(data, PGP_ENCRYPT_PROP, storage, userId)
    || getPgpFlagValue(data, PGP_SIGN_PROP, storage, userId)
}

export const contactToListItem = (contact) => {
  const storage = types.pString(contact.Storage)

  return parseContactListItem({
    UUID: contact.UUID,
    FullName: contact.FullName,
    IdUser: contact.IdUser,
    HasPgpPublicKey: hasContactPgpKey(contact),
    IsTeam: types.pBool(contact.IsTeam) || storage === 'team',
    Storage: storage,
    ViewEmail: contact.ViewEmail,
    PgpEncryptMessages: contact.PgpEncryptMessages,
    PgpSignMessages: contact.PgpSignMessages,
    PublicPgpKey: contact.PublicPgpKey,
    [PGP_KEY_PROP]: contact[PGP_KEY_PROP],
  })
}

export const parseContactListItem = (data) => {
  const storage = types.pString(data.Storage)

  return {
    loading: false,
    isSelected: false,
    
    UUID: types.pString(data.UUID),
    fullName: types.pString(data.FullName),
    userId: types.pInt(data.IdUser),
    hasPgpPublicKey: hasContactPgpKey(data),
    isTeam: types.pBool(data.IsTeam) || storage === 'team',
    storage,
    email: types.pString(data?.ViewEmail),
  }
}

export const enrichContactsWithPgpKeys = async (contacts, getPublicKeysByContactUUIDs) => {
  if (!Array.isArray(contacts) || !contacts.length || !getPublicKeysByContactUUIDs) {
    return contacts
  }

  const uuidsToCheck = contacts
    .filter(contact => !contact.hasPgpPublicKey)
    .map(contact => contact.UUID)

  if (!uuidsToCheck.length) {
    return contacts
  }

  const result = await getPublicKeysByContactUUIDs(uuidsToCheck)
  if (!Array.isArray(result)) {
    return contacts
  }

  const uuidsWithKeys = {}
  result.forEach(item => {
    if (item.UUID && item.PublicPgpKey) {
      uuidsWithKeys[item.UUID] = true
    }
  })

  contacts.forEach(contact => {
    if (uuidsWithKeys[contact.UUID]) {
      contact.hasPgpPublicKey = true
    }
  })

  return contacts
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

export const getParsedAddressBook = (items) => {
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

export const getParsedContacts = (items) => {
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