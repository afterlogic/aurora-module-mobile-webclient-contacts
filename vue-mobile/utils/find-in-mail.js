import searchUtils from '../../../MailMobileWebclient/vue-mobile/utils/search'

export function getContactEmailsString(contact) {
  if (!contact) {
    return ''
  }

  const emails = [
    contact.ViewEmail,
    contact.PersonalEmail,
    contact.BusinessEmail,
    contact.OtherEmail,
  ].filter(Boolean)

  return [...new Set(emails)].join(',')
}

export function isFindInMailAvailable() {
  return searchUtils.isSearchAvailable()
}

export function findInMailByContact(contact, router) {
  const emails = getContactEmailsString(contact)
  if (!emails) {
    return false
  }

  return searchUtils.searchMessagesInInbox(`email:${emails}`, router)
}
