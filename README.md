# NSS Pinterest Project

Who doesnt like Pinterest?? This is our own personal take on it.

## Getting Started

There are a few things that you will need to get this project up and running. Firebase API key, as well as Google's custom search API key

### Prerequisites

What things you need to install the software and how to install them

[npm](https://www.npmjs.com/) - Node Package Manager

### Installing

A step by step series of examples that tell you have to get a development env running

First.. Fork and clone down the repo!! Once you have that settled.. Continue

Install all dependencies

```
cd d18-pinterest-hellacoolpinterestboard/lib/
npm install
cd ../
```

From here, if you run a local server, you should be getting a couple errors regarding some missing files. Let's add those in.

```
cd app/
mkdir app/values && cd app/values
touch firebaseAPIConfig.js googleAPIConfig.js
cd ../../
```

Great!! For this application, we are using google's custom search library to bring up searches via Pinterest. 
To get access to this key, visit the link below and follow the steps to getting your personal key.
[googleapi](https://developers.google.com/custom-search/) 

With your text editor of choice, go ahead and open up googleAPIConfig.js and copy in the following code, being sure to replace the placeholder with your new key.

```
"use strict";

app.constant("googleCredentials", {
    URL: "https://www.googleapis.com/customsearch/v1?key=YOUR_KEY_GOES_HERE&cx=017472411999487661881:810r8fhupju&siteSearch=pinterest.com&q="
});

```

Killer. One down, one more to go. 
In addition to Google Maps, this project also utilizes Firebase as it's database management system. 
Go to [firebase](https://firebase.google.com/) and set up a new account. Click on `GO TO CONSOLE` at the top of the screen to create your project account. Go ahead and import your existing google project that we just created from the maps API. This will take you to the overview page. 
Click the red button towards the middle right `</>` to add Firebase to the application. This will give you some specific values that we will be using to access our database. From this screen.. Go ahead and copy the below code into firebaseAPIConfig.js using your personal values instead.


```
"use strict";

app.constant("FBCreds", {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL"    
});
```

Awesome! Just a couple more things and you will be all finished. To begin reading and writing to your database, you will also need to set up a few options in your Firebase config. Returning to your Firebase console, click the `Database` tab to the left, then choose the `RULES` tab at the top. Go ahead and copy and replace the current rules JSON with the following script!

```
{
  "rules": {
    ".read": "true",
    ".write": "true",
      "users": {
        ".indexOn": ["uid"]
      },
      "board": {
        ".indexOn": ["uid"]
      },
      "pins" : {
        ".indexOn": ["uid", "boardid"]
      }
  }
}
```

And lastly.. Choose the `Authentication` tab to the left of your firebase console. Select `SIGN-IN METHOD` towards the top of the screen.
You want to enable Email/Password provider, as well as Google. 

And there you have it!! Your app should now be up and running:)


## Built With

* [AngularJs](https://angularjs.org/) - The web framework used
* [npm](https://www.npmjs.com/) - Dependency Management
* [Grunt](https://gruntjs.com/) - Task Manager
* [Firebase](https://firebase.google.com/) - Database 

## Authors

* [Taylor Perkins](https://github.com/taylorperkins)
* [Helana Nosrat](https://github.com/helanan)
* [Jeremy Bakker](https://github.com/JeremyBakker)

