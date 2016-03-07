var BuildScreenViewModel = function () {
    var self = this;

    self.isFirstLoad  = ko.observable(true);
    self.builds       = ko.observableArray();
    self.buildTypes   = ko.observableArray();
    self.errorMessage = ko.observable();
    self.isLoading    = ko.observable(true);
    self.randomClass  = ko.observable(Utils.getRandomClass());
    self.mainBuild    = ko.observable();
	self.randomClass2 = ko.observable(Utils.getRandomClass2());
	self.randomClass3 = ko.observable(Utils.getRandomClass3());
	self.randomClass4 = ko.observable(Utils.getRandomClass4());

//history panels (n-1) data is retrieved from the following:
	
	self.mostRecentCompiles = ko.computed(function() {
		var compileBuilds = ko.utils.arrayFilter(self.builds(), function(build) {
			return build.buildType() == 'Compile/Build/Unit Test';
		}, self);
		
		return compileBuilds.slice(1,2);
        var result = JSON.stringify(compileBuilds);
	});
	
	self.mostRecentDevs = ko.computed(function() {
		var deployToDev = ko.utils.arrayFilter(self.builds(), function(build) {
			return build.buildType() == 'Deploy to Development';
		}, self);

		return deployToDev.slice(1,2);
	});
	
	self.mostRecentAccept = ko.computed(function() {
		var deployToAccept = ko.utils.arrayFilter(self.builds(), function(build) {
			return build.buildType() == 'Deploy to Accept';
		}, self);
		
		return deployToAccept.slice(1,2);
	});
	
	self.mostRecentSelenium = ko.computed(function() {
		var executeSeleniumTests = ko.utils.arrayFilter(self.builds(), function(build) {
			return build.buildType() == 'Execute Selenium Tests';
		}, self);
		
		return executeSeleniumTests.slice(1,2);
	})

//Current builds retrieved from the following:

    self.mainCompiles = ko.computed(function() {
        var compileBuilds = ko.utils.arrayFilter(self.builds(), function(build) {
            return build.buildType() == 'Compile/Build/Unit Test';
        }, self);
        
        return compileBuilds.slice(0,1);
    });
    
    self.mainDevs = ko.computed(function() {
        var deployToDev = ko.utils.arrayFilter(self.builds(), function(build) {
            return build.buildType() == 'Deploy to Development';
        }, self);

        return deployToDev.slice(0,1);
    });
    
    self.mainAccept = ko.computed(function() {
        var deployToAccept = ko.utils.arrayFilter(self.builds(), function(build) {
            return build.buildType() == 'Deploy to Accept';
        }, self);
        
        return deployToAccept.slice(0,1);
    });
    
    self.mainSelenium = ko.computed(function() {
        var executeSeleniumTests = ko.utils.arrayFilter(self.builds(), function(build) {
            return build.buildType() == 'Execute Selenium Tests';
        }, self);
        
        return executeSeleniumTests.slice(0,1);
    })
	
	
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

    self.init();
};
