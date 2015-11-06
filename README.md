
# Codename Filibustering Panda
[![Build Status](https://travis-ci.org/FILIBUSTERING-PANDA/FILIBUSTERING-PANDA.svg?branch=master)](https://travis-ci.org/FILIBUSTERING-PANDA/FILIBUSTERING-PANDA)
[![Dependencies Status](https://david-dm.org/FILIBUSTERING-PANDA/FILIBUSTERING-PANDA.svg)](https://david-dm.org/FILIBUSTERING-PANDA/FILIBUSTERING-PANDA)
[![Dev Dependencies Status](https://david-dm.org/FILIBUSTERING-PANDA/FILIBUSTERING-PANDA/dev-status.svg)](https://david-dm.org/FILIBUSTERING-PANDA/FILIBUSTERING-PANDA)


SideChalk is a location-­based mobile application that allows you to deposit memories anywhere in the world. 


## Team

  - __Product Owner__: Ben
  - __Scrum Master__: Alex
  - __Development Team Members__: Kevin, Victor

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

##### `npm run dev` also `npm start`
Runs the webpack build system just like in `compile` but enables HMR. The webpack dev server can be found at `localhost:3000`.

##### `npm run dev:nw`
Same as `npm run dev` but opens the debug tools in a new window.

**Note:** you'll need to allow popups in Chrome, or you'll see an error: [issue 110](https://github.com/davezuko/react-redux-starter-kit/issues/110)

##### `npm run dev:no-debug`
Same as `npm run dev` but disables devtools.

##### `npm run compile`
Runs the Webpack build system with your current NODE_ENV and compiles the application to disk (`~/dist`). Production builds will fail on eslint errors (but not on warnings).

##### `npm run test`
Runs unit tests with Karma.

##### `npm run test:dev`
Same as `npm run test`, but will watch for changes and re-run tests.

##### `npm run deploy`
Helper script to run tests and then, on success, compile your application.

### Configuration

Basic project configuration can be found in `~/config/index.js`. Here you'll be able to redefine your src and dist directories, as well as tweak what ports Webpack and WebpackDevServer run on.

## Development

For development purposes Firebase takes the place of the server. For testing you will probably want to specify your own Firebase path here: 

```sh
src/constants/FirebasePaths.js
```

###Schema

An important distinction needs to be made between Firebase and the GeoFire plugin. [GeoFire](https://github.com/firebase/geofire-js) makes it possible to perform realtime geoqueries based on the user's location. Since it is not natively baked into Firebase you cannot attach geolocation data directly to entries in the DB. You need to create a separate table of geolocations that are connnected to memory objects by ids.



####All Tables:
![alt tag](https://raw.githubusercontent.com/FILIBUSTERING-PANDA/FILIBUSTERING-PANDA/master/src/assets/alltables.png)


####Memories:
![alt tag](https://raw.githubusercontent.com/FILIBUSTERING-PANDA/FILIBUSTERING-PANDA/master/src/assets/memories.png)

####Reactions:
![alt tag](https://raw.githubusercontent.com/FILIBUSTERING-PANDA/FILIBUSTERING-PANDA/master/src/assets/reactions.png)



#####Geolocations Table:

* Note that the coordinates are located in a seprate table connected by the key of the memory. This is necessary
![alt tag](https://raw.githubusercontent.com/FILIBUSTERING-PANDA/FILIBUSTERING-PANDA/master/src/assets/geolocations.png
)


####Users Table:
![alt tag](https://raw.githubusercontent.com/FILIBUSTERING-PANDA/FILIBUSTERING-PANDA/master/src/assets/users.png
)




### Installing Dependencies

From within the root directory:

```sh
npm install
```



## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
