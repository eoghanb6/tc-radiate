tc-radiate
==========

Configuration
-------------
To configure tc-radiate with your own TeamCity server go to 'Settings.js' and edit the relevant variables, usually just 'teamCityUrl' with your TeamCity project's URL and 'mainBranch' with the main branch on that project (can be left blank).

All user images should be put into the 'Content/users' folder in .jpg format. The image name should be set to the users' TeamCity username.

The size of the user images might appear too small or too big depending on the size of screen it is being displayed on. This can easily be changed by changing the 'height: 180px' of the 'img' class at the top of the 'Style.css' file to something bigger or smaller depending on your needs.

Proxy
-----
A proxy is required to request the team city web services. This is because javascript won't let you do a cross domain request in most browsers. All the proxy needs to to is request the web service on behalf of the JavaScript whilst running on the same domain.

In the 'proxies' folder there is an example of a an ASP.NET proxy which needs to be ran on IIS.
If you want to use this, just copy it into the root tc-radiate folder and hook the folder up to an IIS website.

Setting up IIS
--------------
- Navigate to "Turn Windows features on or off" (Can be done by searching "windows features" in the start menu) and enable Internet Information Services, ASP and ASP.NET. These can be found in "Internet Information Services > Web management tools" and "Internet Information Services > World Wide Web Services > Application Development Features".
- You may need to restart the PC at this point to ensure they install correctly.
- Open the Internet Information Services program and expand the dropdown on the left until you see the "Sites" folder.
- Right click on "Application Pools" and click "Add Application Pool...".
- Give it a relevant name, such as "build monitor" and choose the .NET Framework version 4. If you do not see .NET v4 or a variation (such as .NET Framework v4.0.30319) then you will need to enable it in windows features as mentioned above.
- Choose "Integrated" for Managed pipeline mode and tick "Start application pool immediately". Click OK.
- Right click on the "sites" folder and click "Add Web Site...".
- Give the site a name such as "Build Monitor" and select the Application pool you just created. 
- Point the Physical path to the main tc-radiate folder.
- Give it whatever hostname you like, such as www.buildmonitor.com (This will be what you type into your browser to access the build monitor, so remember it),  tick "Start Web site immediately" and click OK.
- Navigate to C:\Windows\System32\drivers\etc on your PC and open "hosts" with a program such as notepad, Sublime text or any text editor of your choice.
- Enter "127.0.0.1" and the web address you entered when creating your IIS Web site (in the example above, "www.buildmonitor.com") at the bottom of the document, so it would look something like this -> "127.0.0.1    www.buildmonitor.com".
- Save and close the document.
- If everything is set up correctly and your "Settings.js" file has been configured, if you now open your browser and type in the address you entered into IIS and your hosts file, it should bring you to the build monitor.

General Information
-------------------
If an image with a users username has not be placed in the Content/users folder in jpg format, then no image will be displayed when that user triggers a test. 

A user image will only appear when someone has triggered the test; otherwise a random meme will appear.

A reason for failure will only appear when a test has failed, although it only displays the status text of the test, so may not always give a sensible reason for failure. 