import store from "src/store";

const isShowAction = (action, contact) => {
  let result = true
  if (contact) {
    switch (action) {
      case 'findInEmail':
        break
      case 'share':
        if (contact.Storage !== 'personal') result = false
        break
      case 'unshare':
        if (contact.Storage !== 'shared') result = false
        break
      case 'send':
        break
      case 'edit':
        break
      case 'delete':
        if (contact.Storage === 'team') result = false
        break
      default:
        break
    }
  }
  return result
}

export const contactActions = {
  findInEmail: {
    method: null,
    name: 'findInEmail',
    component: 'FindInEmailDialog',
    displayName: 'Find in Email',
    icon: 'FindInEmailIcon',
    isShowAction: isShowAction,
  },
  share: {
    method: async (contact) => {
      await store.dispatch('contactsmobile/asyncShareContact', {
        UUIDs: [contact.UUID]
      })

    },
    name: 'share',
    component: '',
    displayName: 'Share',
    icon: 'SharingIcon',
    isShowAction: isShowAction,
  },
  unshare: {
    method: async (contact) => {
      await store.dispatch('contactsmobile/asyncUnShareContact', {
        UUIDs: [contact.UUID]
      })
    },
    name: 'unshare',
    component: '',
    displayName: 'Unshare',
    icon: 'SharingIcon',
    isShowAction: isShowAction,
  },
  send: {
    method: null,
    name: 'send',
    component: 'SendDialog',
    displayName: 'Send',
    icon: 'SendIcon',
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
