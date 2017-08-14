'use strict';

module.exports = function (oAppData) {
	var
		App = require('%PathToCoreWebclientModule%/js/App.js'),
		ModulesManager = require('%PathToCoreWebclientModule%/js/ModulesManager.js'),
		
		ContactsSettings = null,
		HeaderItemView = null
	;
	
	if (!ModulesManager.isModuleAvailable('CoreMobileWebclient'))
	{
		return null;
	}
	
	if (App.getUserRole() === Enums.UserRole.NormalUser)
	{
		if (App.isMobile())
		{
			return {
				start: function (ModulesManager) {
					ContactsSettings = ModulesManager.run('ContactsWebclient', 'getSettings');
					HeaderItemView = ModulesManager.run('ContactsWebclient', 'getHeaderItemView');
				},
				getScreens: function () {
					var oScreens = {};
					if (ContactsSettings)
					{
						oScreens[ContactsSettings.HashModuleName] = function () {
							return require('modules/%ModuleName%/js/views/ContactsView.js');
						};
					}
					return oScreens;
				},
				getHeaderItem: function () {
					if (ContactsSettings && HeaderItemView)
					{
						return {
							item: HeaderItemView,
							name: ContactsSettings.HashModuleName
						};
					}
					return null;
				}
			};
		}
	}
	
	return null;
};
