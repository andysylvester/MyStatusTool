var express = require("express");
var app = express();
var basicAuth = require('basic-auth');
var ejs = require('ejs');
var path = require('path');
var fs = require('fs');

var http = require('http');
var request = require ("request");
var myVersion = "0.40", myProductName = "testRssCloud", myPort = 2005, myDomain = "";
var url = "";
var myName = "";
var urlFeed = "";
var urlRssCloudServer = "http://rpc.rsscloud.io:5337/pleaseNotify";
var whenLastPleaseNotify = new Date (0);


const utils = require ("daveutils");
const reallysimple = require ("reallysimple");
const rss = require ("daverss");
const bodyParser = require('body-parser'); // Middleware


var config = {
        host: "",
        subs: new Array (),
		baseURL: "",
		myDomain: "",
		feedURL: "",
		myName: "",
		myPort: 0,
		thisServer: {
			domain: "john.mystatustool.com",
			port: 80,
			feedUpdatedCallback: "/feedupdated"
		}	
};

var testText = "";
var xmltext = "";
var newItems = [];
var titleTest = "Test title";
var newReversedItems = [];

var newItems = [];

app.set('view engine', 'ejs');
// app.set('views','./views');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

 
var auth = function (req, res, next) {
  var user = basicAuth(req);
  if (!user || !user.name || !user.pass) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401);
  }
  if (user.name === 'test1' && user.pass === 'test2') {
    next();
  } else {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401);
  }
}
 
 
app.get("/admin", auth, function (req, res) {
	 let rawdata = fs.readFileSync('myFeedItems.json');
     let data = JSON.parse(rawdata);
	 res.render('admin', { data: data, myName: config.myName, url: config.baseURL, urlFeed: config.feedURL } );
});
 
