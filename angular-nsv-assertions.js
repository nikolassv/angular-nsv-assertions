angular
	.module('angular-nsv-assertions', [])
	/**
	 * a factory for an AssertionError constructor function
	 *
	 * assertion Errors may be thrown when an assertion is incorrect. They inherit all their methods
	 * and properties from the standard Error prototype. They add no methods and properties of their own.
	 */
	.factory('angular-nsv-assertions.AssertionError', function AngularNsvAssertions_AssertionError() {
		function AssertionError (message) {
			this.name = 'AssertionError';
			this.message = 'an assertion failed to be correct';
		}
		AssertionError.prototype = new Error();
		AssertionError.prototype.constructor = AssertionError;
		return AssertionError;
	})
	/**
	 * an assertion service
	 *
	 * the `AssertServiceProvider` offers one method `enableAssertions`. This methods enables or disables
	 * assertions globally.
	 *
	 * the `AssertService` itself creates one method that checks whether a defined condition is true and
	 * throws an error otherwise.
	 */
	.provider('angular-nsv-assertions.AssertService', function AngularNsvAssertion_AssertService () {
		var isAssertionsEnabled = true;
		
		/**
		 * enables or disables the `AssertService` globally in an application
		 *
		 * the `AssertService` is enabled by default
		 *
		 * @param {boolean} enable;
		 * @return {boolean} returns its input
		 */
		this.enable = function (enable) {
			return isAssertionsEnabled = !!enable;
		};
		
		/**
		 * constructor for the `AssertService`
		 *
		 * the `AssertService` consists of one function only that checks whether an assertion
		 * is correct and throws in error otherwise.
		 *
		 * if the `AssertService` is diabled it will return an non-operation dummy function
		 *
		 * @return {function}
		 */
		this.$get = ['$log', 'angular-nsv-assertions.AssertionError',
			function ($log, AssertionError) {
				/**
				 * checks wether an assertion is correct, throw an error otherwise
				 *
				 * if the first argument is not a function it is treated as boolean. if the first 
				 * argument is a function it will be invoked and checked whether
				 * its result is `true` or `false`.
				 *
				 * if the second argument is a string an `AssertionError` will be thrown with 
				 * the given string as message. If it is an object and has `Error` in its
				 * prototype chain it will just be thrown. Otherwise a generic `AssertionError`
				 * will be thrown.
				 *
				 * @param {boolean|function}
				 * @param {string|Error|*}
				 * @return {boolean} whether the assertion is correct (will always be `true` or not reached at all)
				 */
				var AngularNsvAssertions_AssertService_Assert = function AngularNsvAssertions_AssertService_Assert (assertion, errorMsg) {
					var assertionIsCorrect, errorObj;
					
					if (angular.isFunction(assertion)) {
						assertionIsCorrect = assertion();
					} else {
						assertionIsCorrect = !!assertion;
					}
					
					if (!assertionIsCorrect) {
						if (angular.isString(errorMsg)) {
							errorObj = new AssertionError(errorMsg);
						} else if (errorMsg instanceof Error) {
							errorObj = errorMsg;
						} else {
							errorObj = new AssertionError();
						}
						throw errorObj;
					}
					
					return assertionIsCorrect;
				};
				
				return isAssertionsEnabled ?
							AngularNsvAssertions_AssertService_Assert :
							angular.noop;
			}
		];
	});
