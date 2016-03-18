var Settings = {
    //The url that points to the team city project
    teamCityUrl: 'Insert TeamCity project URL here',

    //The main branch to show the master build status on the right hand panel on the screen
    mainBranch: '',

    //Proxy to handle the cross domain ajax request.
    // This will need to be hosted on the relevant server e.g. proxy-node.js on Node.js or proxy-aspnet.ashx on IIS
    // You could write your own proxy just so long as it is hosted form the same domain as the rest of the app
    proxy: 'proxy-aspnet.ashx?url=',

    //How often to call the TeamCity webservices and update the screen
    checkIntervalMs: 10000, //5000 ms = 5 seconds

    //How often to refresh the build image;
    buildImageIntervalMs: 3600000, //60000 ms = 1 minute

    //use this to stop the screen from updating automatically e.g. if you manually refresh it.
    enableAutoUpdate: true,
}

//CUSTOMISATION
//Changes titles above build panels
topLeftTitle          = 'Insert title here';
topRightTitle         = 'Insert title here';
bottomLeftTitle       = 'Insert title here';
bottomRightTitle      = 'Insert title here';

//Need to be changed according to the ID of each build type you want displayed (Needs to be obtained from the API. The list of all of the build ID's on your project 
//can be found from the following link: http://*YourTeamCityProjectURL/guestAuth/app/rest/buildTypes ).
//Alternatively, you can click into the type of build you want displyed from your TeamCity project page and copying the part of the url after '/viewType.html?buildTypeId='.
topLeftPanelID        = 'Insert buildID here';
topRightPanelID       = 'Insert buildID here';
bottomLeftPanelID     = 'Insert buildID here';
bottomRightPanelID    = 'Insert buildID here';

//How many builds are shown in the history panel
numberOfHistoryBuilds = 6;


//Allow the settings to be overridden by querystring parameters
//(url parameters are currently only treated as strings)
jQuery.extend(Settings, UrlParams);

//----------------------
// TEAM CITY URLS
//----------------------
//The url for the list of all builds on the left hand side of the screen
Settings.buildsUrl = Settings.proxy + Settings.teamCityUrl + '/guestAuth/app/rest/builds?locator=running:any,branch:branched:any,count:40';

//The url for the list of build types (used for mapping the build id (e.g. bt11) to the name (e.g. Website Tests)
Settings.buildTypesUrl = Settings.proxy + Settings.teamCityUrl + '/guestAuth/app/rest/buildTypes';

//The url for the status of the build on the main branch
Settings.buildStatusUrl = Settings.proxy + Settings.teamCityUrl + '/guestAuth/app/rest/builds/branch:' + Settings.mainBranch + ',running:any,canceled:any';