app.post('/admin', auth, (req, res) => {
  // Insert Login Code Here
    console.log ("Got to POST branch");
    var newDate = new Date();
	var newDateString = newDate.toUTCString();
    var myText = {
        first : req.body.username
    }
	var newItem = {
		"description": req.body.username,
		"text": req.body.username,
		"title": "",
		"link": "",
		"when": newDateString,
		"pubDate": newDateString,
		"guid": {
			"flPermalink": true,
			"value": ""
			}
		};
	var feedPath = "/public/feed/rss.xml";

	var timestamp = Date.now();
	var timestampSec = Math.floor(timestamp/1000);
	var timeString = timestampSec.toString();
	var reversedArray = []

	if (req.body.postIndexInput >= 0)
	{	
		publishEditedPost(req.body.postIndexInput, req.body.username);
	}
	else
	{


	let rawdata = fs.readFileSync('myFeedItems.json');
    let data = JSON.parse(rawdata);
	myFeedItems = data;
	console.log("Input text from Medium Editor = ", myText.first);
	// Remove paragraph tags from Medium Editor text
	testString = newItem.text;
	var newstring1medium = testString.replace('<p>', '');
	var newstring2medium = newstring1medium.replace('</p>', '');
	newItem.text = newstring2medium;
	console.log("Cleaned up RSS text = ", newItem.text);


	newItem.link = config.baseURL + timeString;
	newItem.guid.value = config.baseURL + timeString;
	// newItem.link = "http://fedwiki.andysylvester.com:443/" + timeString;
	// newItem.guid.value = "http://fedwiki.andysylvester.com:443/" + timeString;
	console.log("newItem.link = ", newItem.link);
	console.log("newItem.guid = ", newItem.guid.value);
	// newItem.text = req.body.username;
	// console.log("newItem.text = ", newItem.text);
	
	myFeedItems.unshift(newItem);
	// console.log(myFeedItems);
	// console.log("Length of myFeedItems = ", myFeedItems.length);	
	// console.log("myFeedItems = ", myFeedItems);
	// newReverse = newItems;
	// console.log("Length of newItems = ", newItems.length);	
	for (let i = myFeedItems.length - 1; i >= 0; i--) {
       const valueAtIndex = myFeedItems[i]
  
       reversedArray.push(valueAtIndex)
     };

    // console.log("The reversed array is: ", reversedArray);
	console.log("myFeedItems = ", myFeedItems);

    // xmltext = rss.buildRssFeed (headElements, newReverse.reverse());
    xmltext = rss.buildRssFeed (headElements, myFeedItems);
	// fs.writeFile ("/root/pubNub11/public/feed/rssandy.xml", xmltext, function (err) {
	fs.writeFile (path.join(__dirname, feedPath), xmltext, function (err) {

	if (err) {
		console.log (err.message);
		}
	else {
		console.log ("rss.xml successfully created.");
		render(req.body.username, timeString);
		setTimeout(function(){
			console.log('Third log message - after 1 second');
		}, 1000);

		pleaseNotifyTest ("http://rpc.rsscloud.io:5337/ping", myDomain, myPort, "", config.feedURL, function (response) {
			console.log ("\nping: success == " + response.success + ", msg == \"" + response.msg + "\"\n");
			// whenLastPleaseNotify = new Date ();
			});

		}

	console.log("req.body.username = ", req.body.username);

    // Write feed JSON items to file
	var jsonDataFeed = JSON.stringify(myFeedItems);
	fs.writeFileSync("myFeedItems.json", jsonDataFeed);

	// Add new post to myItems.json
	let rawdata1 = fs.readFileSync('myItems.json');
    let data1 = JSON.parse(rawdata1);
	newItems = data1;

	var newItemObject = {
		feedTitle: "",
		feedLink: "",
		feedItem: {}
	};
	var testString = "";
	newItemObject.feedTitle = config.headElements.title;
	newItemObject.feedLink = config.headElements.link;
	newItemObject.feedItem = newItem;

	testString = newItemObject.feedItem.description;
	var newstring1 = testString.replace('<p>', '');
	var newstring2 = newstring1.replace('</p>', '');
	newItemObject.feedItem.description = newstring2;
	console.log("newItemObject: ", newItemObject);
	newItems.unshift(newItemObject);
	// console.log ("newItems: ", newItems);
	console.log ("First description: ", newItems[0].feedItem.description);
	for (let i = newItems.length - 1; i >= 0; i--) {
	   const valueAtIndex = newItems[i]
	   reversedArray.push(valueAtIndex)
	 };
	// console.log("The reversed array is: ", reversedArray);
	newReversedItems = reversedArray;
	// console.log("newReversedItems: ", newReversedItems);

	// var jsonData = JSON.stringify(newReversedItems);
	// fs.writeFileSync("myItems.json", jsonData);
	var jsonData = JSON.stringify(newItems);
	fs.writeFileSync("myItems.json", jsonData);


	});

    } // finish alternate path for publishing a post

    console.log(myText);
    res.redirect('/admin');
});

app.get('/', function(req, res){
     let rawdata = fs.readFileSync('myItems.json');
     let data = JSON.parse(rawdata);
	 res.render('index', { data: data, myName: config.myName, url: config.baseURL, urlFeed: config.feedURL });
});

app.get('/userposts', function(req, res){
	 let rawdata = fs.readFileSync('myFeedItems.json');
	 let data = JSON.parse(rawdata);
	 res.render('userposts', { data: data, myName: config.myName, url: config.baseURL, urlFeed: config.feedURL });
});

app.get('/about', function(req, res){
	 res.render('about', { myName: config.myName, url: config.baseURL, urlFeed: config.feedURL });
});

app.get('/feedupdated', (req, res) => {
    console.log ("req.method: == " + req.method);
    console.log ("req.originalUrl: == " + req.originalUrl);
    console.log ("req.query.url: == " + req.query.url);
    console.log ("req.query.challenge: == " + req.query.challenge);
	var challenge = req.query.challenge;
	console.log ("/feedupdated: challenge == " + challenge);
	res.writeHead (200, {"Content-Type": "text/plain"});
	res.end (challenge);    
});

app.post('/feedupdated', (req, res) => {
	// var body = "";
    console.log ("Got to feedupdated POST branch");
    // console.log ("req.method: == " + req.method);
    // console.log ("req.originalUrl: == " + req.originalUrl);
    // console.log ("req.params: == " + req.params);
    // console.log ("req.url: == " + req.url);
    console.log ("req.body: == ", req.body);
    console.log ("req.body.url: == ", req.body.url);
	feedUpdated (req.body.url);
	res.writeHead (200, {"Content-Type": "text/plain"});
	res.end ("Thanks for the update! :-)");  
});


