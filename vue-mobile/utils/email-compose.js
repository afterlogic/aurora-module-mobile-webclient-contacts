import addressUtils from 'src/utils/address'

import composeUtils from '../../../MailMobileWebclient/vue-mobile/utils/compose'

export function getFullEmailFromContactListItem(contact) {
  if (!contact?.email) {
    return ''
  }

  return addressUtils.getFullEmail(contact.fullName || '', contact.email)
}

export function getFullEmailFromContactView(contact, email) {
  if (!email) {
    return ''
  }

  return addressUtils.getFullEmail(contact?.FullName || '', email)
}

export function getPrimaryEmailFromContactView(contact) {
  if (!contact) {
    return ''
  }

  let email = ''
  switch (contact.PrimaryEmail) {
    case 0:
      email = contact.PersonalEmail
      break
    case 1:
      email = contact.BusinessEmail
      break
    case 2:
      email = contact.OtherEmail
      break
  }

  return (
    email ||
    contact.ViewEmail ||
    contact.PersonalEmail ||
    contact.BusinessEmail ||
    contact.OtherEmail ||
    ''
  )
}

export function composeToSelectedContacts(contacts, router) {
  const addresses = contacts
    .map(getFullEmailFromContactListItem)
    .filter(Boolean)
    .join(', ')

  if (!addresses) {
    return false
  }

  return composeUtils.composeMessageToAddresses(addresses, router)
}

export function composeToContactEmail(contact, email, router) {
  const addresses = getFullEmailFromContactView(contact, email)

  if (!addresses) {
    return false
  }

  return composeUtils.composeMessageToAddresses(addresses, router)
}

export function composeToContact(contact, router) {
  return composeToContactEmail(contact, getPrimaryEmailFromContactView(contact), router)
}

export function isComposeAvailable() {
  return composeUtils.isComposeAvailable()
}
