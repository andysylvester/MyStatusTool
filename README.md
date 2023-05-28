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
4. The app uses a [configuration file](https://github.com/andysylvester/MyStatusTool/blob/main/config.json) to set parameters needed for the app and for creating the RSS feed. The default parameters are for the demo app, this file should be updated for the parameters for the server where the app runs.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Starting The App

To start the app, enter the following command in a terminal window in the app folder:

   ```sh
   node app.js
   ```

The app will start on port 2001 by default. Open a tab in a web browser and enter the URL of the server with ":2001" at the end of the URL (or the port specified in the config.json file). The app will read the RSS feeds listed in the config.json file and display their current content. 

To use the app, enter some text in the text field at the top of the window and click the button. The post will appear below the "Subscribed feeds" area, the RSS feed will be updated, and a page will be created for the new post. You can click on the RSS Feed item in the menu bar to see the list of items.

Again, you should see the app running as in the screenshot shown earlier on this page.

You can see the app running <a href="http://fedwiki.andysylvester.com:443/">here</a> and give it a try! Also, feel free to install a copy on a server yourself!

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