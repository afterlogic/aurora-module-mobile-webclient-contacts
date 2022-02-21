import settings from './settings'

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
        pageHeaderComponent: () => import('./components/header/DefaultHeader'),
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
    ]
  },

  getPageFooterButtons () {
    return [
      {
        pageName: 'contacts',
        pagePath: '/contacts',
        highlightPaths: ['/contacts', '/contact', '/add_contact', '/add_group'],
        getIconComponent: () => import('./components/icons/ContactsFooterIcon'),
      },
    ]
  },
}
