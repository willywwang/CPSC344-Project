angular.module('websiteApp')
.controller('homeController', ['$scope', '$rootScope', '$http', '$window', '$uibModal', '$location',
	function($scope, $rootScope, $http, $window, $uibModal, $location) {
		// the only terms we are accepting for prototype
		var validTerms = ['seafood', 'fish', 'cod', 'grouper', 'haddock', 'halibut', 'salmon'];

		// var to determine if search term matches the prototype
		$scope.isMatch = false;

		(function init() {
			$window.sessionStorage.setItem('path', 'home');
			determineMatch();
		})();

		function determineMatch() {
			var searchTerm = $window.sessionStorage.getItem('search') || '';
			var searchTerms = searchTerm.split(' ');

			_.each(searchTerms, function(term) {
				if (validTerms.includes(term.toLowerCase())) {
					$scope.isMatch = true;
				} else {
					$scope.isMatch = false;
				}
			});
		}

		$scope.openShelf = function() {
			$location.path('/shelf');
		}

		$scope.$on('searchUpdated', function(event, args) {
			determineMatch();
		});
	}]);