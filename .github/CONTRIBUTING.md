# Best Practices

## Styles & Coding

- HTML & CSS follow in general the [Google Style Guide](https://github.com/google/styleguide) conventions;
- JavaScript follows the [AirBnB Style Guide](https://github.com/airbnb/javascript) conventions;
- Custom CSS follows the [BEM](http://getbem.com/) convention;

Please be sure to check and follow them before attempt any modification to the sources, in order to preserve the general integrity of the project patterns.
Third-party linter plugins like ESLint, Prettier, stylelint or any other similar resource are welcome (configuration files of the mentioned ones are already present).

### Branches

There are three branches, defined as:

- **develop** (Development);
- **staging** (Staging);
- **master** (Production - _Default_);

Contributions implement the [GitFlow](https://tinyurl.com/zt4vys8) framework.
Please read about its specifications before commit on any branch.

### Commits

Official Udacity Git commit message style guide is used. Please [consult the docs](http://udacity.github.io/git-styleguide/) for details.

### Merges

- **staging**: merging from **develop**;
- **master**: merging from **staging**;

### Releases

The releasing process follows the [SemVer](https://semver.org/) specification.
Please read about its guidelines before draft any release.