app.listen(myPort, () => {
  console.log('App listening at port ${myPort}');
  readConfigFull();
  everyMinute();
  setInterval(everyMinute, 60000); 
})

function publishEditedPost (index, newPost) { 
	console.log("Got to publishEditedPost");
	
	let rawdata = fs.readFileSync('myFeedItems.json');
	let data = JSON.parse(rawdata);
	myFeedItems = data;
	console.log("Selected post description: ", data[index].description);
	console.log("Selected post text: ", data[index].text);
	console.log("New post text: ", newPost);

	// Remove paragraph tags from Medium Editor text
	let testString = newPost;
	var newstring1medium = testString.replace('<p>', '');
	var newstring2medium = newstring1medium.replace('</p>', '');
	let newPostText = newstring2medium;
	console.log("Cleaned up Medium text = ", newPostText);

	// Update post in array data with new post text
	data[index].description = newPost;
	data[index].text = newPostText;
	console.log("New post description: ", data[index].description);
	console.log("New post text: ", data[index].text);
	
	// Write feed JSON items to file
	var jsonDataFeed = JSON.stringify(myFeedItems);
	fs.writeFileSync("myFeedItems.json", jsonDataFeed);

	// Read myItems file, save to object array
	let rawMyItemsdata = fs.readFileSync('myItems.json');
	let MyItemsdata = JSON.parse(rawMyItemsdata);
	let myItems = MyItemsdata;
	console.log(myItems[0]);

	// Get guid of edited post
	console.log("Selected post description: ", data[index].description);
	console.log("Selected post guid: ", data[index].guid.value);
	let PostGuid = data[index].guid.value;
	

	// Get index of edited post in myItems.json
	let found = 0;
	for (var i = 0; i < myItems.length; i++) {
	   if (myItems[i].feedItem.guid.value == PostGuid)
	   {
		   found = i;
	   }	
	}
	console.log("Value of found: ", found);
	console.log("Selected post description: ", myItems[found].feedItem.description);
	console.log("Selected post guid: ", myItems[found].feedItem.guid.value);
	
	// Update myItems array and save to myItems.json
	myItems[found].feedItem.description = data[index].description;
	myItems[found].feedItem.text = data[index].text;
	var jsonDataFeedMain = JSON.stringify(myItems);
	fs.writeFileSync("myItems.json", jsonDataFeedMain);
	
	updateStandalonePost(myItems[found].feedItem.guid.value, myItems[found].feedItem.description);
	// removeText();

	return;
	};

// Function to remove text
function updateStandalonePost(originalText, postText) {

	// Strip the timestamp part from the guid for the standalone post
	let newText = originalText.replace(config.baseURL, '');
	console.log(newText);

	// Set pageModel elements
	var pageModel = {
	  content: "",
	  name: "",
	  baseURL: "",
	  feedURL: ""
	};
	pageModel.content = postText;
	pageModel.name = myName;
	pageModel.baseURL = config.baseURL;
	pageModel.feedURL = config.feedURL;
	console.log("pageModel.content = ", pageModel.content);
	console.log("pageModel.name = ", pageModel.name);
	console.log("pageModel.baseURL = ", pageModel.baseURL);
	console.log("pageModel.feedURL = ", pageModel.feedURL);

	// Create path for standalone post
	var html = "";
	var timeStringPath = "/public/";
	var dirPath = "";

	timeStringPath = timeStringPath + newText;

	var filePath = __dirname + timeStringPath + "/index.html";
	console.log("filePath = ", filePath);

	// Render post using template file
	// Render post text using the EJS template file
	ejs.renderFile('post_template.ejs', { model: pageModel }, {}, function(err, str){
		console.log(str);
		html = str;
		// str => Rendered HTML string
	});
	// console.log("New standalone post text = ", html);

	// Write file to directory
		// Write file to timestamp directory

			fs.writeFile(filePath, html, (err) => {
			  if (err)
				console.log(err);
			  else {
				console.log("File written successfully\n");
			  }
			});

	return;

};

