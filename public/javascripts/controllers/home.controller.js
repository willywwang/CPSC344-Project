angular.module('websiteApp')
.controller('homeController', ['$scope', '$rootScope', '$http', '$window', '$uibModal', '$location',
	function($scope, $rootScope, $http, $window, $uibModal, $location) {
		// the only terms we are accepting for prototype
		var validTerms = ['seafood', 'fish', 'cod', 'grouper'];

		// var to determine if search term matches the prototype
		$scope.isMatch = false;

		$scope.openShelf = function() {
			$location.path('/shelf');
		}

		$scope.$on('searchUpdated', function(event, args) {
			var searchTerms = args.searchTerm.split(' ');
			_.each(searchTerms, function(term) {
				if (validTerms.includes(term.toLowerCase())) {
					$scope.isMatch = true;
				} else {
					$scope.isMatch = false;
				}
			});
		});
	}]);