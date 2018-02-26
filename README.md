[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![GitHub release](https://img.shields.io/github/release/osmlab/osm-request.svg)](https://github.com/osmlab/osm-request/releases)
[![Build Status](https://api.travis-ci.org/osmlab/osm-request.svg?branch=develop)](http://travis-ci.org/osmlab/osm-request)
[![Coverage Status](https://coveralls.io/repos/github/osmlab/osm-request/badge.svg?branch=develop)](https://coveralls.io/github/osmlab/osm-request?branch=develop)

# OSM Request

Request the [OSM API](https://wiki.openstreetmap.org/wiki/API) (v0.6) from Javascript, with promises :)


## Installation

```sh
$ npm install osm-request
```


## Usage

The full documentation of osm-request API is detailed in [the API documentation](API.md).

### Example

TODO


## Contribute

To start contribute on this project, you can retrieve code using the following commands:

```sh
$ git clone git@github.com:osmlab/osm-request.git
$ cd osm-request
$ npm install
$ npm run watch
```

This project uses a specific work flow for branches:

* `master` branch is dedicated to releases, managed by repo maintainers
* `develop` branch is for currently developed version, managed by repo maintainers
* `feature/...` branches are for all developers, working on a particular feature

Pull requests are welcome, as the project is fully open-source. If you want to work on new features, please create a branch named `feature/yourFeatureName`. When work is done, open a pull request to merge your branch on `develop` branch. The code will be reviewed by one or several developers before being merged, in order to keep a good code quality.
