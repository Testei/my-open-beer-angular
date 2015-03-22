module.exports=function($scope,config,$location,rest,save,$document,modalService, $controller){
$controller('BeerDetailController', {$scope: $scope});

	if(angular.isUndefined(config.activeBeer)){
		$location.path("beers/");
	}
	$scope.activeBeer=config.activeBeer;
	
	$scope._details=function(beer,force,callback){
		var result=false;
		if(force || $scope.detailsBeer.$dirty){
			if(angular.isUndefined(beer)){
				beer=$scope.activeBeer;
			}else{
				config.activeBeer=angular.copy(beer);
				config.activeBeer.reference=beer;
			}
			$scope.data.posted={
			    "name" : beer.name,
			    "description"  : beer.description
			};
			
			config.activeBeer.reference.name=$scope.activeBeer.name;
			config.activeBeer.reference.description=$scope.activeBeer.description;
			
		}else{
			result=true;
		}
		return result;
	}
};