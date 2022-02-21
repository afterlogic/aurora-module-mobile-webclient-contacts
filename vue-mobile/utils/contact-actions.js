const isShowAction = (action, contact) => {
  let result = true
  if (contact) {
    switch (action) {
      case 'findInEmail':
        break
      case 'share':
        break
      case 'send':
        break
      case 'edit':
        break
      case 'delete':
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
    method: null,
    name: 'share',
    component: 'ShareDialog',
    displayName: 'Share',
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
    component: 'DeleteDialog',
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
