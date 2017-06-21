'use strict';

var
	_ = require('underscore'),
	ko = require('knockout'),
	
	App = require('%PathToCoreWebclientModule%/js/App.js'),
	
//	CGroupModel = require('modules/%ModuleName%/js/models/CGroupModel.js'),
	
	CContactsDesktopView = require('modules/ContactsWebclient/js/views/CContactsView.js'),
	
	Enums = window.Enums
;

/**
 * @constructor
 */
function CContactsView()
{
	CContactsDesktopView.call(this);

	this.visibleDragNDropToGroupText = ko.observable(false);
	this.sBeforeContactToolbarTemplate = '%ModuleName%_ToolbarContactView';
	this.sContactToolbarTemplate = '';
	this.selectedPanel = ko.observable(Enums.MobilePanel.Items);
	this.selectedItem.subscribe(function () {
		var bViewGroup = this.selectedItem() && this.selectedItem().constructor.name === 'CGroupModel' &&
				!this.selectedItem().isNew();
		
		if (this.selectedItem() && !bViewGroup)
		{
			this.gotoViewPane();
		}
		else
		{
			this.gotoContactList();
		}
	}, this);
	
	App.broadcastEvent('%ModuleName%::ConstructView::after', {'Name': this.ViewConstructorName, 'View': this});
}

_.extendOwn(CContactsView.prototype, CContactsDesktopView.prototype);

CContactsView.prototype.ViewTemplate = '%ModuleName%_ContactsScreenView';
CContactsView.prototype.ViewConstructorName = 'CContactsView';

/**
 * Ajax.send - 'CreateGroup', 'UpdateGroup'
 * cancel group edit
 */
CContactsView.prototype.gotoGroupList = function ()
{
	this.changeSelectedPanel(Enums.MobilePanel.Groups);
};

/**
 * onRoute if (this.selectedItem() instanceof CContactModel)
 * @returns {Boolean}
 */
CContactsView.prototype.gotoContactList = function ()
{
	this.changeSelectedPanel(Enums.MobilePanel.Items);
	return true;
};

/**
 * onRoute if oParams.Action 'create-contact', 'create-group', 'import'
 */
CContactsView.prototype.gotoViewPane = function ()
{
	this.changeSelectedPanel(Enums.MobilePanel.View);
};

CContactsView.prototype.backToContactList = function ()
{
	this.changeRouting();
};

/**
 * @param {number} iPanel
 */
CContactsView.prototype.changeSelectedPanel = function (iPanel)
{
	this.selectedPanel(iPanel);
};

module.exports = new CContactsView();
