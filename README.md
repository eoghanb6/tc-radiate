tc-radiate
==========

Configuration
-------------
To configure tc-radiate with your own TeamCity server go to 'Settings.js' and edit the relevant variables.

Configuration settings can be overridden using query strings e.g. http://mybuildscreenurl/?mainBranch=exampleBranchName

All user images should be put into the 'Content/users' folder in .jpg format. The image name should be set to the users' TeamCity username.

The size of the user images might appear too small or too big depending on the size of screen it is being displayed on. This can easily be changed by changing the 'height: 180px' of the 'img' class within the 'Style.css' file to something bigger or smaller depending on your needs.

Proxy
-----
A proxy is required to request the team city web services. This is because javascript won't let you do a cross domain request in most browsers. All the proxy needs to to is request the web service on behalf of the JavaScript whilst running on the same domain.

In the 'proxies' folder there is an example of a an ASP.NET proxy which needs to be ran on IIS.
If you want to use this, just copy it into the root tc-radiate folder and hook the folder up to an IIS website.
