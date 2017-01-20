angular.module('app.services', [])


.service('GetAgentBookings', function($http) {
  return {
    getPost: function() {
      var columns="AgentName, OfficeLocation, SUM(1) AS NumSales, SUM(IF(Amount IS NOT NULL,Amount,0)) AS Total";
      var table=encodeURIComponent("AGENT LEFT JOIN SALE ON AgentKey=AgentID LEFT JOIN OFFICE ON OfficeKey=OfficeID");
      var group="AgentID";
      var order="Total DESC";
      var query = '?columns='+columns;
      query += '&table='+table;
      query += '&group='+group;
      query += '&order='+order;

      return $http.get('https://secrdir.com/rao642.ics415.com/campus_api/list.php'+query)
      .then(function (response) {
        return response.data;
      });
    }
  };
})

.service('GetSales', function($http) {
  return {
    getPost: function() {
      var columns = "SaleID, SaleDate, UNIX_TIMESTAMP(SaleDate)*1000 AS SaleTime, AgentKey, Amount, DestinationKey";
	  columns += ", AgentName, OfficeKey, OfficeLocation, DestinationName";
	  var tab = "SALE INNER JOIN AGENT ON AgentKey=AgentID INNER JOIN OFFICE ON OfficeKey=OfficeID ";
	  tab += " INNER JOIN DESTINATION ON DestinationKey=DestinationID";
      var table = encodeURIComponent(tab);
      var order="SaleID DESC";

      var query = '?columns='+columns;
      query += '&table='+table;
      query += '&order='+order;

      return $http.get('https://secrdir.com/rao642.ics415.com/campus_api/list.php'+query)
      .then(function (response) {
        return response.data;
      });
    }
  };
})

.service('GetOffices', function($http) {
  return {
    getPost: function() {

      var query = '?table=OFFICE&order=OfficeLocation';

      return $http.get('https://secrdir.com/rao642.ics415.com/campus_api/list.php'+query)
      .then(function (response) {
        return response.data;
      });
    }
  };
})

.service('GetAgents', function($http) {
  return {
    getPost: function() {

      var query = '?table=AGENT&order=AgentName';

      return $http.get('https://secrdir.com/rao642.ics415.com/campus_api/list.php'+query)
      .then(function (response) {
        return response.data;
      });
    }
  };
})

.service('GetDestinations', function($http) {
  return {
    getPost: function() {

      var query = '?table=DESTINATION&order=DestinationName';

      return $http.get('https://secrdir.com/rao642.ics415.com/campus_api/list.php'+query)
      .then(function (response) {
        return response.data;
      });
    }
  };
})

.service('AddAgent', function($http) {
  return {
    getPost: function(agent,office) {
      var query = '?AgentName='+agent;
      query += '&OfficeKey='+office;
      return $http.get('https://secrdir.com/rao642.ics415.com/campus_api/add_agent.php'+query)
      .then(function (response) {
        return response.data;
      });
    }
  };
})

.service('AddSale', function($http) {
  return {
    getPost: function(agent,saleDate,amount,destination) {
      var query = '?AgentKey='+agent;
      query += '&DestinationKey='+destination;
      query += '&Amount='+amount;
      query += '&SaleDate='+saleDate;
      return $http.get('https://secrdir.com/rao642.ics415.com/campus_api/add_sale.php'+query)
      .then(function (response) {
        return response.data;
      });
    }
  };
})

.service('SearchSales', function($http) {
  return {
    getPost: function(agent, destination, amountsAbove, amountsBelow) {
      var columns = "SaleID, SaleDate, UNIX_TIMESTAMP(SaleDate)*1000 AS SaleTime, AgentKey, Amount, DestinationKey";
	  columns += ", AgentName, OfficeKey, OfficeLocation, DestinationName";
	  var tab = "SALE INNER JOIN AGENT ON AgentKey=AgentID INNER JOIN OFFICE ON OfficeKey=OfficeID ";
	  tab += " INNER JOIN DESTINATION ON DestinationKey=DestinationID";
      var table = encodeURIComponent(tab);
      var order="SaleID DESC";
      var query = '?columns='+columns;
      query += '&table='+table;
      query += '&order='+order;

	  var where = "";
	  if(agent > 0 ) { where += " AND AgentKey="+agent ; }
	  if(destination > 0 ) { where += " AND DestinationKey="+destination ; }
	  if(amountsAbove > 0 ) { where += " AND Amount>='"+amountsAbove+"'" ; }
	  if(amountsBelow > 0 ) { where += " AND Amount<='"+amountsBelow+"'" ; }
	  if(where>'') {
		  where = where.substr(4) ;
		  where=encodeURIComponent(where);
		  query += '&where='+where ;
      }
      return $http.get('https://secrdir.com/rao642.ics415.com/campus_api/list.php'+query)
      .then(function (response) {
        return response.data;
      });
    }
  };
})

.service('GetSale', function($http) {
  return {
    getPost: function(saleId) {
      var columns = "SaleID, SaleDate, UNIX_TIMESTAMP(SaleDate)*1000 AS SaleTime, AgentKey, Amount, DestinationKey";
	  columns += ", AgentName, OfficeKey, OfficeLocation, DestinationName";
	  var tab = "SALE INNER JOIN AGENT ON AgentKey=AgentID INNER JOIN OFFICE ON OfficeKey=OfficeID ";
	  tab += " INNER JOIN DESTINATION ON DestinationKey=DestinationID";
      var table = encodeURIComponent(tab);

      var query = '?columns='+columns;
      query += '&table='+table;
      query += '&where='+encodeURIComponent("SaleID=" + saleId);

      return $http.get('https://secrdir.com/rao642.ics415.com/campus_api/list.php'+query)
      .then(function (response) {
        return response.data;
      });
    }
  };
})


.service('DeleteSale', function($http) {
  return {
    getPost: function(saleId, originalAgent, originalSaleDate, originalAmount, originalDestination) {
      var query = '?SaleID='+saleId;
      query += '&Original_AgentKey='+originalAgent;
      query += '&Original_DestinationKey='+originalDestination;
      query += '&Original_Amount='+originalAmount;
      query += '&Original_SaleDate='+originalSaleDate;

	  return $http.get('https://secrdir.com/rao642.ics415.com/campus_api/delete_sale.php'+query)
      .then(function (response) {
        return response.data;
      });
    }
  };
})


.service('UpdateSale', function($http) {
  return {
    getPost: function(saleId, originalAgent, originalSaleDate, originalAmount, originalDestination, 
		agent, saleDate, amount, destination) {
      var query = '?SaleID='+saleId;
      query += '&Original_AgentKey='+originalAgent;
      query += '&Original_DestinationKey='+originalDestination;
      query += '&Original_Amount='+originalAmount;
      query += '&Original_SaleDate='+originalSaleDate;
	  var changes = 0;
      if(agent != originalAgent) { query += '&AgentKey='+agent; changes += 1; }
      if(destination != originalDestination) { query += '&DestinationKey='+destination; changes += 1; }
      if(amount != originalAmount) { query += '&Amount='+amount; changes += 1; }
      if(saleDate != originalSaleDate) { query += '&SaleDate='+saleDate; changes += 1; }
	  if( changes == 0 )
      {
        var message = { "message" : "Nothing to update" };
        return message;
      }
      else
      {
		  return $http.get('https://secrdir.com/rao642.ics415.com/campus_api/update_sale.php'+query)
		  .then(function (response) {
			return response.data;
		  });
	  }
    }
  };
})

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}]);