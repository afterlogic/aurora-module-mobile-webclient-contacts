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
      pageName: 'contacts',
      pagePath: '/contacts',
      pageComponent: () => import('./pages/Contacts'),
      pageHeaderComponent: () => import('./components/header/ContactsHeader'),

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
          component: () => import('./pages/AddContact'),
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
    // {
    //   pageName: 'create-contact',
    //   pagePath: '/create-contact',
    //   pageComponent: () => import('./pages/AddContact'),
    //   pageHeaderComponent: () => import('./components/header/AddContactHeader'),
    // },
    // {
    //   pageName: 'create-group',
    //   pagePath: '/create-group',
    //   pageComponent: () => import('./pages/AddGroup'),
    //   pageHeaderComponent: () => import('./components/header/AddGroupHeader'),
    // },
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
        highlightPaths: ['/contacts', '/create-contact', '/create-group'],
        iconComponent: defineAsyncComponent(() => import('./components/icons/ContactsFooterIcon')),
      },
    ]
  },
}
