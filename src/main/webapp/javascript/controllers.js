let urlPrefix = "http://localhost:8080/QACBank/rest";

angular.module('app')
    .controller('loginController',function($scope,$http,$location,$timeout,$state){
        $scope.attempts = 0;
        $scope.username = "";
        $scope.password = "";

        $scope.goToRegister = function(){
            $state.go('createCustomer');
        };

        $scope.validateLogin = function(){
            if($scope.attempts === 3){
                window.alert("You have been locked out. Come back in 5 minutes");
                $timeout(function(){
                    $scope.attempts = 0;
                },30); //Someone make this better
                return false;
            }
            if($scope.username === ""){
                window.alert("Username can't be empty");
                return false;
            }
            else if($scope.password === ""){
                window.alert("Password can't be empty");
                return false;
            }
        };

        $scope.signIn = function(){
            $http.put(urlPrefix + $location.url(), {userName: $scope.username, password: $scope.password}).then(function(response){
                $scope.customer = response.data;
                if($scope.customer.result === 'fail'){
                    console.log($scope.customer);
                    $scope.attempts+=1;
                    $state.go('login');
                }
                else if($scope.customer.result !== 'fail'){
                    console.log($scope.customer);
                    $location.path('/customer/' + $scope.customer.result + '/accounts');
                }
            })
        };
    })
    .controller('createCustomerController',function($scope,$http,$location,$state) {
        $scope.username = "";
        $scope.password = "";
        $scope.checkPwd = "";
        $scope.firstname = "";
        $scope.surname = "";

        $scope.log = function(){
          console.log('Running sign in protocol');
          console.log('For username: ' + $scope.username);
        };

        $scope.validateRegistration = function(){
            if($scope.username === ""){
                window.alert("Username can't be empty");
                console.log("Invalid: Username was empty");
                return false;
            }
            else if($scope.password === ""){
                window.alert("Password can't be empty");
                console.log("Invalid: Password was empty");
                return false;
            }
            else if ($scope.checkPwd === ""){
                window.alert("Must enter the same password in both fields");
                console.log("Invalid: Check password mismatch");
                return false;
            }
            else if ($scope.username !== ""){
                if($scope.checkUniqueUsername()){
                }
                else{
                    return false;
                }
            }
        };

        $scope.checkUniqueUsername = function () {
            $http.put(urlPrefix + $location.url(),{userName: $scope.username}).then(function(response){
                $scope.resData = response.data;
                console.log($scope.resData.result);
                if ($scope.resData.result === 'fail'){
                    window.alert("Username is taken, try a different one");
                    console.log("Username in use");
                    return false;
                }
                else if ($scope.resData.result === 'unique'){
                    console.log("valid username");
                    console.log("Valid: Starting customer creation");
                    $scope.createCustomer();
                	return true;
                }
            });
        };

        $scope.createCustomer = function(){
            $http.post(urlPrefix + $location.url(),{
                firstName: $scope.firstname,
                secondName: $scope.surname,
                userName: $scope.username,
                password: $scope.password}).then(function(response){
                $scope.responseData = response.data;
                console.log($scope.responseData.result);
                if ($scope.responseData.result !== 'run'){
                    console.log('failed to create');
                    $state.go('login');
                }
                else if ($scope.responseData.result === 'run') {
                    console.log('created customer')
                }
            });
        };
    })
    .controller('accountsController',function($scope,$http,$location,$state,logout){
        $scope.accountList=[];
      	(function(){
            $http.get(urlPrefix + $location.url()).then(function(response){
                $scope.accountList = response.data;
                console.log($scope.accountList);
            });
        }());

        $scope.signOut = function(){
            logout();
        };

        $scope.removeAccount = function(account){
            $http.delete(urlPrefix + $location.url() + "/" + account.ACC_ID).then(function(response){
            	$scope.deleteResult=response.data;
            	console.log($scope.deleteResult);
            });
            $scope.accountList.splice($scope.accountList.indexOf(account),1);
        };

        $scope.addAccount = function(){
            //placeholder - POST - also requires new view for add form
        };

        $scope.viewAccount = function(){
            //placeholder - PUT - accountView({id:account.id})
        }
    })
    .controller('accountController',function($scope,$http,$location,$state,logout){
       $scope.getTransactions = function(){
           //placeholder - GET
       };

       $scope.transactions = getTransactions();

       $scope.signOut = function(){
           logout();
       };

       $scope.mapTransactions = function(){
           //placeholder ----- this is the map API. Good luck
       };

       $scope.balancePlotTransactions = function(){
           //placeholder ----- this where google charts magic is done
       };
    });