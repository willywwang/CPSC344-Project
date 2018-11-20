angular.module('websiteApp')
.controller('homeController', ['$scope', '$rootScope', '$http', '$window', '$uibModal', '$location',
	function($scope, $rootScope, $http, $window, $uibModal, $location) {
		// the only terms we are accepting for prototype
		var seafoodTerms = ['cod', 'grouper', 'haddock', 'halibut', 'salmon'];
		var allTerms = ['seafood', 'fish'];

		// var to determine if search term matches the prototype
		$scope.isAllMatch = false;
		$scope.isSeafoodMatch = false;

		(function init() {
			$window.sessionStorage.setItem('path', 'home');
			determineMatch();
		})();

		function determineMatch() {
			var searchTerm = $window.sessionStorage.getItem('search') || '';
			var searchTerms = searchTerm.split(' ');

			$scope.isAllMatch = false;
			$scope.isSeafoodMatch = false;

			_.each(searchTerms, function(term) {
				if (seafoodTerms.includes(term.toLowerCase())) {
					$scope.isSeafoodMatch = true;
				} else if (allTerms.includes(term.toLowerCase())) {
					$scope.isAllMatch = true;
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