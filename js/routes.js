angular.module('app.routes', ['ionicUIRouter'])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('campusTravel.home', {
    url: '/page2',
    views: {
      'tab1': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='campusTravel.agentBookings'
      2) Using $state.go programatically:
        $state.go('campusTravel.agentBookings');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab1/page3
      /page1/tab2/page3
  */
  .state('campusTravel.agentBookings', {
    url: '/page3',
    views: {
      'tab1': {
        templateUrl: 'templates/agentBookings.html',
        controller: 'agentBookingsCtrl'
      },
      'tab2': {
        templateUrl: 'templates/agentBookings.html',
        controller: 'agentBookingsCtrl'
      }
    }
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='campusTravel.sales'
      2) Using $state.go programatically:
        $state.go('campusTravel.sales');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab1/page4
      /page1/tab3/page4
  */
  .state('campusTravel.sales', {
    url: '/page4',
    views: {
      'tab1': {
        templateUrl: 'templates/sales.html',
        controller: 'salesCtrl'
      },
      'tab3': {
        templateUrl: 'templates/sales.html',
        controller: 'salesCtrl'
      }
    }
  })

  .state('campusTravel', {
    url: '/page1',
    templateUrl: 'templates/campusTravel.html',
    abstract:true
  })

  .state('campusTravel.addAgent', {
    url: '/page5',
    views: {
      'tab1': {
        templateUrl: 'templates/addAgent.html',
        controller: 'addAgentCtrl'
      }
    }
  })

  .state('campusTravel.addSale', {
    url: '/page6',
    views: {
      'tab1': {
        templateUrl: 'templates/addSale.html',
        controller: 'addSaleCtrl'
      }
    }
  })

  .state('campusTravel.searchSales', {
    url: '/page7',
    views: {
      'tab1': {
        templateUrl: 'templates/searchSales.html',
        controller: 'searchSalesCtrl'
      }
    }
  })

  .state('campusTravel.searchResults', {
    url: '/page8',
	params: {
		agent: "0",
		destination: "0",
		above: "0",
		below: "0"		
},
    views: {
      'tab1': {
        templateUrl: 'templates/searchResults.html',
        controller: 'searchResultsCtrl'
      }
    }
  })

  .state('campusTravel.updateSale', {
    url: '/page9',
	params: {
		saleId: "1"		
},
    views: {
      'tab1': {
        templateUrl: 'templates/updateSale.html',
        controller: 'updateSaleCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/page1/page2')

  

});