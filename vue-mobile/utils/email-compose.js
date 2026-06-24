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

export function isComposeAvailable() {
  return composeUtils.isComposeAvailable()
}
