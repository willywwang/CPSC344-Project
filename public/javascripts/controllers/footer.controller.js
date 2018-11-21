angular.module('websiteApp')
.controller('footerController', ['$scope', '$rootScope', '$http', '$window', '$uibModal', '$location', 'toaster',
	function($scope, $rootScope, $http, $window, $uibModal, $location, toaster) {
		$scope.comparisonOn = true;

		var items = {
			cod: {
				title: 'Cod',
				source: '/graphics/Fish/fish-wbg/cod.jpg',
				search: 'Cod'
			},
			grouper: {
				title: 'Grouper',
				source: '/graphics/Fish/fish-wbg/grouper.jpg',
				search: 'Grouper'
			},
			halibut: {
				title: 'Halibut',
				source: '/graphics/Fish/fish-wbg/halibut.jpg',
				search: 'Halibut'
			},
			haddock: {
				title: 'Haddock',
				source: '/graphics/Fish/fish-wbg/haddock.jpg',
				search: 'Haddock'
			},
			salmon: {
				title: 'Salmon',
				source: '/graphics/Fish/fish-wbg/Salmon.jpg',
				search: 'Salmon'
			},
			campbellbeef: {
				title: 'Campbell\'s Beef Stock',
				source: '/graphics/stock_broth/stock-wbg/campbellbeef.jpg',
				search: 'CampbellBeef'
			},
			kitchenchicken: {
				title: 'Kitchen Basics Chicken Stock',
				source: '/graphics/stock_broth/stock-wbg/kitchenchicken.jpg',
				search: 'KitchenChicken'
			},
			swansonbeef: {
				title: 'Swanson Beef Stock',
				source: '/graphics/stock_broth/stock-wbg/swansonbeef.jpg',
				search: 'SwansonBeef'
			},
			swansonchicken: {
				title: 'Swanson Chicken Broth',
				source: '/graphics/stock_broth/stock-wbg/swansonchicken.jpg',
				search: 'SwansonChicken'
			},
			vegetable: {
				title: 'Pacific Vegetable Broth',
				source: '/graphics/stock_broth/stock-wbg/vegetable.jpg',
				search: 'Vegetable'
			}
		};

		($scope.init = function() {
			findItems();

			var comparison = $window.sessionStorage.getItem('comparison');

			if (!comparison) {
				$scope.comparisonOn = false;
			}
		})();

		$scope.removeItem = function(item) {
			$window.sessionStorage.removeItem('compare' + item.search);

			toaster.pop({
				type: 'info',
				body: item.title + ' removed from comparison'
			});

			$rootScope.$broadcast('comparisonUpdated');
		}

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
				var item = items[key]
				$window.sessionStorage.removeItem('compare' + item.search);
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
				var object = items[key];
				var item = $window.sessionStorage.getItem('compare' + object.search);

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