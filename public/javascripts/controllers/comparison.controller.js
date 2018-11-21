angular.module('websiteApp')
.controller('comparisonController', ['$scope', '$rootScope', '$http', '$window', '$uibModal', '$location', 'toaster',
	function($scope, $rootScope, $http, $window, $uibModal, $location, toaster) {
		$scope.seafoodCategories = [
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

		$scope.canCategories = [
		{
			title: 'Price',
			property: 'price',
			label: 'Price'
		},
		{
			title: 'Brand',
			property: 'brand',
			label: 'Brand'
		},
		{
			title: 'Volume',
			property: 'volume',
			label: 'Volume'
		},
		{
			title: 'Organic',
			property: 'organic',
			label: 'Organic',
			isBoolean: true
		},
		{
			title: 'Low Sodium',
			property: 'lowSodium',
			label: 'Low Sodium',
			isBoolean: true
		},]

		$scope.selectedSeafoodCategories = angular.copy($scope.seafoodCategories);
		$scope.selectedCanCategories = angular.copy($scope.canCategories);

		var items = {
			Cod: {
				title: 'Cod',
				price: '$3.99/lb',
				origin: 'Norway',
				description: 'Fillet, fresh',
				source: '/graphics/Fish/fish-wbg/Cod.jpg',
				date: '11/11/2018',
				oceanwise: true,
				fresh: true,
				search: 'Cod',
				seafood: true,
				search: 'Cod'
			},
			Grouper: {
				title: 'Grouper',
				price: '$9.99/lb',
				origin: 'Australia',
				description: 'Whole, gutted, fresh',
				source: '/graphics/Fish/fish-wbg/Grouper.jpg',
				date: '11/12/2018',
				oceanwise: false,
				fresh: true,
				search: 'Grouper',
				seafood: true,
				search: 'Grouper'
			},
			Halibut: {
				title: 'Halibut',
				price: '$15.99/lb',
				origin: 'Alaska',
				description: 'Fillet, fresh',
				source: '/graphics/Fish/fish-wbg/Halibut.jpg',
				date: '11/13/2018',
				oceanwise: true,
				fresh: true,
				search: 'Halibut',
				seafood: true,
				search: 'Halibut'
			},
			Haddock: {
				title: 'Haddock',
				price: '$12.99/lb',
				origin: 'Russia',
				source: '/graphics/Fish/fish-wbg/Haddock.jpg',
				date: '10/25/2018',
				oceanwise: true,
				fresh: false,
				search: 'Haddock',
				seafood: true,
				search: 'Haddock'
			},
			Salmon: {
				title: 'Salmon',
				price: '$11.99/lb',
				origin: 'Victoria',
				description: 'Whole, fresh',
				source: '/graphics/Fish/fish-wbg/Salmon.jpg',
				date: '11/11/2018',
				oceanwise: false,
				fresh: true,
				search: 'Salmon',
				seafood: true,
				search: 'Salmon'
			},
			CampbellBeef: {
				title: 'Campbell\'s Beef Stock',
				price: '$3.39',
				volume: '900 mL',
				description: 'Beef stock, low sodium',
				source: '/graphics/Stock_Broth/stock-wbg/campbellbeef.jpg',
				search: 'CampbellBeef',
				seafood: false,
				brand: 'Campbell\'s',
				organic: false,
				lowSodium: true,
				search: 'CampbellBeef'
			},
			KitchenChicken: {
				title: 'Kitchen Basics Chicken Stock',
				price: '$4.49',
				volume: '946mL',
				description: 'Chicken stock',
				source: '/graphics/Stock_Broth/stock-wbg/kitchenchicken.jpg',
				search: 'KitchenChicken',
				seafood: false,
				brand: 'Kitchen Basics',
				organic: false,
				lowSodium: false,
				search: 'KitchenChicken'
			},
			SwansonBeef: {
				title: 'Swanson Beef Stock',
				price: '$3.99',
				volume: '907 mL',
				description: 'Beef stock, low sodium',
				source: '/graphics/Stock_Broth/stock-wbg/swansonbeef.jpg',
				search: 'SwansonBeef',
				seafood: false,
				brand: 'Swanson',
				organic: false,
				lowSodium: true,
				search: 'SwansonBeef'
			},
			SwansonChicken: {
				title: 'Swanson Chicken Broth',
				price: '$3.29',
				volume: '907 mL',
				description: 'Chicken stock',
				source: '/graphics/Stock_Broth/stock-wbg/swansonchicken.jpg',
				search: 'SwansonChicken',
				seafood: false,
				brand: 'Swanson',
				organic: false,
				lowSodium: false,
				search: 'SwansonChicken'
			},
			Vegetable: {
				title: 'Pacific Vegetable Broth',
				price: '$4.99',
				volume: '946 mL',
				description: 'Vegetable stock, organic, low sodium',
				source: '/graphics/Stock_Broth/stock-wbg/vegetable.jpg',
				search: 'Vegetable',
				seafood: false,
				brand: 'Pacific',
				organic: true,
				lowSodium: true,
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
				$window.sessionStorage.setItem(item, $scope.item.quantity);
				$rootScope.$broadcast('shoppingCartRemove');
				toaster.pop({
					type: 'info',
					body: item.title + ' removed from cart'
				});
			} else {
				item.quantity++;
				$window.sessionStorage.setItem(item, $scope.item.quantity);
				$rootScope.$broadcast('shoppingCartAdd');
				toaster.pop({
					type: 'info',
					body: item.title + ' added to cart'
				});
			}
		}

		$scope.removeItem = function(item) {
			$window.sessionStorage.removeItem('compare' + item.search);
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

					if (items[key].seafood) {
						$scope.compareSeafood = true;
					} else {
						$scope.compareCans = true;
					}
				}
			});
		}

		$scope.$on('comparisonCleared', function(event, args) {
			$scope.items = [];
			$window.location.href = '/';
		});
	}]);