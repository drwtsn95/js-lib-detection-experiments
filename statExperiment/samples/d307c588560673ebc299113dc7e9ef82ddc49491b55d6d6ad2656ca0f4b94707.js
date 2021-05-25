/* START Web.Widgets.Forms.Widgets.NoBotValidatorFormField.NoBotValidator.js */
Type.registerNamespace("Web.Widgets.Forms.Widgets.NoBotValidatorFormField");

Web.Widgets.Forms.Widgets.NoBotValidatorFormField.NoBotValidator = function (element) {
	Web.Widgets.Forms.Widgets.NoBotValidatorFormField.NoBotValidator.initializeBase(this, [element]);

	this._enableMinTimeoutBetweenLoadAndPostbackTracking = false;
	this._enableMouseMoveTracking = false;
	this._hdnFieldId = '';

	this._hdnField = null;
	this._loadTime = null;

	this._postBackHandlerDelegate = Function.createDelegate(this, this._postBackHandler);
	this._mouseMoveHandlerDelegate = Function.createDelegate(this, this._mouseMoveHandler);
}

Web.Widgets.Forms.Widgets.NoBotValidatorFormField.NoBotValidator.prototype = {
	/* --------------------------------- set up and tear down ---------------------------- */

	initialize: function () {
		Web.Widgets.Forms.Widgets.NoBotValidatorFormField.NoBotValidator.callBaseMethod(this, 'initialize');

		this._hdnField = document.getElementById(this._hdnFieldId);
		this._attachEvents();
	},

	dispose: function () {
		Web.Widgets.Forms.Widgets.NoBotValidatorFormField.NoBotValidator.callBaseMethod(this, 'dispose');
	},

	/* --------------------------------- public methods ---------------------------------- */

	/* --------------------------------- event handlers ---------------------------------- */

	_postBackHandler: function (e) {
		$removeHandler($get('aspnetForm'), 'submit', this.get_postBackHandlerDelegate());
		var timeSpan = new Date() - new Date(this._loadTime);
		delete this._postBackHandlerDelegate;
		this._changeState("minTimeoutBetweenLoadAndPostback", timeSpan);
	},

	_mouseMoveHandler: function (e) {
		$removeHandler(document.body, "mousemove", this.get_mouseMoveHandlerDelegate());
		delete this._mouseMoveHandlerDelegate;
		this._changeState("mouseMove", "OK");
	},

	/* --------------------------------- private methods --------------------------------- */

	_attachEvents: function () {
		if (this.get_enableMinTimeoutBetweenLoadAndPostbackTracking()) {
			this._loadTime = window.initVar;
			$addHandler($get('aspnetForm'), 'submit', this.get_postBackHandlerDelegate(), true);
		}

		if (this.get_enableMouseMoveTracking()) {
			$addHandler(document.body, "mousemove", this.get_mouseMoveHandlerDelegate(), true);
		}
	},

	_changeState: function (key, value) {
		this._hdnField.value = String.format("{0}{1}={2};", this._hdnField.value, key, value);
	},

	/* --------------------------------- properties -------------------------------------- */

	set_enableMinTimeoutBetweenLoadAndPostbackTracking: function (value) {
		if (this._enableMinTimeoutBetweenLoadAndPostbackTracking !== value) {
			this._enableMinTimeoutBetweenLoadAndPostbackTracking = value;
			this.raisePropertyChanged('enableMinTimeoutBetweenLoadAndPostbackTracking');
		}
	},
	get_enableMinTimeoutBetweenLoadAndPostbackTracking: function () {
		return this._enableMinTimeoutBetweenLoadAndPostbackTracking;
	},

	set_enableMouseMoveTracking: function (value) {
		if (this._enableMouseMoveTracking !== value) {
			this._enableMouseMoveTracking = value;
			this.raisePropertyChanged('enableMouseMoveTracking');
		}
	},
	get_enableMouseMoveTracking: function () {
		return this._enableMouseMoveTracking;
	},

	set_hdnFieldId: function (value) {
		if (this._hdnFieldId !== value) {
			this._hdnFieldId = value;
			this.raisePropertyChanged('hdnFieldId');
		}
	},
	get_hdnFieldId: function () {
		return this._hdnFieldId;
	},

	get_mouseMoveHandlerDelegate: function () {
		return this._mouseMoveHandlerDelegate;
	},

	get_postBackHandlerDelegate: function () {
		return this._postBackHandlerDelegate;
	}
}

