import contactsWebApi from '../contacts-web-api'

export default {
  asyncGetContacts: async ({}, parameters) => {
    return await contactsWebApi.getContactSuggestions(parameters)
  },
}
