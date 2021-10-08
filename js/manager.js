'use strict';

module.exports = function (oAppData) {
	var
		Types = require('%PathToCoreWebclientModule%/js/utils/Types.js'),
		
		App = require('%PathToCoreWebclientModule%/js/App.js'),
		ModulesManager = require('%PathToCoreWebclientModule%/js/ModulesManager.js'),
		
		ContactsSettings = null
	;
	
	if (!ModulesManager.isModuleAvailable('CoreMobileWebclient'))
	{
		return null;
	}
	
	if (App.isUserNormalOrTenant())
	{
		if (App.isMobile())
		{
			var setContactsSettings = function () {
				if (ContactsSettings === null)
				{
					ContactsSettings = ModulesManager.run('ContactsWebclient', 'getSettings');
				}
			};

			return {
				getScreens: function () {
					setContactsSettings();
					var oScreens = {};
					if (ContactsSettings && Types.isNonEmptyString(ContactsSettings.HashModuleName))
					{
						oScreens[ContactsSettings.HashModuleName] = function () {
							return require('modules/%ModuleName%/js/views/ContactsView.js');
						};
					}
					return oScreens;
				},
				getHeaderItem: function () {
					setContactsSettings();
					var HeaderItemView = ModulesManager.run('ContactsWebclient', 'getHeaderItemView');
					if (ContactsSettings && Types.isNonEmptyString(ContactsSettings.HashModuleName) && HeaderItemView)
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
