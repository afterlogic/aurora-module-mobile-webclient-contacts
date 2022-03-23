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
    .catch(() => {
      return []
    })
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
    .catch(() => {
      return []
    })
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
    .catch(() => {
      return []
    })
  },
  getContact: async (parameters) => {
    return webApi.sendRequest({
      moduleName: 'Contacts',
      methodName: 'GetContact',
      parameters,
    }).then((result) => {
      if (result) {
        return result
      }
      return false
    })
  },
  getContactSuggestions: async (parameters) => {
    return webApi.sendRequest({
      moduleName: 'Contacts',
      methodName: 'GetContactSuggestions',
      parameters,
    }).then((result) => {
      if (result) {
        return result
      }
      return false
    })
  },
  createContact: async (parameters) => {
    return webApi.sendRequest({
      moduleName: 'Contacts',
      methodName: 'CreateContact',
      parameters,
    })
    .then((result) => {
      return result
    })
    .catch((e) => {
      throw new Error(e.message ?? e)
    })
  },
  createGroup: async (parameters) => {
    return webApi.sendRequest({
      moduleName: 'Contacts',
      methodName: 'CreateGroup',
      parameters,
    })
    .then((result) => {
      return result
    })
    .catch((e) => {
      throw new Error(e.message ?? e)
    })
  },
  deleteContact: async (parameters) => {
    return webApi.sendRequest({
      moduleName: 'Contacts',
      methodName: 'DeleteContacts',
      parameters,
    })
        .then((result) => {
          return result
        })
        .catch((e) => {
          throw new Error(e.message ?? e)
        })
  }
}
