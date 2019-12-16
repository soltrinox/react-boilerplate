# Best Practices

## Styles & Coding

- HTML, CSS and Javascript follow in general the Google Style Guide conventions (https://github.com/google/styleguide);
- Custom CSS follows the BEM convention (http://getbem.com/);

Please be sure to check and follow them before attempt any modification to the sources, in order to preserve the general integrity of the project patterns.
Third-party linter plugins like ESLint, Beautify, Prettier or any other similar resource are welcome (configuration files of the mentioned ones are already present).


## Assets

### Common Guidelines

- For assets inclusion location, specifications or their variations, please refeer to __TODO__ comments inside the sources;


### List of common assets

- Paths:
    * __/\_\_tests\_\_/__: Contains all the shared unit tests;
    * __/\_\_tests\_\_/\_\_snapshots\_\___: Contains all the shared snapshot unit tests;
    * __/assets/__: Contains all the shared assets files;
    * __/backend/__: Contains all the shared back-end scripts (__development__/__production__ version);
    * __/backend/prisma/__: Contains all the shared Back-End Database client scripts;
    * __/backend/src/__: Contains all the shared Back-End scripts (__development__ version);
    * __/backend/src/resolvers/__: Contains all the shared Back-End resolvers scripts (__development__/__production__ version);
    * __/.expo-shared/__: Contains all the shared emulator configuration files (_Expo_);

- Sources:
    * __/assets/icon.png__: App main icon image file;
    * __/assets/splash.png__: App main spash image file;
    * __/backend/prisma/datamodel.prisma__: Prisma Data Model definition
    * __/backend/prisma/prisma.yml__: Prisma Database client configuration
    * __/backend/src/index.js__: Back-End server JavaScript module;
    * __/backend/src/schema.graphql__: GraphQL Database schema;
    * __/backend/src/resolvers/Mutation.js__: GraphQL Mutation definitions;
    * __/backend/src/resolvers/Query.js__: GraphQL Query definitions;
    * __/backend/src/resolvers/Subscription.js__: GraphQL Subscription definitions;
    * __/<section-name\>.js__: Section module
        - Includes:
            - __\<function-name\>__: Common proprietary and third-party modules import;
    * __/app.json/__: App main configuration file;
    * __/server.js/__: Back-End dynamic server JavaScript module;

## Repository

- .gitignore (Production)
    * _Bundle default files_;
    * __/\_\_tests\_\_/__: Unit testing files (JavaScript);
    * __/node_modules/:__ Full-Stack Front-End dependencies (_NodeJS_);
    * __!/.gitignore:__ Repository configuration file;
    * __/.*:__ Various system and configuration files;
    * __/babel.config.js/__: ES6 compiler configuration files (_JavaScript_);
    * __/server.js:__ Back-End dynamic server configuration file (_NodeJS_);
    * __!/app.json/:__ App main configuration file (_JavaScript_);
    * __/*.json:__ Full-Stack Front-End various configuration files;
    * __.DS_Store__: OS filesystem indexing file (_Mac OS X_);


I.e.

```
    # Repository - Configuration
    node_modules/**/*
    .expo/*
    npm-debug.*
    *.jks
    *.p12
    *.key
    *.mobileprovision
    /__tests__
    /.edirotconfig
    !/.gitignore
    /.*
    /babel.config.js
    /server.js
    !/app.json
    /*.json
    .vscode
    .DS_Store
```


### Branches

There are three branches, defined as:

- __develop__ (Development);
- __staging__ (Beta);
- __master__ (Production - _Default_);

Contributions implement the GitFlow framework (https://tinyurl.com/zt4vys8).
Please read about its specifications before commit on any branch.

### Commits

- __< Label/Title >: < Description >__;

- __Label__: Implementation subject identification label (if expected);
- __Title__: Short unique naming of the implementation subject
- __Description__: Short descriptive note of the implementation done;

I.e.

```
	Update: Icons updated;
```


### Merges

- __staging__: merging from __develop__;
- __master__: merging from __staging__;


### Releases

The releasing process follows the SemVer specification (https://semver.org/).
Please read about its guidelines before draft any release.


## Host

### Essential files^!

- __.ftpquota__
- __revisions.log__

^! __Not delete__
