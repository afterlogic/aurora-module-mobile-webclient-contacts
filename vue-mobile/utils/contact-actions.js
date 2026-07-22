import { useContactsStore } from '../store/index-pinia'
const contactsStore = useContactsStore()

import { isComposeAvailable } from '../../../MailMobileWebclient/vue-mobile/utils/compose'
import { composeToContact } from './email-compose'
import { isFindInMailAvailable, findInMailByContact, getContactEmailsString } from './find-in-mail'

const isShowAction = (action, contact, storage, group) => {
  let result = true
  if (contact) {
    switch (action) {
      case 'findInEmail':
        if (!isFindInMailAvailable() || !getContactEmailsString(contact)) {
          result = false
        }
        break
      case 'share':
        if (contact.Storage === 'team' || contact.Storage === 'shared') result = false
        break
      case 'unshare':
        if (contact.Storage !== 'shared') result = false
        break
      case 'send':
        if (!isComposeAvailable() || !getContactEmailsString(contact)) {
          result = false
        }
        break
      case 'emailTo':
        if (!isComposeAvailable()) {
          result = false
        } else if (Array.isArray(contact)) {
          result = contact.some((item) => item.email)
        }
        break
      case 'edit':
        if ( (contact.Storage === 'team' && !contact.ItsMe) || contact.Storage === 'shared') result = false
        break
      case 'delete':
        if (Array.isArray(contact)) {
          if ( storage?.Id === 'all') result = false
        } else {
          if ( contact.Storage === 'team') result = false
        }
        break
      case 'removeFromGroup':
        if ( !group?.UUID ) result = false
        break
      default:
        break
    }
  }
  return result
}

export const contactActions = {
  findInEmail: {
    method: (contact, router) => findInMailByContact(contact, router),
    name: 'findInEmail',
    component: '',
    displayName: 'Find in Mail',
    icon: 'FindInEmailIcon',
    isShowAction: isShowAction,
  },
  share: {
    method: async (contact) => { return await contactsStore.asyncShareContact({ UUIDs: [contact.UUID] }) },
    name: 'share',
    component: '',
    displayName: 'Share',
    icon: 'SharingIcon',
    isShowAction: isShowAction,
  },
  unshare: {
    method: async (contact) => { return await contactsStore.asyncUnShareContact({ UUIDs: [contact.UUID] }) },
    name: 'unshare',
    component: '',
    displayName: 'Unshare',
    icon: 'SharingIcon',
    isShowAction: isShowAction,
  },
  send: {
    method: (contact, router) => composeToContact(contact, router),
    name: 'send',
    component: '',
    displayName: 'Send',
    icon: 'SendIcon',
    isShowAction: isShowAction,
  },
  emailTo: {
    method: null,
    name: 'emailTo',
    component: '',
    displayName: 'Email To',
    icon: 'MailIcon',
    isShowAction: isShowAction,
  },
  edit: {
    method: null,
    name: 'edit',
    component: 'EditDialog',
    displayName: 'Edit',
    icon: 'EditIcon',
    isShowAction: isShowAction,
  },
  delete: {
    method: null,
    name: 'delete',
    component: 'DeleteContactDialog',
    displayName: 'Delete',
    icon: 'DeleteIcon',
    isShowAction: isShowAction,
  },
  removeFromGroup: {
    method: async (group, contacts) => {
      return await contactsStore.asyncRemoveFromGroup({
        GroupUUID: group.UUID,
        ContactUUIDs: contacts.map(item => item.UUID)
      })
    },
    name: 'removeFromGroup',
    component: 'DeleteContactDialog',
    displayName: 'Remove From Group',
    icon: 'DeleteIcon',
    isShowAction: isShowAction,
  },
}

export const getContactActionsList = (file) => {
  const actions = []
  if (file) {
    Object.keys(contactActions).forEach((key) => {
      actions.push(contactActions[key])
    })
  }
  return actions
}
