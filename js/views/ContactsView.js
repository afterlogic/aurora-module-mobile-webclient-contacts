'use strict';

var
	_ = require('underscore'),
	ko = require('knockout'),
	
	App = require('%PathToCoreWebclientModule%/js/App.js'),
	
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
	this.selectedPanel = ko.observable(Enums.MobilePanel.Items);
	this.selectedItem.subscribe(function () {
		console.log('asdasd');
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
	
	this.appsDom = null;
	this.showApps = ko.observable(false);
	
	this.init();
}

_.extendOwn(CContactsView.prototype, CContactsDesktopView.prototype);

CContactsView.prototype.ViewTemplate = '%ModuleName%_ContactsScreenView';
CContactsView.prototype.ViewConstructorName = 'CContactsView';

CContactsView.prototype.init = function ()
{

	
	this.selectedPanel.subscribe(function (value) {
		$('body').toggleClass('with-panel-left-reveal', value === Enums.MobilePanel.Groups);
	});
	
	var self = this;
	this.appsDom = $('#apps-list');
	this.appsDom.on('click', function () {
		self.showApps(false);
	});
	
	this.showApps.subscribe(function (value) {
		if (value) 
		{
			this.appsDom.css({'display': 'block'});
		}
		else
		{
			this.appsDom.css({'display': 'none'});
		}
		
		
		$('body').toggleClass('with-panel-left-reveal', value);
	}, this);
};

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