Web.Widgets.Forms.Widgets.NoBotValidatorFormField.NoBotValidator.registerClass('Web.Widgets.Forms.Widgets.NoBotValidatorFormField.NoBotValidator', Telerik.Sitefinity.Web.UI.Fields.FieldControl);
/* END Web.Widgets.Forms.Widgets.NoBotValidatorFormField.NoBotValidator.js */
/* START Web.Widgets.Forms.Widgets.HiddenFormField.HiddenFieldControl.js */
Type.registerNamespace("Web.Widgets.Forms.Widgets.HiddenFormField");

Web.Widgets.Forms.Widgets.HiddenFormField.HiddenFieldControl = function (element) {
	Web.Widgets.Forms.Widgets.HiddenFormField.HiddenFieldControl.initializeBase(this, [element]);
	this._element = element;
	this._fieldName = null;
	this._fieldValue = null;
	this._renderCleanFieldNameClientSide = null;
	this._hiddenField = null;
	this.$_hiddenField = null;
}

Web.Widgets.Forms.Widgets.HiddenFormField.HiddenFieldControl.prototype = {
	initialize: function () {
		/* Here you can attach to events or do other initialization */      
		Web.Widgets.Forms.Widgets.HiddenFormField.HiddenFieldControl.callBaseMethod(this, "initialize");

		var self = this;

		if (self._renderCleanFieldNameClientSide) {
			self.$_hiddenField =
			$('<input>').attr({
				type: 'hidden',
				name: self._fieldName,
			}).appendTo($(self._element));

			this.hiddenInputValueChange(self.$_hiddenField, function (value) {
					$(self._hiddenField).val(value);
			});

			self.$_hiddenField.val(this._fieldValue);
		} else {
			$(self._hiddenField).val(this._fieldValue);
		}
	},

	dispose: function () {
		/*  this is the place to unbind/dispose the event handlers created in the initialize method */   
		Web.Widgets.Forms.Widgets.HiddenFormField.HiddenFieldControl.callBaseMethod(this, "dispose");
	},

	/* --------------------------------- public methods ---------------------------------- */

	get_value: function () {
		return $(this._hiddenField).val();
	},

	set_value: function (value) {
			$(this._hiddenField).val(value);
			Web.Widgets.Forms.Widgets.HiddenFormField.HiddenFieldControl.callBaseMethod(this, "_valueChangedHandler");
	},

	/* --------------------------------- event handlers ---------------------------------- */

	/* --------------------------------- private methods --------------------------------- */
	hiddenInputValueChange: function (input, callback) {
		var oldvalue = input.val();

		setInterval(function(){
			if (input.val() != oldvalue){
				oldvalue = input.val();
				callback(oldvalue);
			}
		}, 100);
	},

	/* --------------------------------- properties -------------------------------------- */

	get_hiddenField: function () {
		return this._hiddenField;
	},

	set_hiddenField: function (value) {
		this._hiddenField = value;
	},

	get_fieldName: function () {
		return this._fieldName;
	},

	set_fieldName: function (value) {
		this._fieldName = value;
	},

	get_fieldValue: function () {
		return this._fieldValue;
	},

	set_fieldValue: function (value) {
		this._fieldValue = value;
	},

	get_renderCleanFieldNameClientSide: function () {
		return this._renderCleanFieldNameClientSide;
	},

	set_renderCleanFieldNameClientSide: function (value) {
		this._renderCleanFieldNameClientSide = value;
	}
};

Web.Widgets.Forms.Widgets.HiddenFormField.HiddenFieldControl.registerClass("Web.Widgets.Forms.Widgets.HiddenFormField.HiddenFieldControl", Telerik.Sitefinity.Web.UI.Fields.FieldControl);
/* END Web.Widgets.Forms.Widgets.HiddenFormField.HiddenFieldControl.js */
if(typeof(Sys)!=='undefined')Sys.Application.notifyScriptLoaded();
(function() {
    function loadHandler() {
        var hf = window.__TsmHiddenField;
        if (!hf) return;
        if (!hf._RSM_init) { hf._RSM_init = true; hf.value = ''; }
        hf.value += ';;Web.Widgets.Forms, Version=1.0.13259.1, Culture=neutral, PublicKeyToken=null:en-US:ef514809-ab14-424f-9714-9ff1e0d47795:e23b951e:791533ee';
        Sys.Application.remove_load(loadHandler);
    };
    Sys.Application.add_load(loadHandler);
})();
