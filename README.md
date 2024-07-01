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

OSM Request use the same configurations properties as [osm-auth 2.5.0](https://github.com/osmlab/osm-auth). So you can define your options in a constante conf variable and use it both for osm-request and osm-auth.

### Example with single page and auto login form

```javascript
import OsmRequest from 'osm-request';

const conf = {
  scope: 'read_prefs write_api', // To customize
  client_id: "YOUR_CLIENT_ID", // To customize
  redirect_uri: '',
  url: 'https://www.openstreetmap.org',
  apiUrl: 'https://api.openstreetmap.org',
  auto: true,
  singlepage: true
};

const osm = new OsmRequest(conf);

async function start() {
  let element = await osm.fetchElement('node/3683625932');
  element = osm.setTag(element, 'key', 'value');
  element = osm.setTags(element, {
    key1: 'value1',
    key2: 'value2',
    key3: 'value3',
  });
  element = osm.removeTag(element, 'key2');
  element = osm.setTimestampToNow(element);
  element = osm.setCoordinates(element, 1.234, 0.456);

  const changesetId = await osm.createChangeset('Created by me', 'My changeset comment');
  const isChangesetStillOpen = await osm.isChangesetStillOpen(changesetId);
  const newElementVersion = await osm.sendElement(element, changesetId);
  element = osm.setVersion(element, newElementVersion);
}

start();
```

For the OSM dev instance, use that apiUrl: https://api06.dev.openstreetmap.org

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

### eslint version 8.X

For now eslint stays in version 8.X. We need to wait until babel, babel plugins and eslint plugins (that we use), are compatibles with version 9.X of eslint.

## Make a release

```sh
$ git checkout develop
$ git pull origin develop
$ npm version patch -m "release: %s"
$ npm publish
$ git checkout master
$ git pull origin master
$ git merge develop
$ git push origin master
```

  `npm version` tests the code, builds it and updates the doc. Then it upgrades the package version number according to the used keyword (patch, minor or major) and commits the modifications in Git (with a proper version tag). Finally, it pushes it to repository with the tag.
