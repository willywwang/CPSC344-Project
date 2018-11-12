angular.module('websiteApp')
.controller('footerController', ['$scope', '$rootScope', '$http', '$window', '$uibModal', '$location', 'toaster',
	function($scope, $rootScope, $http, $window, $uibModal, $location, toaster) {
		$scope.comparisonOn = true;

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
			findItems();

			var comparison = $window.sessionStorage.getItem('comparison');

			if (!comparison) {
				$scope.comparisonOn = false;
			}
		})();

		$scope.toggleComparisons = function() {
			$scope.comparisonOn = !$scope.comparisonOn

			if ($scope.comparisonOn) {
				$window.sessionStorage.setItem('comparison', true);
			} else {
				$window.sessionStorage.removeItem('comparison');
			}
		}

		$scope.clearComparisons = function() {
			$scope.items = [];

			Object.keys(items).forEach(function(key) {
				$window.sessionStorage.removeItem('compare' + key);
			});

			toaster.pop({
				type: 'info',
				body: 'Comparisons removed'
			});
			$rootScope.$broadcast('comparisonCleared');
		}

		function findItems() {
			$scope.items = [];

			Object.keys(items).forEach(function(key) {
				var item = $window.sessionStorage.getItem('compare' + key);

				if (item) {
					$scope.items.push(items[key]);
				}
			});
		}

		$scope.$on('comparisonUpdated', function(event, args) {
			findItems();
		});

		$scope.$on('comparisonOpened', function(event, args) {
			$scope.comparisonOn = false;
		});
	}]);