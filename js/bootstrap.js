/**
 * Starts the application
 *
 * @file			bootstrap.js
 * @package			BH
 * @dependencies	jQuery
 */

;(function(App, window, document, undefined) {
	'use strict';

	/**
	 * Starts the application
	 * 
	 * @return {object}
	 */
	App.Bootstrap = function() {

		/**
		 * Starts the application
		 * 
		 * @return {void}
		 */
		this.initialize = function() {
			new App.ImageScroll('[data-bh-scroll-image]');
		};

		// Self initialize
		this.initialize();
	};

	//
	// On document ready, fire bootstrap.
	//
	$(document).ready(function(){
		new App.Bootstrap();
	});

}(window.BH = window.BH || {}, window, document));