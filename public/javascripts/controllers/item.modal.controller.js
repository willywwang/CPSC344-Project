angular.module('websiteApp')
.controller('itemModalController', ['$scope', '$rootScope','$uibModal', '$uibModalInstance', '$http', '$window', 'toaster', 'item',
	function($scope, $rootScope, $uibModal, $uibModalInstance, $http, $window, toaster, item) {
		var items = {
			cod: {
				title: 'Cod',
				price: '$3.99/lb',
				origin: 'Norway',
				description: 'Fillet, fresh',
				source: '/graphics/Fish/fish-wbg/Cod.jpg',
				search: 'Cod'
			},
			grouper: {
				title: 'Grouper',
				price: '$9.99/lb',
				origin: 'Australia',
				description: 'Whole, gutted, fresh',
				source: '/graphics/Fish/fish-wbg/Grouper.jpg',
				search: 'Grouper'
			},
			halibut: {
				title: 'Halibut',
				price: '$15.99/lb',
				origin: 'Alaska',
				description: 'Fillet, fresh',
				source: '/graphics/Fish/fish-wbg/Halibut.jpg',
				search: 'Halibut'
			},
			haddock: {
				title: 'Haddock',
				price: '$12.99/lb',
				origin: 'Russia',
				description: 'Fillet, frozen',
				source: '/graphics/Fish/fish-wbg/Haddock.jpg',
				search: 'Haddock'
			},
			salmon: {
				title: 'Salmon',
				price: '$11.99/lb',
				origin: 'Victoria',
				description: 'Whole, fresh',
				source: '/graphics/Fish/fish-wbg/Salmon.jpg',
				search: 'Salmon'
			},
			campbellbeef: {
				title: 'Campbell\'s Beef Stock',
				price: '$3.39',
				volume: '900 mL',
				description: 'Beef stock, low sodium',
				source: '/graphics/Stock_Broth/stock-wbg/campbellbeef.jpg',
				search: 'CampbellBeef'
			},
			kitchenchicken: {
				title: 'Kitchen Basics Chicken Stock',
				price: '$4.49',
				volume: '946 mL',
				description: 'Chicken stock',
				source: '/graphics/Stock_Broth/stock-wbg/kitchenchicken.jpg',
				search: 'KitchenChicken'
			},
			swansonbeef: {
				title: 'Swanson Beef Stock',
				price: '$3.99',
				volume: '907 mL',
				description: 'Beef stock, low sodium',
				source: '/graphics/Stock_Broth/stock-wbg/swansonbeef.jpg',
				search: 'SwansonBeef'
			},
			swansonchicken: {
				title: 'Swanson Chicken Broth',
				price: '$3.29',
				volume: '907 mL',
				description: 'Chicken stock',
				source: '/graphics/Stock_Broth/stock-wbg/swansonchicken.jpg',
				search: 'SwansonChicken'
			},
			vegetable: {
				title: 'Pacific Vegetable Broth',
				price: '$4.99',
				volume: '946 mL',
				description: 'Vegetable stock, organic, low sodium',
				source: '/graphics/Stock_Broth/stock-wbg/vegetable.jpg',
				search: 'Vegetable'
			}
		};

		(function init() {
			$scope.item = items[item];
			var quantity = $window.sessionStorage.getItem(item) || '0';
			$scope.item.quantity = parseInt(quantity);

			var isCompared = $window.sessionStorage.getItem('compare' + $scope.item.search);

			if (isCompared) {
				$scope.isCompared = true;
			}
		})();

		$scope.changeQuantity = function(operation) {
			if (operation === '-') {
				$scope.item.quantity--;
				$window.sessionStorage.setItem(item, $scope.item.quantity);
				$rootScope.$broadcast('shoppingCartRemove');
				toaster.pop({
					type: 'success',
					body: $scope.item.title + ' removed from cart'
				});
			} else {
				$scope.item.quantity++;
				$window.sessionStorage.setItem(item, $scope.item.quantity);
				$rootScope.$broadcast('shoppingCartAdd');
				toaster.pop({
					type: 'success',
					body: $scope.item.title + ' added to cart'
				});
			}
		}

		$scope.updateComparison = function() {
			if ($scope.isCompared) {
				$window.sessionStorage.setItem('compare' + $scope.item.search, true);
				toaster.pop({
					type: 'success',
					body: $scope.item.title + ' added to comparison'
				});
			} else {
				$window.sessionStorage.removeItem('compare' + $scope.item.search);
				toaster.pop({
					type: 'success',
					body: $scope.item.title + ' removed from comparison'
				});
			}

			$rootScope.$broadcast('comparisonUpdated');
		}

		$scope.close = function() {
			$uibModalInstance.close();
		};
	}]);