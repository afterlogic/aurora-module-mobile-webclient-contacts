import settings from './settings'
import { defineAsyncComponent } from "vue";
export default {
  moduleName: 'ContactsMobileWebclient',

  requiredModules: [],

  init (appdata) {
    settings.init(appdata)
  },

  getNormalUserPages () {
    return [
      {
        pageName: 'contacts',
        pagePath: '/contacts',
        pageComponent: () => import('./pages/Contacts'),
        pageHeaderComponent: () => import('./components/header/ContactsHeader'),
      },
      {
        pageName: 'contact',
        pagePath: '/contact/:id',
        pageComponent: () => import('./pages/ContactInfo'),
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
        pageHeaderComponent: () => import('./components/header/ContactHeader'),
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
