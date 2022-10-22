import webApi from 'src/api/web-api'

export default {
  getContacts: async (parameters) => {
    return webApi.sendRequest({
      moduleName: 'Contacts',
      methodName: 'GetContacts',
      parameters,
    })
      .then((result) => {
        if (result) {
          return result
        }
        return []
      })
      .catch(error => [])
  },

  getStorages: async () => {
    return webApi.sendRequest({
      moduleName: 'Contacts',
      methodName: 'GetStorages',
      parameters: {},
    })
      .then((result) => {
        if (result) {
          return result
        }
        return []
      })
      .catch(error => [])
  },

  getGroups: async () => {
    return webApi.sendRequest({
      moduleName: 'Contacts',
      methodName: 'GetGroups',
      parameters: {},
    })
      .then((result) => {
        if (result) {
          return result
        }
        return []
      })
      .catch(error => [])
  },

  getContact: async (parameters) => {
    return webApi.sendRequest({
      moduleName: 'Contacts',
      methodName: 'GetContact',
      parameters,
    })
      .then((result) => {
        if (result) {
          return result
        }
        return false
      })
      .catch(error => false)
  },

  getContactSuggestions: async (parameters) => {
    return webApi.sendRequest({
      moduleName: 'Contacts',
      methodName: 'GetContactSuggestions',
      parameters,
    })
      .then((result) => {
        if (result) {
          return result
        }
        return false
      })
      .catch(error => false)
  },

  createContact: async (parameters) => {
    return webApi.sendRequest({
      moduleName: 'Contacts',
      methodName: 'CreateContact',
      parameters,
    })
      .then(result => result)
      .catch(error => error)
  },

  updateContact: async (parameters) => {
    return webApi.sendRequest({
      moduleName: 'Contacts',
      methodName: 'UpdateContact',
      parameters,
    })
      .then(result => result)
      .catch(error => error)
  },

  createGroup: async (parameters) => {
    return webApi.sendRequest({
      moduleName: 'Contacts',
      methodName: 'CreateGroup',
      parameters,
    })
      .then(result => result)
      .catch(error => error)
  },

  updateGroup: async (parameters) => {
    return webApi.sendRequest({
      moduleName: 'Contacts',
      methodName: 'UpdateGroup',
      parameters,
    })
      .then(result => result)
      .catch(error => error)
  },

  deleteGroup: async (parameters) => {
    return webApi.sendRequest({
      moduleName: 'Contacts',
      methodName: 'DeleteGroup',
      parameters,
    })
      .then(result => result)
      .catch(error => error)
  },

  deleteContacts: async (parameters) => {
    return webApi.sendRequest({
      moduleName: 'Contacts',
      methodName: 'DeleteContacts',
      parameters,
    })
      .then(result => result)
      .catch(error => error)
  },

  shareContact: async (parameters) => {
    return webApi.sendRequest({
      moduleName: 'Contacts',
      methodName: 'UpdateSharedContacts',
      parameters,
    })
      .then(result => result)
      .catch(error => error)
  },

  removeFromGroup: async (parameters) => {
    return webApi.sendRequest({
      moduleName: 'Contacts',
      methodName: 'RemoveContactsFromGroup',
      parameters,
    })
      .then(result => result)
      .catch(error => error)
  },
}
