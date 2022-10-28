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
      // {
      //   pageName: 'contacts_list',
      //   pagePath: '/contacts/:storageId',
      //   pageComponent: () => import('./pages/Contacts'),
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
      // },
      // {
      //   pageName: 'create-contact',
      //   pagePath: '/create-contact',
      //   pageComponent: () => import('./pages/AddContact'),
      // },
      // {
      //   pageName: 'create-group',
      //   pagePath: '/create-group',
      //   pageComponent: () => import('./pages/AddGroup'),
      // },
      // {
      //   pageName: 'edit_contact',
      //   pagePath: '/contact/:id/edit',
      //   pageComponent: () => import('./pages/EditContact'),
      // },
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
