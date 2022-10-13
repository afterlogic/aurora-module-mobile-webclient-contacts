import settings from './settings'
import { defineAsyncComponent } from 'vue'

// console.log('router')

export default {
  moduleName: 'ContactsMobileWebclient',

  requiredModules: [],

  init (appdata) {
    settings.init(appdata)
  },

  

  getNormalUserPages () {
    return [
      {
        pageName: 'contacts_default',
        pagePath: '/contacts',
        pageComponent: () => import('./pages/Contacts'),
        pageHeaderComponent: () => import('./components/header/ContactsHeader'),
      },
      {
        pageName: 'contacts_list',
        pagePath: '/contacts/:storageId',
        pageComponent: () => import('./pages/Contacts'),
        pageHeaderComponent: () => import('./components/header/ContactsHeader'),
      },
      {
        pageName: 'contacts_contact',
        pagePath: '/contacts/:storageId/:contactId',
        pageComponent: () => import('./pages/Contacts'),
        pageHeaderComponent: () => import('./components/header/ContactHeader'),
      },
      {
        pageName: 'add_contact',
        pagePath: '/add_contact',
        pageComponent: () => import('./pages/AddContact'),
        pageHeaderComponent: () => import('./components/header/AddContactHeader'),
      },
      {
        pageName: 'add_group',
        pagePath: '/add_group',
        pageComponent: () => import('./pages/AddGroup'),
        pageHeaderComponent: () => import('./components/header/AddGroupHeader'),
      },
      {
        pageName: 'edit_contact',
        pagePath: '/contact/:id/edit',
        pageComponent: () => import('./pages/EditContact'),
        pageHeaderComponent: () => import('./components/header/EditContactHeader'),
      },
    ]
  },

  getPageFooterButtons () {
    return [
      {
        pageName: 'contacts',
        pagePath: '/contacts',
        highlightPaths: ['/contacts', '/contact', '/add_contact', '/add_group'],
        iconComponent: defineAsyncComponent(() => import('./components/icons/ContactsFooterIcon')),
      },
    ]
  },
}