function readConfigFull () {
        console.log("Got to readConfig");
        fs.readFile ("config.json", function (err, data) {
                var userConfig = new Object ();
                                userConfig = JSON.parse (data.toString ());
								console.log("userConfig : ", userConfig);
                if (!err) {
                        try {
                                userConfig = JSON.parse (data.toString ());
								console.log("userConfig : ", userConfig);
								for (x in userConfig) {
                                   config [x] = userConfig [x];
                                  }
								console.log("config : ", config);
								console.log("config URL 2: ", config.subs[1]);
								console.log("Length of subs array: ", config.subs.length);
								myDomain = config.myDomain;
								myPort = config.myPort;
								myName = config.myName;
								url = config.baseURL;
								urlFeed = config.feedURL;
								headElements = config.headElements;
								for (let i = 0; i < config.subs.length; i++) {
									console.log("sub index : ", i);
									pleaseNotify (urlRssCloudServer, config.subs[i], config.thisServer, function (response) {
									});
								}
								// getFeedContent();

                                }
                        catch (err) {
                                console.log ("readConfig: err == " + err.message);
                                }
                        }  else {
				           console.log ("readConfig: err 2 == " + err.message);
						}
				});
        console.log("Got to end of readConfig");
        };


function pleaseNotifyTest (urlServer, domain, port, path, urlFeed, callback) {
	var theRequest = {
		url: urlServer,
		headers: {Accept: "application/json"},
		method: "POST",
		form: {
			domain: domain,
			port: port,
			path: path,
			url: urlFeed,
			protocol: "http-post"
			}
		};
    console.log(domain + "\n");
    console.log(port + "\n");
    console.log(path + "\n");
	
	request (theRequest, function (error, response, body) {
		if (!error && (response.statusCode == 200)) {
			// var serverResponse = JSON.parse (response.body);
			var serverResponse = response.body;
			console.log ("response:  == " + response.body + ".\n")
			if (callback) {
				callback (serverResponse) 
				}
			}
		else {
			console.log ("pleaseNotify: error, code == " + response.statusCode + ", " + response.body + ".\n");
			}
		});
	};

function feedUpdated (urlFeed) { //called when the feed updates
	console.log ("feedUpdated: url == " + urlFeed + ", now == " + new Date ().toLocaleString ());

	reallysimple.readFeed (urlFeed, function (err, theFeed) {
		if (err) {
			console.log (err.message);
			}
		else {
			// console.log ("theFeed: ", theFeed);
			// console.log ("theFeed: ", utils.jsonStringify (theFeed));
            let rawdata = fs.readFileSync('myItems.json');
            let data = JSON.parse(rawdata);
			newItems = data;
			var newItemObject = {
				feedTitle: "",
				feedLink: "",
				feedItem: {}
			};
			var testString = "";
			var reversedArray = [];
			console.log ("theFeed.title ", theFeed.title);
			console.log ("theFeed.link ", theFeed.link);
			console.log ("theFeed.items[0] ", theFeed.items[0]);
			newItemObject.feedTitle = theFeed.title;
			newItemObject.feedLink = theFeed.link;
			newItemObject.feedItem = theFeed.items[0];
			testString = newItemObject.feedItem.description;
			var newstring1 = testString.replace('<p>', '');
			var newstring2 = newstring1.replace('</p>', '');
			newItemObject.feedItem.description = newstring2;
			console.log("newItemObject: ", newItemObject);
			// newItems.push(newItemObject);
			newItems.unshift(newItemObject);
			console.log ("newItems: ", newItems);
			console.log ("First description: ", newItems[0].feedItem.description);
			for (let i = newItems.length - 1; i >= 0; i--) {
			   const valueAtIndex = newItems[i]
			   reversedArray.push(valueAtIndex)
			 };
			console.log("The reversed array is: ", reversedArray);
			newReversedItems = reversedArray;
			console.log("newReversedItems: ", newReversedItems);

			var jsonData = JSON.stringify(newItems);
			fs.writeFileSync("myItems.json", jsonData);
			
			}
		});


	};

