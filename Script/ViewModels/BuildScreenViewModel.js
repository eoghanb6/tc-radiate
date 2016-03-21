var BuildScreenViewModel = function () {
    var self = this;

    self.isFirstLoad            = ko.observable(true);
    self.builds                 = ko.observableArray();
    self.buildTypes             = ko.observableArray();
    self.errorMessage           = ko.observable();
    self.isLoading              = ko.observable(true);
    self.randomClass            = ko.observable(Utils.getRandomClass());
    self.randomClass2           = ko.observable(Utils.getRandomClass2());
    self.randomClass3           = ko.observable(Utils.getRandomClass3());
    self.randomClass4           = ko.observable(Utils.getRandomClass4());
	self.latestBuildAndCompile  = ko.observable();
	self.latestDeployToDev      = ko.observable();
	self.latestDeployToAccept   = ko.observable();
	self.latestSelenium         = ko.observable(); 
   	    
    self.hasError = ko.computed(function () {
        if (!this.errorMessage())
            return false;
        return this.errorMessage().length > 0;
    }, self);

    self.init = function () {
        self.isLoading(true);
        self.loadBuildTypes();
        self.loadMainBuildStatus();
        
        //Load a new build image every so often just for fun
        // doesn't look great with 4 images changing 
        // setInterval(function () { self.randomClass(Utils.getRandomClass()); }, Settings.buildImageIntervalMs);
    };

    self.loadAllBuilds = function () {
        self.isLoading(true);
        $.getJSON(Settings.buildsUrl + Utils.getTsQSParam(), function (data) {
            self.builds(ko.utils.arrayMap(data.build, function (build) {
                return new SingleBuildViewModel(build, self.buildTypes());
            }));

            if (self.builds().length == 0)
                self.errorMessage("There's no builds!? Better crack on with some work!");
            else
                self.errorMessage('');
        }).always(function () {
            self.isLoading(false);
            self.loadMainBuildStatus();
			
			self.loadLatestDeployToDev();
			self.loadLatestBuildAndCompile();
			self.loadLatestDeployToAccept();
			self.loadLatestSelenium();
			
            if (Settings.enableAutoUpdate)
                setTimeout(self.loadAllBuilds, Settings.checkIntervalMs);
            if (self.isFirstLoad())
                self.isFirstLoad(false);
        });
    };

    self.loadBuildTypes = function () {
        self.isLoading(true);
        $.getJSON(Settings.buildTypesUrl, function (data) {
            self.buildTypes(data.buildType);
            self.loadAllBuilds();
            self.isLoading(false);
        });
    };

    self.loadMainBuildStatus = function () {
        self.isLoading(true);
        $.getJSON(Settings.buildStatusUrl + Utils.getTsQSParam(), function (data) {
            self.mainBuild(ko.mapping.fromJS(data, {
                create: function(options) {
                    return new MainBuildViewModel(options.data, self.buildTypes());
                }
            }));
        }).always(function (){
            self.isLoading(false);
        });
    };
		
 	self.loadLatestDeployToDev = function () {
        self.isLoading(true);
 		var urlForBasicBuildInfo = Settings.proxy + Settings.teamCityUrl + '/guestAuth/app/rest/builds?locator=buildType:(id:' + topRightPanelID + ')';
        $.getJSON(urlForBasicBuildInfo, function (latestBuildsForType) {	
 			var basicBuildInfoForLatest = latestBuildsForType.build[0];
 			var urlForDetailedBuildInfo = Settings.proxy + Settings.teamCityUrl + basicBuildInfoForLatest.href;
 			$.getJSON(urlForDetailedBuildInfo, function (data) {
 				var detailedBuildInfo = data;
 				self.latestDeployToDev(ko.mapping.fromJS(data, {
                    create: function(options) {
                        return new MainBuildViewModel(options.data, self.buildTypes());
                    }
                }));	
 			}).always(function (){
 				self.isLoading(false);
 			});		
        });
    };

    self.loadLatestBuildAndCompile = function () {
        self.isLoading(true);
        var urlForBasicBuildInfo = Settings.proxy + Settings.teamCityUrl + '/guestAuth/app/rest/builds?locator=buildType:(id:' + topLeftPanelID + ')';
        $.getJSON(urlForBasicBuildInfo, function (latestBuildsForType) {    
            var basicBuildInfoForLatest = latestBuildsForType.build[0];
            var urlForDetailedBuildInfo = Settings.proxy + Settings.teamCityUrl + basicBuildInfoForLatest.href;
            $.getJSON(urlForDetailedBuildInfo, function (data) {
                var detailedBuildInfo = data;
                self.latestBuildAndCompile(ko.mapping.fromJS(data, {
                    create: function(options) {
                        return new MainBuildViewModel(options.data, self.buildTypes());
                    }
                }));    
            }).always(function (){
                self.isLoading(false);
            });     
        });
    };
 	
	self.loadLatestDeployToAccept = function () {
        self.isLoading(true);
        var urlForBasicBuildInfo = Settings.proxy + Settings.teamCityUrl + '/guestAuth/app/rest/builds?locator=buildType:(id:' + bottomLeftPanelID + ')';
        $.getJSON(urlForBasicBuildInfo, function (latestBuildsForType) {    
            var basicBuildInfoForLatest = latestBuildsForType.build[0];
            var urlForDetailedBuildInfo = Settings.proxy + Settings.teamCityUrl + basicBuildInfoForLatest.href;
            $.getJSON(urlForDetailedBuildInfo, function (data) {
                var detailedBuildInfo = data;
                self.latestDeployToAccept(ko.mapping.fromJS(data, {
                    create: function(options) {
                        return new MainBuildViewModel(options.data, self.buildTypes());
                    }
                }));    
            }).always(function (){
                self.isLoading(false);
            });     
        });
    };
	 
	self.loadLatestSelenium = function () {
        self.isLoading(true);
        var urlForBasicBuildInfo = Settings.proxy + Settings.teamCityUrl + '/guestAuth/app/rest/builds?locator=buildType:(id:' + bottomRightPanelID + ')';
        $.getJSON(urlForBasicBuildInfo, function (latestBuildsForType) {    
            var basicBuildInfoForLatest = latestBuildsForType.build[0];
            var urlForDetailedBuildInfo = Settings.proxy + Settings.teamCityUrl + basicBuildInfoForLatest.href;
            $.getJSON(urlForDetailedBuildInfo, function (data) {
                var detailedBuildInfo = data;
                self.latestSelenium(ko.mapping.fromJS(data, {
                    create: function(options) {
                        return new MainBuildViewModel(options.data, self.buildTypes());
                    }
                }));    
            }).always(function (){
                self.isLoading(false);
            });     
        });
    };

    self.init();
};