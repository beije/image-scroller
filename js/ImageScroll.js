/**
 * Adds CSS selector 'active' to all items that are visible in the
 * browser window (or if they are above the browser window).
 *
 * @file			ImageScroll.js
 * @package			BH
 * @dependencies	jQuery
 */

;(function(App, window, document, undefined) {
	'use strict';

	/**
	 * Adds CSS selector 'active' to all items that are visible in the
	 * browser window (or if they are above the browser window).
	 * 
	 * @param {string} selector The CSS selector
	 * @return {object}
	 */
	App.ImageScroll = function(selector) {
		this.selector = '';

		/**
		 * Initializer.
		 * 
		 * @param {string} selector The CSS selector
		 * @return {void}
		 */
		this.initialize = function(selector) {
			this.selector = selector;

			this.setupEvents();
		};

		/**
		 * Sets up events.
		 * 
		 * @return {void}
		 */
		this.setupEvents = function() {
			$(window).on(
				'scroll',
				this.checkItems.bind(this)
			);
		};

		/**
		 * Checks through all elements that matches this.selector.
		 * if they're in view add class active. If they are outside of view but
		 * below the window, remove class active.
		 * 
		 * @return {void}
		 */
		this.checkItems = function() {
			var elements = $(this.selector);
			var windowTop = $(window).scrollTop()
			var windowBottom = windowTop + $(window).height();

			for(var i = 0; i < elements.length; i++) {
				var currentElement = $(elements[i]);

				var elementTop = currentElement.offset().top;
				var elementBottom = elementTop + currentElement.height();

				// If item has class active and is below the browser window, remove active.
				if(currentElement.hasClass('active') && windowBottom < elementTop) {
					currentElement.removeClass('active');
					continue;
				}

				// If the item is above the browser window, add class active.
				if(windowTop >= elementBottom) {
					currentElement.addClass('active');
					continue;
				}

				// If the item doesn't have active, and the item is in view, add class active.
				if(!currentElement.hasClass('active') && this.isItemInView(currentElement, 50)) {
					currentElement.addClass('active')
				}
			}
		};

		/**
		 * Checks if an element is within view of the browser window.
		 * 
		 * @param {element} element The element to check.
		 * @param {int}     offset  Offset checking.
		 *
		 * @return {bool}
		 */
		this.isItemInView = function(element, topOffset) {
			topOffset = topOffset || 0;
			
			var windowTop = $(window).scrollTop();

			var windowBottom = windowTop + ($(window).height()-topOffset);

			var elementTop = $(element).offset().top;
			var elementBottom = elementTop + $(element).height();

			return (windowBottom >= elementTop && windowTop <= elementBottom);
		};

		// Self initialize
		this.initialize(selector);
	};

}(window.BH = window.BH || {}, window, document));