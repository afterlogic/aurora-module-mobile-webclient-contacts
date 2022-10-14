import settings from './settings'
import { defineAsyncComponent } from 'vue'

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

        pageChildren: [
          {
            name: 'list',
            path: '/contacts/:storageId',
            component: () => import('./pages/ContactsList'),
          },
          {
            name: 'contact',
            path: '/contacts/:storageId/:contactId',
            component: () => import('./pages/ContactInfo'),
          },
          {
            name: 'contact-edit',
            path: '/contacts/:storageId/:contactId/edit',
            component: () => import('./pages/EditContact'),
          },
          {
            name: 'group',
            path: '/contacts/group/:groupId',
            component: () => import('./pages/ContactsList'),
          },
          {
            name: 'contact1',
            path: '/contacts/group/:groupId/:contactId',
            component: () => import('./pages/ContactInfo'),
          },
          {
            name: 'contact1-edit',
            path: '/contacts/group/:groupId/:contactId/edit',
            component: () => import('./pages/EditContact'),
          },
        ]
      },
      // {
      //   pageName: 'contacts_list',
      //   pagePath: '/contacts/:storageId',
      //   pageComponent: () => import('./pages/Contacts'),
      //   pageHeaderComponent: () => import('./components/header/ContactsHeader'),
      //   pageChildren: [
      //     {
      //       path: '/contacts/:storageId/:contactId',
      //       component: () => import('./pages/ContactInfo'),
      //     },
      //   ]
      // },
      // {
      //   pageName: 'contacts_contact',
      //   pagePath: '/contacts/:storageId/:contactId',
      //   pageComponent: () => import('./pages/ContactInfo'),
      //   pageHeaderComponent: () => import('./components/header/ContactHeader'),
      // },
      {
        pageName: 'add_contact',
        pagePath: '/add_contact',
        pageComponent: () => import('./pages/AddContact'),
        pageHeaderComponent: () => import('./components/header/AddContactHeader'),
      },
      {
        pageName: 'create-group',
        pagePath: '/create-group',
        pageComponent: () => import('./pages/AddGroup'),
        pageHeaderComponent: () => import('./components/header/AddGroupHeader'),
      },
      // {
      //   pageName: 'edit_contact',
      //   pagePath: '/contact/:id/edit',
      //   pageComponent: () => import('./pages/EditContact'),
      //   pageHeaderComponent: () => import('./components/header/EditContactHeader'),
      // },
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
