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
        pageComponent: () => import('./pages/Contacts')
      },
    ]
  },
}
