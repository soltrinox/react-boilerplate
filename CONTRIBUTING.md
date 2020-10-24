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
    * __/backend/__: Contains all the shared back-end scripts (__development__/__production__ version);
    * __/backend/prisma/__: Contains all the shared Back-End Database client scripts;
    * __/backend/src/__: Contains all the shared Back-End scripts (__development__ version);
    * __/backend/src/resolvers/__: Contains all the shared Back-End resolvers scripts (__development__/__production__ version);
    * __/public/img/__: Contains all the iconographic assets;
    * __/src/__: Contains all the shared scripts (__development__ version);
    * __/src/components/__: Contains all the shared app component scripts;
    * __/src/css/__: Contains all the shared styles (__development__ version);
    * __/src/sass/__: Contains all the shared preprocessed styles;
    * __/src/sass/\<section_name\>/__: Contains all the section preprocessed styles;
    * __/src/\_\_tests\_\_/__: Contains all the shared unit tests;
    * __/src/\_\_tests\_\_/\_\_snapshots\_\___: Contains all the shared snapshot unit tests;
    * __/lib/__: Contains all the deploy manager utility recipes;

- Sources:
    * __/backend/prisma/datamodel.prisma__: Prisma Data Model definition
    * __/backend/prisma/prisma.yml__: Prisma Database client configuration
    * __/backend/src/index.js__: Back-End server JavaScript module;
    * __/backend/src/schema.graphql__: GraphQL Database schema;
    * __/backend/src/resolvers/Mutation.js__: GraphQL Mutation definitions;
    * __/backend/src/resolvers/Query.js__: GraphQL Query definitions;
    * __/backend/src/resolvers/Subscription.js__: GraphQL Subscription definitions;
    * __/components/<section-name\>.js__: Section module
        - Includes:
            - __/sass/<section-name\>.scss__: Section style preprocessor import;
            - __\<function-name\>__: Common proprietary and third-party modules import;
    * __/public/manifest.json__: Progressive Web App manifest file;
    * __/test/<section_name\>.test.js__: Component testing assertion definitions
    * __/src/index.js__: Main module
    - Includes:
        - __/css/index.css__: Main style preprocessor import;
        - __\<function-name\>__: Common proprietary and third-party modules import;
    * __/src/install.js__: Progressive Web App local installation settings;
    * __/src/serviceWorker.js__: Progressive Web App service worker configuration;
    * __/src/serviceWorkerCustom.js__: Progressive Web App service worker custom configuration;
    * __/src/css/<section_name\>.css__: Section style file;
    * __/src/sass/<section_name\>.scss__: Section style preprocessor file;


## Repository

- .gitignore (Production)
    * _Bundle default files_;
    * __/backend/node_modules/:__ Full-Stack Front-End dependencies (_NodeJS_);
    * __/node_modules/:__ Full-Stack Front-End dependencies (_NodeJS_);
    * __!/.gitignore:__ Repository configuration file;
    * __/.*:__ Various system and configuration files;
    * __/config-overrides.js:__ Bundle configuration overrides file;
    * __/server.js:__ Back-End dynamic server configuration file (_NodeJS_);
    * __/*.json:__ Full-Stack Front-End various configuration files;


I.e.

```
    # Repository - Configuration
    # dependencies
    /backend/node_modules
    /node_modules
    /.pnp
    .pnp.js
    # testing
    /coverage
    # production
    /build
    # misc
    /public
    /src
    !/.gitignore
    /.*
    /config-overrides.js
    /server.js
    /*.json
    .DS_Store
    .env.local
    .env.development.local
    .env.test.local
    .env.production.local
    npm-debug.log*
    yarn-debug.log*
    yarn-error.log*
```


### Branches

There are three branches, defined as:

- __develop__ (Development);
- __staging__ (Beta);
- __master__ (Production - _Default_);

Contributions implement the GitFlow framework (https://tinyurl.com/zt4vys8).
Please read about its specifications before commit on any branch.

### Commits

Official Udacity Git commit message style guide is used. Please consult the docs (http://udacity.github.io/git-styleguide/) for details.


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
