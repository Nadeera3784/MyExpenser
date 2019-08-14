"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

var Noty = require('../js/notie.js');

var NotificationHelpers = (function () {
    function NotificationHelpers() {
    }
    NotificationHelpers.prototype.error = function (msg, timeout) {
        Noty.alert({
            type: 3,
            text: msg,
            time: timeout
        });
    };
    
    NotificationHelpers.prototype.success = function (msg, timeout) {
        Noty.alert({
            type: 1,
            text: msg,
            time: timeout
        });
    };
    
    NotificationHelpers.prototype.warning = function (msg, timeout) {
        Noty.alert({
            type: 2,
            text: msg,
            time: timeout
        });
    };
    
    NotificationHelpers.prototype.confirm = function (msg, callback, subcallback) {
        Noty.confirm({
            type: 1,
            text: msg,
            cancelCallback: function () {
                callback();
            },
            submitCallback: function () {
                subcallback();
            }            
        });        
    };    
	
	NotificationHelpers.prototype.input = function (z, callback, subcallback) {
		Noty.input({
			text: z,
			cancelCallback: function (value) {
				callback(value);
			},
			submitCallback: function (value) {
				subcallback(value);
			},
			type: 'text',
            spellcheck: 'true'
        });        
	};  
    return NotificationHelpers;
}());
exports.NotificationHelpers = NotificationHelpers;
