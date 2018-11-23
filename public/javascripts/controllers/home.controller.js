angular.module('websiteApp')
.controller('homeController', ['$scope', '$rootScope', '$http', '$window', '$uibModal', '$location',
	function($scope, $rootScope, $http, $window, $uibModal, $location) {
		// the only terms we are accepting for prototype
		var seafoodTerms = ['seafood', 'fish', 'cod', 'grouper', 'haddock', 'halibut', 'salmon'];
		var canTerms = ['stock', 'broth', 'campbell', 'vegetable', 'chicken', 'beef', 'soup', 'can', 'cans', 'campbell\'s', 'kitchen', 'swanson'];

		// var to determine if search term matches the prototype
		$scope.isCanMatch = false;
		$scope.isSeafoodMatch = false;

		(function init() {
			$window.sessionStorage.setItem('path', 'Store Map');
		})();

		function determineMatch(searchTerm) {
			var searchTerms = searchTerm.split(' ');

			$scope.isCanMatch = false;
			$scope.isSeafoodMatch = false;

			_.each(searchTerms, function(term) {
				if (seafoodTerms.includes(term.toLowerCase())) {
					$scope.isSeafoodMatch = true;
				} 

				if (canTerms.includes(term.toLowerCase())) {
					$scope.isCanMatch = true;
				}
			});
		}

		$scope.openShelf = function(category) {
			$window.sessionStorage.setItem('shelf', category);
			$location.path('/shelf');
		}

		$scope.$on('searchUpdated', function(event, args) {
			determineMatch(args.searchTerm);
		});
	}]);