function secondsSince (when) { 
	var now = new Date ();
	when = new Date (when);
	return ((now - when) / 1000);
	};

function everyMinute () {
	if (secondsSince (whenLastPleaseNotify) > (24 * 60 * 60)) {
		for (let i = 0; i < config.subs.length; i++) {
			pleaseNotify (urlRssCloudServer, config.subs[i], config.thisServer, function (response) {
				console.log ("\npleaseNotify: success == " + response.success + ", msg == \"" + response.msg + "\"\n");
							});
		}
		whenLastPleaseNotify = new Date ();
	}
};

function render (postText, dirname) { 
    console.log ("Got to render function ");
    console.log ("postText = ", postText);
	var pageModel = {
	  content: "",
	  name: "",
	  baseURL: "",
	  feedURL: ""
    };
	var html = "";
	var timeStringPath = "/public/";
	var dirPath = "";
	// var timestamp = Date.now();
	// var timestampSec = Math.floor(timestamp/1000);

	pageModel.content = postText;
	pageModel.name = myName;
	pageModel.baseURL = config.baseURL;
	pageModel.feedURL = config.feedURL;
	console.log("pageModel.content = ", pageModel.content);
	console.log("pageModel.name = ", pageModel.name);
	console.log("pageModel.baseURL = ", pageModel.baseURL);
	console.log("pageModel.feedURL = ", pageModel.feedURL);
	// Get current time as a string, add to path
	// timeString = timestampSec.toString();
	// timeStringPath = timeStringPath + timeString;
	timeStringPath = timeStringPath + dirname;

    var filePath = __dirname + timeStringPath + "/index.html";
	console.log("filePath = ", filePath);

    // Render post text using the EJS template file
	ejs.renderFile('post_template.ejs', { model: pageModel }, {}, function(err, str){
		console.log(str);
		html = str;
		// str => Rendered HTML string
	});

    // Create timestamp directory in public folder
	fs.mkdir(path.join(__dirname, timeStringPath),
	  { recursive: true }, (err) => {
		if (err) {
		  return console.error(err);
		} else {
			console.log('Directory created successfully!');
		// Write file to timestamp directory

			fs.writeFile(filePath, html, (err) => {
			  if (err)
				console.log(err);
			  else {
				console.log("File written successfully\n");
			  }
			});
		}
	  });
	};


		function requestWithRedirect (theRequest, callback) { 
			var myRequest = new Object ();
			for (var x in theRequest) {
				myRequest [x] = theRequest [x];
				}
			myRequest.followAllRedirects = false; 
			myRequest.maxRedirects = (myRequest.maxRedirects === undefined) ? 0 : myRequest.maxRedirects;
			request (myRequest, function (err, response, body) {
				const code = response.statusCode;
				if ((code == 301) || (code == 302)) { 
					if (myRequest.maxRedirects == 0) {
						callback (err, response, body);
						}
					else {
						myRequest.maxRedirects--;
						myRequest.url = response.headers.location;
						requestWithRedirect (myRequest, callback);
						}
					}
				else {
					callback (err, response, body);
					}
				});
			};
	
	
		function pleaseNotify (urlCloudServer, feedUrl, thisServer, callback) { 
			function buildParamList (paramtable) { 
				if (paramtable === undefined) {
					return ("");
					}
				else {
					var s = "";
					for (var x in paramtable) {
						if (paramtable [x] !== undefined) { 
							if (s.length > 0) {
								s += "&";
								}
							s += x + "=" + encodeURIComponent (paramtable [x]);
							}
						}
					return (s);
					}
				}
			const theRequest = {
				url: urlCloudServer,
				method: "POST",
				followAllRedirects: true, 
				maxRedirects: 5,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
					},
				body: buildParamList ({
					domain: thisServer.domain, 
					port: thisServer.port,
					path: thisServer.feedUpdatedCallback,
					url1: feedUrl,
					protocol: "http-post"
					})
				};
			requestWithRedirect (theRequest, function (err, response, body) {
				if (err) {
					callback (err);
					}
				else {
					callback (undefined, body);
					}
				});
			};
			