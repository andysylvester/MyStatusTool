# MyStatusTool
 Official repo for minimal blogging tool using Node.js, RSS, and rssCloud
 
<<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br>
<div align="center">

<h3 align="center">My Status Tool</h3>

  <p align="center">
    View a <a href="http://fedwiki.andysylvester.com:443">demo</a> of the MyStatusTool app!
    <br />
    <br />
    <a href="http://fedwiki.andysylvester.com:443">View Demo App</a>
    ·
    <a href="https://github.com/andysylvester/MyStatusTool/issues">Report Bug</a>
    ·
    <a href="https://github.com/andysylvester/MyStatusTool/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#customizing">Customizing The App</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

My Status Tool is an application that provides the basic posting and reading functionality within Twitter, but using [RSS](http://cyber.law.harvard.edu/rss/rss.html) and [rssCloud](http://home.rsscloud.co/) as the enabling technologies.

The basic functions are:
* Ability to make a short post
* When a post is made, a RSS feed is updated, a separate page for the post is created, and the post appears on the home page
* The tool provides hosting for the RSS feed and posts created
* The tool can display updates to any RSS feeds that support the rssCloud protocol

The tool is set up for a single user and requires some configuration. Please consult the Installation section in this README file for more information.

This app is a proof of concept, but will be further developed. If you find problems in the tool, or want to suggest features, feel free to create an issue in the Github repo.


<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [Express](https://expressjs.com/)
* [reallysimple](https://github.com/scripting/reallysimple)
* [rss](https://github.com/scripting/rss)
* [utils](https://github.com/scripting/utils)
* [ejs](https://ejs.co/)



<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

Here is how to get your copy of the app running!

### Prerequisites

* Node.js install (needs to be on a server on the Internet)
* NPM install
* Git (optional, but can be helpful on the install)

### Installation

1. Clone the repo if you have Git installed
   ```sh
   git clone https://github.com/andysylvester/MyStatusTool.git
   ```
This will create a folder called MyStatusTool

2. If you do not have Git installed, you can download a copy of the app as a Zip file, then unzip the app into a folder called "MyStatusTool" on your computer/server.

3. In a terminal window, install the required NPM packages by changing directory to the install folder, then type the following command:
   ```sh
   npm install
   ```
4. The app uses a [configuration file](https://github.com/andysylvester/MyStatusTool/blob/main/config.json) to set parameters needed for the app and for creating the RSS feed. The default parameters are for the demo app, this file should be updated for the parameters for the server where the app runs. Here is a list of the items that should be reviewed/updated:

host: This is the URL of where your MyStatusTool will be accessed. If you are running on a port other than 80, you should include it in the URL.

subs: This is a Javascript array of the list of RSS feeds you are subscribing to. These should be feeds that support rssCloud for notification of updates. To check this, look at a RSS feed you are interested in and do a search for the <cloud> element. Here is an example:

   ```sh
   <cloud domain="rpc.rsscloud.io" port="5337" path="/pleaseNotify" registerProcedure="" protocol="http-post" />
   ```

If there is no <cloud> element, MyStatusTool will not get notification of feed updates, and will not display any updates.

The structure of the subs array is that each feed URL needs to have double-quotes at the beginning and end of the URL. If the URL is not the last URL in the array, there needs to be a comma at the end of the line to indicate that there are additional elements in the array. A comma is not needed for the last URL in the array.

baseURL: This is a text string used to create URLs for feed elements for the RSS feed created by MyStatusTool posts. This should be the same string as the host entry in config.json.

myDomain: This is the top-level domain of the URL where your MyStatusTool will be accessed. This should be consistent with the URLs in the host and baseURL entries in config.json.

myPort: This is the port number of the URL where your MyStatusTool will be accessed. Since this is a number, there are no quotes around the number, and there should be a comma at the end of the line.

myName: This is a text string that will appear at the top of the main page and admin page when MyStatusTool is running. The string does not have to be your name, if you wish. If you do not want anything to appear, leave the string as “” with no spaces.

feedURL: This is the URL of the RSS feed created for MyStatusTool posts. The main URL portion should match the URLs in the host and baseURL entries.  The portion at the end (/feed/rss.xml) should be left as-is.

headElements: This is a Javascript object with elements used to create the <head> element in the RSS feed created for MyStatusTool posts. The following elements should be reviewed and updated to be consistent with the host and baseURL entries:

title: This text string is the title of the overall feed, and will appear in RSS readers. You should update this to be whatever you want.

link: This text string is the URL for the site, and should match the host and baseURL entries.

description: This text string is a description of the site. You can update this to be whatever you want.

twitterScreenName: If you have a Twitter account, you can enter your screen name here. If you do not want anything to appear, leave the string as “” with no spaces.

facebookPageName: If you have a Facebook account, you can enter your page name here. If you do not want anything to appear, leave the string as “” with no spaces.

When you have finished updating config.json, make sure that the updated version has been uploaded to the server running your instance of MyStatusTool.

There is also a setting for username and password in the file app.js. MyStatusTool uses Basic Authentication to provide a way for the user to log in and make posts. These values are stored on line 59 in app.js. PLEASE update these to some other values and make sure that the updated version has been uploaded to the server running your instance of MyStatusTool.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Starting The App

To start the app, enter the following command in a terminal window in the app folder:

   ```sh
   node app.js
   ```

The app will start on port 2001 by default. Open a tab in a web browser and enter the URL of the server with ":2001" at the end of the URL (or the port specified in the config.json file). The app will display some starter content and subscribe to the RSS feeds listed in the config.json file. When those RSS feeds update, new content will be added to the top of the page. Click the Refresh button to see new content.

The menu bar at the top of the screen has four entries: Home, About, Feed, and Github Repo. Clicking on the Home part of the menu bar will load the main page. Clicking on About brings up a page with information about MyStatusTool. Clicking on Feed shows the RSS feed for your posts within MyStatusTool. Clicking on Github Repo opens the main page on Github for the MyStatusTool application, which contains installation and usage instructions.

To start making posts in MyStatusTool, click on the circle with an “m” in the upper right corner of the screen. This will bring up the admin page, and a dialog box will open asking for a username and password. Enter the username and password in app.js and click the OK button. The page will update to show a text area and a button to submit posts. HTML can be included in the text entered in the text area (such as links and styling). When you make a post, the post will appear at the top of the screen. In the lower-left corner of the post, the timestamp will be a link to the page for that post. If other subscribed feeds have updated, their posts will appear as well as your post.

## Other MyStatusTool versions

This version of MyStatusTool is a Node.js application using the Express web app framework. If you do not have a Linux server account to run this app, there is another implementation in PHP ([MST-PHP](https://github.com/colin-walker/PHP-MST), written by [Colin Walker](https://colinwalker.blog/php-mst/)) which can run on most generic web hosting setups.

## Customizing The App

The main app is an [Express](https://expressjs.com/) application, so other Express features can be added.

[Embedded Javascript](https://ejs.co/) templates are used for the creation of the pages.

The app currently runs on port 2001, this can be changed by editing the [configuration file](https://github.com/andysylvester/MyStatusTool/blob/main/config.json). However, if a port other than 443 or 80 is used for the app, updates to RSS feeds from WordPress.com sites will not be received. 

You can use the NPM package [forever](https://www.npmjs.com/package/forever) to keep the app running continuously. To install the package, type the following command in a terminal window on your server:

   ```sh
   sudo npm install forever -g
   ```
Once you have installed the forever package, use the following command to start the app:

   ```sh
   forever start app.js
   ```

To stop the forever process, type the following in the app directory:

   ```sh
   forever stopall
   ```


<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Andy Sylvester - [@AndySylvester99](https://twitter.com/AndySylvester99) - sylvester.andy@gmail.com

Project Link: [https://github.com/andysylvester/MyStatusTool](https://github.com/andysylvester/MyStatusTool)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Colin Walker](https://colinwalker.blog/) - Inspiration from his recent tool, [hyblog](https://github.com/colin-walker/hyblog)
* [Andrew Shell](https://blog.andrewshell.org/) - Developer of the rssCloud server used by the app
* [Dave Winer](http://scripting.com/) - Creator of many of the NPM modules used in this app

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/andysylvester/MyStatusTool.svg?style=for-the-badge
[contributors-url]: https://github.com/andysylvester/MyStatusTool/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/andysylvester/MyStatusTool.svg?style=for-the-badge
[forks-url]: https://github.com/andysylvester/MyStatusTool/network/members
[stars-shield]: https://img.shields.io/github/stars/andysylvester/MyStatusTool.svg?style=for-the-badge
[stars-url]: https://github.com/andysylvester/MyStatusTool/stargazers
[issues-shield]: https://img.shields.io/github/issues/andysylvester/MyStatusTool.svg?style=for-the-badge
[issues-url]: https://github.com/andysylvester/MyStatusTool/issues
[license-shield]: https://img.shields.io/github/license/andysylvester/MyStatusTool.svg?style=for-the-badge
[license-url]: https://github.com/andysylvester/MyStatusTool/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/andrew-sylvester-b426a251
[product-screenshot]: images/screenshot.png