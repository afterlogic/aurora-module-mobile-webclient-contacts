import settings from './settings'
import { defineAsyncComponent } from 'vue'

export default {
  moduleName: 'ContactsMobileWebclient',

  requiredModules: [],

  init(appdata) {
    settings.init(appdata)
  },

  getNormalUserPages() {
    return [
      {
        pageName: 'contacts',
        pagePath: '/contacts',
        pageComponent: () => import('./pages/Contacts'),

        pageChildren: [
          {
            name: 'contact-list',
            path: '/contacts/:storageId',
            component: () => import('./pages/ContactsList'),
          },
          {
            name: 'contact-view',
            path: '/contacts/:storageId/:contactId',
            component: () => import('./pages/ContactView'),
          },
          {
            name: 'contact-edit',
            path: '/contacts/:storageId/:contactId/edit',
            component: () => import('./pages/EditContact'),
          },
          {
            name: 'contact-create',
            path: '/contacts/:storageId/create-contact',
            component: () => import('./pages/EditContact'),
          },
          {
            name: 'group-list',
            path: '/contacts/group/:groupId',
            component: () => import('./pages/ContactsList'),
          },
          {
            name: 'group-view',
            path: '/contacts/group/:groupId/view',
            component: () => import('./pages/GroupView'),
          },
          {
            name: 'group-edit',
            path: '/contacts/group/:groupId/edit',
            component: () => import('./pages/EditGroup'),
          },
          {
            name: 'group-create',
            path: '/contacts/create-group',
            component: () => import('./pages/EditGroup'),
          },
        ],
      },
    ]
  },

  getPageFooterButtons() {
    return [
      {
        pageName: 'contacts',
        pagePath: '/contacts',
        highlightPaths: ['/contacts', '/create-contact', '/create-group'],
        iconComponent: defineAsyncComponent(() => import('./components/icons/ContactsFooterIcon')),
      },
    ]
  },
}
