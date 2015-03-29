module.exports=function($scope,rest,$timeout,$location,config,$route,save) {
	/*
	 * Réalisé a partir du fichier breweriesController
	 */
	
	$scope.data={load:false};

	$scope.sortBy={field:"name",asc:false};
	
	$scope.messages=rest.messages;
	
	if(config.beers.refresh==="all" || !config.beers.loaded){
		$scope.data.load=true;
		rest.getAll($scope.data,"beers");
		config.beers.loaded=true;
	}else{
		$scope.data["beers"]=config.beers.all;
	}
	$scope.allSelected=false;
	
	$scope.selectAll=function(){
		angular.forEach($scope.data.beers, function(value, key) {
			value.selected=$scope.allSelected;
		});
	};
	
	$scope.refresh=function(){
		save.executeAll();
	}
	
	$scope.showUpdate=function(){
		return angular.isDefined($scope.activeBeer);
	};
	//Fonction rajouter pour voir les details de la bière activé
	$scope.showDetails=function(){
		return angular.isDefined($scope.activeBeer);
	};
	
	$scope.refreshOnAsk=function(){
		return config.beers.refresh == 'ask';
	};
	
	$scope.defferedUpdate=function(){
		return config.beers.update == 'deffered';
	};
	
	$scope.setActive=function(beer){
		if(beer!==$scope.activeBeer)
			$scope.activeBeer=beer;
		else
			$scope.activeBeer=undefined;
	};
	
	$scope.isActive=function(beer){
		return beer==$scope.activeBeer;
	};
	
	$scope.hasMessage=function(){
		return rest.messages.length>0;
	};
	
	$scope.readMessage=function(message){
		$timeout(function(){
			message.deleted=true;
		},5000);
		return true;
	}
	
	$scope.countSelected=function(){
		var result=0;
		angular.forEach($scope.data.beers, function(value, key) {
			if(value.selected && !value.deleted)
				result++;
		});
		return result;
	};
	
	$scope.hideDeleted=function(){
		$scope.mustHideDeleted=!$scope.mustHideDeleted;
		angular.forEach($scope.data.beers, function(value, key) {
			if($scope.mustHideDeleted){
				if(value.flag==='Deleted')
					value.deleted=true;
			}else{
				value.deleted=false;
			}
		});
	};
	
	$scope.edit=function(beer){
		if(angular.isDefined(beer))
			$scope.activeBeer=beer;
			config.activeBeer=angular.copy($scope.activeBeer);
			config.activeBeer.reference=$scope.activeBeer;
			$location.path("beers/update");
	}
	

	//même fonction que la fonction edit mais raméne à la vue details  au lieu de update
	$scope.see=function(beer){
		if(angular.isDefined(beer))
			$scope.activeBeer=beer;
			config.activeBeer=angular.copy($scope.activeBeer);
			config.activeBeer.reference=$scope.activeBeer;
			$location.path("beers/details");
	}
	
	$scope.details=function(beer,force,callback){
		if(angular.isUndefined(beer)){
			beer=$scope.activeBeer;
		}
		$scope.data.posted={ "beer" : {
		    "name" : beer.name,
		    "description" : beer.descritption,
		    "brewery" : beer.idBrewery
		  }
		};
	}
	
	$scope.remove=function(){
		angular.forEach($scope.data.beers, function(value, key) {
			if(value.selected){
				$scope.removeOne(value);
			}
		});
		return true;
	};
	
	
	$scope.removeOne=function(beer,force,callback){
		if(config.beers.update==="immediate" || force){
			beer.deleted=true;
			rest.remove(beer,"beers",callback);
		}else{
			save.addOperation("Deleted",$scope.removeOne,beer);
			beer.deleted=$scope.hideDeleted;
		}
	}
};