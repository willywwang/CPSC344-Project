angular.module('websiteApp')
.controller('comparisonController', ['$scope', '$rootScope', '$http', '$window', '$uibModal', '$location',
	function($scope, $rootScope, $http, $window, $uibModal, $location) {
		var items = {
			Cod: {
				title: 'Cod',
				price: '$3.99/lb',
				origin: 'Norway',
				description: 'Fillet, fresh',
				source: '/images/cod.jpg'
			},
			Grouper: {
				title: 'Grouper',
				price: '$9.99/lb',
				origin: 'Australia',
				description: 'Whole, gutted, fresh',
				source: '/images/grouper.jpg'
			},
			Halibut: {
				title: 'Halibut',
				price: '$15.99/lb',
				origin: 'Alaska',
				description: 'Fillet, fresh',
				source: '/images/halibut.jpg'
			},
			Haddock: {
				title: 'Haddock',
				price: '$12.99/lb',
				origin: 'Russia',
				description: 'Fillet, frozen',
				source: '/images/haddock.jpg'
			},
			Salmon: {
				title: 'Salmon',
				price: '$11.99/lb',
				origin: 'Victoria',
				description: 'Whole, fresh',
				source: '/images/salmon.jpg'
			}
		};

		($scope.init = function() {
			var lastPath = $window.sessionStorage.getItem('path');
			$rootScope.$broadcast('comparisonOpened');
		})();
	}]);