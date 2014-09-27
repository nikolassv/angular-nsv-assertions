# assertions for angularJS

This module provides a service for assertions in angularJS. It allows to activate and de-activate assertions globally via its `ServiceProvider`.

## Why use assertions

Read this:

- https://en.wikipedia.org/wiki/Assertion_(software_development)
- http://www.pgbovine.net/programming-with-asserts.htm

## How to install this module

You may either download the file `angular-nsv-assertions.js` manually or use bower
to also track it as an dependency for your project:
```
bower install angular-nsv-assertions --save
```

## How to integrate assertions into your app

Make `angular-nsv-assertion` a depedency for your application:
```
 angular.module('yourApp', ['angular-nsv-assertions', ... ]);
```
Inject `angular-nsv-assertion.AssertService` into each controller, directive, service etc. you want to use it in. As it consists
only of one method, you want to give it a short name. I recommend `assert` and will use this name throughout this manual:
```
angular.module('yourApp').controller('YourCtrl', [
	'angular-nsv-assertion.AssertService',
	function (assert) {
		...
	}
});	
```	
Make assertions

## How to make assertions

The easiest way to make an assertion is to just give a boolean argument to the `AssertService`:

	assert(angular.isNumber(myVar));
	assert(myVar > 0);
	assert(myVar < 10);
	
When the condition holds `true` everythings is fine and your script will work as normal. However, if the condition is `false` an `AssertionError` error will be raised.

If you want to set an individual message in the raised error, you may provide it as a second argument to the `AssertService`:

	assert(angular.isNumber(myVar), 'myVar is not a number');
	assert(myVar > 0, 'myVar is to small');
	assert(myVar < 10, 'myVar is to big');
	
You may also provide an error object of your own that will be raised instead of the standard `AssertionError`:

	assert(angular.isNumber(myVar), (new TypeError('myVar is of the wrong type'));

Instead of a boolean value, the first argument may also be a function that returns a boolean value:

	assert(function () {
		return aReallyBigArray.indexOf(myVar) !== -1;
	});
	
This is especially usefull if you are concerned about the performace of your assertions. If your assertion consists of a function this function
will only be invoked when assertions are enabled. If you disable the assertions it will not be invoked at all.

## How to disable assertions

You may easily disable assertions via the `AssertServiceProvider` in the `config` of your app:

	angular.module('yourApp).config([
		'angular-nsv-assertions.AssertServiceProvider',
		function (AssertServiceProvider) {
			AssertServiceProvider.enable(false);
		}
	]);
	
The `AssertServiceProvider` has one method only: `enable()`. If its argument is `false` assertions will be disabled for all your
application. Actually, the `AssertService` will be replaced by `angular.noop`.
	
