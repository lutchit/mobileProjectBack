# Mobile development project
by
Ludovic Tichit

###Presentation
This project, in the course of Mobile development during the second year of the university's Master Donnée et Systèmes Connectés at Jean Monnet Saint-Etienne, is to develop an hybrid application providing you the availabiity to get some vouchers.

###Composants
This part of the application is the back end, realized with Node.js, in particular with the framework Express 4.
Database is realised with NoSQL, hosted on MongoLab (https://mlab.com/databases/mobileproject), and linked with the project in db.js file.

###Warning
MongoLab is blocked by Eduroam and Eduspot, if you want to test the app in local, test with you own wifi access.

###Installation
No difficulties in the installation. Let's do it !

Get the source code :
```
git clone https://github.com/lutchit/mobileProjectBack.git 
```

Install the dependencies :
```
npm install
```

Launch the project :
```
npm start
```
Go on localhost:3000

And voila, no much more !

It is possible to launch project in development mode, which eases code modification relaunching project each time a file is modified:
```
npm run dev
```

To run the tests, use the following command :
```
npm test
```
Istanbul allows to see how much the files are covered by the tests.

###Online version

Coming soon !

###Ressources
Some good JavaScript practices for Node.js are extracted from [Julien Muetton courses](http://edu.muetton.me/) and from my own experience (internship...)
Authentication tutorial from [Devdactic](http://devdactic.com/restful-api-user-authentication-2/)
