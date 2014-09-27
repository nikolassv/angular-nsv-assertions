/**
 * we need this helper `mockModule` to get a configured AssertionService
 */
angular.module('mockModule', ['angular-nsv-assertions'])
	.config(['angular-nsv-assertions.AssertServiceProvider',
		function (assertServiceProvider) {
			assertServiceProvider.enable(false);
		}
	])
	.service('deactivatedAssertions', ['angular-nsv-assertions.AssertService', function (assertService) {
		return assertService;
	}]);
	
/**
 * the actual tests
 */
describe('angular-nsv-assertions', function () {
	var mockAssertions = {
		trueAssertion : function () { return true; },
		falseAssertion : function () { return false; }
	};

	describe('when activated', function () {
		var assert;
		
		beforeEach(function () {
			module('angular-nsv-assertions');		
			inject(function ($injector) {
				assert = $injector.get('angular-nsv-assertions.AssertService');
			});
		});
		
		it('should throw an Error when an assertion fails', function () {
			expect(function () {
				assert(false);
			}).toThrow();
		});
		
		it('should not throw an Error when assertion holds true', function () {
			expect(function () {
				assert(true);
			}).not.toThrow();
		});
		
		it('should call an assertion function and throw an Error if it returns true', function () {
			spyOn(mockAssertions, 'trueAssertion').andCallThrough();
			expect(function () {
				assert(mockAssertions.trueAssertion);
			}).not.toThrow();
			expect(mockAssertions.trueAssertion).toHaveBeenCalled();
		});
		
		it('should call an assertion function and throw an Error if it returns false', function () {
			spyOn(mockAssertions, 'falseAssertion').andCallThrough();				
			expect(function () {
				assert(mockAssertions.falseAssertion);
			}).toThrow();
			expect(mockAssertions.falseAssertion).toHaveBeenCalled();
		});
	});
	
	describe('when de-activated', function () {
		var assert;
		
		beforeEach(function () {
			module('mockModule');
			inject(function(deactivatedAssertions) {
				assert = deactivatedAssertions;
			});
		});
		
		it('should not throw an Error when an assertion fails', function () {
			expect(function () {
				assert(false);
			}).not.toThrow();
		});
		
		it('should not throw an Error when assertion holds true', function () {
			expect(function () {
				assert(true);
			}).not.toThrow();
		});
		
		it('should not call an assertion function and never throw an Error', function () {
			spyOn(mockAssertions, 'trueAssertion').andCallThrough();
			expect(function () {
				assert(mockAssertions.trueAssertion);
			}).not.toThrow();
			expect(mockAssertions.trueAssertion).not.toHaveBeenCalled();
		});
	});	
});