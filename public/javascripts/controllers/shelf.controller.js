angular.module('websiteApp')
.controller('shelfController', ['$scope', '$rootScope', '$http', '$window',
	function($scope, $rootScope, $http, $window) {
		$scope.name = $window.sessionStorage.getItem('name') || "";
		$scope.email = $window.sessionStorage.getItem('email') || "";
		$scope.message = $window.sessionStorage.getItem('message') || "";
		$scope.showErrors = false;
		$scope.showSuccess = false;
		$scope.didUserSubmit = false;

		$scope.updateName = function() {
			$window.sessionStorage.setItem('name', $scope.name);
		}

		$scope.updateEmail = function() {
			$window.sessionStorage.setItem('email', $scope.email);
		}

		$scope.updateMessage = function() {
			$window.sessionStorage.setItem('message', $scope.message);
		}

		$scope.submit = function() {
			$scope.didUserSubmit = true;
			var request = {
				name: $scope.name,
				email: $scope.email,
				message: $scope.message
			};

			$http.post('/contact/email', request).success(function(data) {
				if (data.state === "success") {
					$scope.showSuccess = true;
					$window.sessionStorage.clear();
				} else {
					$scope.showErrors = true;
				}

				$scope.didUserSubmit = false;
			});
		}
	}]);