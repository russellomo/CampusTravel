angular.module('app.controllers', [])
  
.controller('homeCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('agentBookingsCtrl', ['$scope', '$stateParams', 'GetAgentBookings', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, GetAgentBookings) {
  GetAgentBookings.getPost()
  .then(function(response) {
    $scope.post = response;
    $scope.bookings =  $scope.post.records;
  });


}])
   
.controller('salesCtrl', ['$scope', '$stateParams', 'GetSales', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, GetSales) {
  GetSales.getPost()
  .then(function(response) {
    $scope.post = response;
    $scope.sales =  $scope.post.records;
  });


}])
      
.controller('addAgentCtrl', ['$scope', '$stateParams', 'GetOffices', 'AddAgent', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, GetOffices, AddAgent) {

  $scope.offices = [];    

  $scope.data = {};

  $scope.addAgent = function(){
    var agent = $scope.data.agent;
    var office = $scope.data.office;
    $scope.hideButton=true;

    AddAgent.getPost(agent, office) 
    .then(function(response) {
      $scope.post = response;
     });
  };

  GetOffices.getPost()
  .then(function(response) {
    $scope.post = response;
    $scope.offices =  $scope.post.records;
	$scope.offices.unshift({ "OfficeID": 0, "OfficeLocation": "--- Select Office Location ---" });
	$scope.data.office=0;
  });


}])
   
.controller('addSaleCtrl', ['$scope', '$stateParams', 'GetAgents', 'GetDestinations', 'AddSale', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, GetAgents, GetDestinations, AddSale) {

  $scope.destinations = [];    
  $scope.agents = [];    

  $scope.data = {};

  $scope.addSale = function(){
    var agent = $scope.data.agent;
    var destination = $scope.data.destination;
    var s = $scope.data.saleDate;
    var m = s.getMonth()+1;
    var d = s.getDate();
    m = '0'+m; m = m.substr(-2,2);
    d = '0'+d; d = d.substr(-2,2);
    var saleDate = s.getFullYear()+'-'+m+'-'+d;
    var amount = $scope.data.amount;
    $scope.hideButton=true;

    AddSale.getPost(agent, saleDate, amount, destination) 
    .then(function(response) {
      $scope.post = response;
     });
  };

  GetAgents.getPost()
  .then(function(response) {
    $scope.post = response;
    $scope.agents =  $scope.post.records;
	$scope.agents.unshift({ "AgentID": 0, "AgentName": "--- Select Agent ---" });
	$scope.data.agent=0;
  });

  GetDestinations.getPost()
  .then(function(response) {
    $scope.post = response;
    $scope.destinations =  $scope.post.records;
	$scope.destinations.unshift({ "DestinationID": 0, "DestinationName": "--- Select Destination ---" });
	$scope.data.destination=0;
  });


}])
   
.controller('searchSalesCtrl', ['$scope', '$stateParams', 'GetAgents', 'GetDestinations', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, GetAgents, GetDestinations) {

  $scope.destinations = [];    
  $scope.agents = [];    

  $scope.data = {};

  GetAgents.getPost()
  .then(function(response) {
    $scope.post = response;
    $scope.agents =  $scope.post.records;
	$scope.agents.unshift({ "AgentID": 0, "AgentName": "--- Select Agent ---" });
	$scope.data.agent=0;
  });

  GetDestinations.getPost()
  .then(function(response) {
    $scope.post = response;
    $scope.destinations =  $scope.post.records;
	$scope.destinations.unshift({ "DestinationID": 0, "DestinationName": "--- Select Destination ---" });
	$scope.data.destination=0;
  });


}])
   
.controller('searchResultsCtrl', ['$scope', '$stateParams', 'SearchSales', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, SearchSales) {

  $scope.data = { 
	  "agent": $stateParams.agent,
	  "destination": $stateParams.destination,
	  "above": $stateParams.above,
	  "below": $stateParams.below
  };

  var criteria = '';
  if($scope.data.agent > 0) criteria += ", AgentID = "+$scope.data.agent;
  if($scope.data.destination > 0) criteria += ", DestinationID = "+$scope.data.destination;
  if($scope.data.above > 0) criteria += ", Amounts Above $"+$scope.data.above;
  if($scope.data.below > 0) criteria += ", Amounts Below $"+$scope.data.below;

  $scope.data.criteria = criteria.substr(2);

  SearchSales.getPost($scope.data.agent, $scope.data.destination, $scope.data.above, $scope.data.below)
  .then(function(response) {
    $scope.post = response;
    $scope.sales =  $scope.post.records;
  });


}])
   
.controller('updateSaleCtrl', ['$scope', '$stateParams', 'GetAgents', 'GetDestinations', 'GetSale', 'DeleteSale', 'UpdateSale', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, GetAgents, GetDestinations, GetSale, DeleteSale, UpdateSale) {

  $scope.destinations = [];    
  $scope.agents = [];
  $scope.sale = {};

  $scope.data = { "saleId": $stateParams.saleId };

  GetAgents.getPost()
  .then(function(response) {
    $scope.post = response;
    $scope.agents =  $scope.post.records;
  });

  GetDestinations.getPost()
  .then(function(response) {
    $scope.post = response;
    $scope.destinations =  $scope.post.records;
  });

  var saleId;
  var original_AgentKey;
  var original_SaleDate;
  var original_Amount;
  var original_DestinationKey;


  GetSale.getPost($scope.data.saleId)
  .then(function(response) {
    $scope.post = response;
    $scope.sale =  $scope.post.records[0];
	SetVariables();
  });

  SetVariables = function(){
    $scope.data.agentName=$scope.sale.AgentName;
    $scope.data.agentKey=$scope.sale.AgentKey;
    $scope.data.destinationKey=$scope.sale.DestinationKey;
    $scope.data.destinationName=$scope.sale.DestinationName;

    $scope.data.saleDate=new Date(parseInt($scope.sale.SaleTime));

    $scope.data.amount=parseFloat($scope.sale.Amount);
    saleId = $scope.sale.SaleID;
    original_AgentKey = $scope.sale.AgentKey;
    original_SaleDate = $scope.sale.SaleDate;
    original_Amount = $scope.sale.Amount;
    original_DestinationKey = $scope.sale.DestinationKey;
  };

  $scope.agentChanged = function(){
	alert("AgentID was changed to "+$scope.data.agent);
  }

  $scope.deleteSale = function(){
    if(confirm("Are you sure you want to delete this sale?"))
    {
      $scope.hideDeleteButton=true;
	  $scope.hideUpdateForm=true;

      DeleteSale.getPost(saleId, original_AgentKey, original_SaleDate, original_Amount, original_DestinationKey) 
      .then(function(response) {
        $scope.post = response;
       });
	}
  };

  $scope.updateSale = function(){

    var s = $scope.data.saleDate;
    var m = s.getMonth()+1;
    var d = s.getDate();
    m = '0'+m; m = m.substr(-2,2);
    d = '0'+d; d = d.substr(-2,2);
    var saleDate = s.getFullYear()+'-'+m+'-'+d;

    UpdateSale.getPost(saleId, original_AgentKey, original_SaleDate, original_Amount, original_DestinationKey, 
      $scope.data.agentKey, saleDate, $scope.data.amount, $scope.data.destinationKey) 
    .then(function(response) {
      $scope.post = response;
      $scope.sale =  $scope.post.SaleRecord;
	  SetVariables();
     });
  };


}])
 