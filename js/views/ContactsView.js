'use strict';

var
	_ = require('underscore'),
	ko = require('knockout'),
	f7 = require('framework7'),
	Types = require('%PathToCoreWebclientModule%/js/utils/Types.js'),
	
	App = require('%PathToCoreWebclientModule%/js/App.js'),
	
	CContactsDesktopView = require('modules/ContactsWebclient/js/views/CContactsView.js'),
	
	Enums = window.Enums
;

if (!window.f7App)
{
	window.f7App = new Framework7({
////		pushState: true,
//		//swipePanel: 'left'
		fastClicks:false,
		tapHoldPreventClicks: false,
		pushState: false
	});
	
}

//_.defer(function () {
//	window.f7App.addView('.view-main', {
//	});
	
//	window.f7App.addView('.contacts-view', {
//	});
////	
////	console.log(window.f7App);
//	window.f7App.onPageInit('test', function (page) {
//	  console.log('page', page);
//	});
//	
//	console.log(window.f7App);
//});

/**
 * @constructor
 */
function CContactsView()
{
	CContactsDesktopView.call(this);

	this.oPageSwitcher.ViewTemplate = 'CoreMobileWebclient_PageSwitcherView';

	this.visibleDragNDropToGroupText = ko.observable(false);
	this.selectedPanel = ko.observable(Enums.MobilePanel.Items);
	this.selectedItem.subscribe(function (oItem) {
		var 
			bViewGroup = oItem && oItem.constructor.name === 'CGroupModel' && !oItem.isNew()
		;
		
		if (oItem && !bViewGroup)
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
		var bOpen = value === Enums.MobilePanel.Groups;

		$('body').toggleClass('with-panel-left-reveal', bOpen).toggleClass('panel-closing', !bOpen);
	});
	
	var self = this;
	this.appsDom = $('#apps-list');
	this.appsDom.on('click', function () {
		self.showApps(false);
	});
	
	this.showApps.subscribe(function (value) {
		$('body').toggleClass('with-panel-right-cover', value);
	}, this);
};

CContactsView.prototype.togleGroupList = function (oData, oEvent, bValue)
{
	var 
		bValue = bValue || this.selectedPanel() !== Enums.MobilePanel.Groups,
		newPanel = bValue ? Enums.MobilePanel.Groups : Enums.MobilePanel.Items
	;

	this.changeSelectedPanel(newPanel);
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

CContactsView.prototype.composeMessage = function () {
	var
		aList = this.selector.listCheckedOrSelected(),
		aEmails = Types.isNonEmptyArray(aList) ? _.compact(_.map(aList, function (oItem) {
			return oItem.Email() !== '' ? oItem.getFullEmail() : '';
		})) : [],
		sEmails = aEmails.join(', ')
	;

	if (sEmails !== '')
	{
		this.composeMessageToAddresses(sEmails);
	}
};

module.exports = new CContactsView();
