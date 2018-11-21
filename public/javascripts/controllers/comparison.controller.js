angular.module('websiteApp')
.controller('comparisonController', ['$scope', '$rootScope', '$http', '$window', '$uibModal', '$location', 'toaster',
	function($scope, $rootScope, $http, $window, $uibModal, $location, toaster) {
		$scope.categories = [
		{
			title: 'Date Caught',
			property: 'date',
			label: 'Date Caught'
		},
		{
			title: 'Origin',
			property: 'origin',
			label: 'Origin'
		},
		{
			title: 'Price per Weight',
			property: 'price',
			label: 'Price per Weight'
		},
		{
			title: 'Oceanwise',
			property: 'oceanwise',
			isBoolean: true,
			label: 'Oceanwise'
		},
		{
			title: 'Fresh',
			property: 'fresh',
			isBoolean: true,
			label: 'Fresh'
		}];

		$scope.selectedCategories = angular.copy($scope.categories);

		var items = {
			Cod: {
				title: 'Cod',
				price: '$3.99/lb',
				origin: 'Norway',
				description: 'Fillet, fresh',
				source: '/graphics/Fish/fish-wbg/cod.jpg',
				date: '11/11/2018',
				oceanwise: true,
				fresh: true,
				search: 'Cod'
			},
			Grouper: {
				title: 'Grouper',
				price: '$9.99/lb',
				origin: 'Australia',
				description: 'Whole, gutted, fresh',
				source: '/graphics/Fish/fish-wbg/grouper.jpg',
				date: '11/12/2018',
				oceanwise: false,
				fresh: true,
				search: 'Grouper'
			},
			Halibut: {
				title: 'Halibut',
				price: '$15.99/lb',
				origin: 'Alaska',
				description: 'Fillet, fresh',
				source: '/graphics/Fish/fish-wbg/halibut.jpg',
				date: '11/13/2018',
				oceanwise: true,
				fresh: true,
				search: 'Halibut'
			},
			Haddock: {
				title: 'Haddock',
				price: '$12.99/lb',
				origin: 'Russia',
				source: '/graphics/Fish/fish-wbg/haddock.jpg',
				date: '10/25/2018',
				oceanwise: true,
				fresh: false,
				search: 'Haddock'
			},
			Salmon: {
				title: 'Salmon',
				price: '$11.99/lb',
				origin: 'Victoria',
				description: 'Whole, fresh',
				source: '/graphics/Fish/fish-wbg/salmon.jpg',
				date: '11/11/2018',
				oceanwise: false,
				fresh: true,
				search: 'Salmon'
			},
			CampbellBeef: {
				title: 'Campbell\'s Beef Stock',
				price: '$3.39',
				volume: '900 mL',
				description: 'Beef stock, low sodium',
				source: '/graphics/stock_broth/stock-wbg/campbellbeef.jpg',
				search: 'CampbellBeef'
			},
			KitchenChicken: {
				title: 'Kitchen Basics Chicken Stock',
				price: '$4.49',
				volume: '946 mL',
				description: 'Chicken stock',
				source: '/graphics/stock_broth/stock-wbg/kitchenchicken.jpg',
				search: 'KitchenChicken'
			},
			SwansonBeef: {
				title: 'Swanson Beef Stock',
				price: '$3.99',
				volume: '907 mL',
				description: 'Beef stock, low sodium',
				source: '/graphics/stock_broth/stock-wbg/swansonbeef.jpg',
				search: 'SwansonBeef'
			},
			SwansonChicken: {
				title: 'Swanson Chicken Broth',
				price: '$3.29',
				volume: '907 mL',
				description: 'Chicken stock',
				source: '/graphics/stock_broth/stock-wbg/swansonchicken.jpg',
				search: 'SwansonChicken'
			},
			Vegetable: {
				title: 'Pacific Vegetable Broth',
				price: '$4.99',
				volume: '946 mL',
				description: 'Vegetable stock, organic, low sodium',
				source: '/graphics/stock_broth/stock-wbg/vegetable.jpg',
				search: 'Vegetable'
			}
		};

		($scope.init = function() {
			$scope.pathName = $window.sessionStorage.getItem('path');

			if ($scope.pathName === 'Store Map') {
				$scope.path = '/';
			} else {
				$scope.path = '/shelf';
			}

			findItems();
			$rootScope.$broadcast('comparisonOpened');
		})();

		$scope.changeQuantity = function(operation, item) {
			if (operation === '-') {
				item.quantity--;
				$rootScope.$broadcast('shoppingCartRemove');
				toaster.pop({
					type: 'info',
					body: item.title + ' removed from cart'
				});
			} else {
				item.quantity++;
				$rootScope.$broadcast('shoppingCartAdd');
				toaster.pop({
					type: 'info',
					body: item.title + ' added to cart'
				});
			}

			$window.sessionStorage.setItem(item.title.toLowerCase(), item.quantity);
		}

		$scope.removeItem = function(item) {
			$window.sessionStorage.removeItem('compare' + item.title);
			findItems();

			toaster.pop({
				type: 'info',
				body: item.title + ' removed from comparison'
			});

			$rootScope.$broadcast('comparisonUpdated');
		}
		function findItems() {
			$scope.items = [];

			Object.keys(items).forEach(function(key) {
				var item = $window.sessionStorage.getItem('compare' + key);
				var quantity = $window.sessionStorage.getItem(key.toLowerCase()) || '0';

				if (item) {
					items[key].quantity = parseInt(quantity);
					$scope.items.push(items[key]);
				}
			});
		}

		$scope.$on('comparisonCleared', function(event, args) {
			$scope.items = [];
			$window.location.href = '/';
		});
	}]);