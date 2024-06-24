[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![GitHub release](https://img.shields.io/github/release/osmlab/osm-request.svg)](https://github.com/osmlab/osm-request/releases)
[![Build Status](https://api.travis-ci.org/osmlab/osm-request.svg?branch=develop)](http://travis-ci.org/osmlab/osm-request)
[![Coverage Status](https://coveralls.io/repos/github/osmlab/osm-request/badge.svg?branch=develop)](https://coveralls.io/github/osmlab/osm-request?branch=develop)

# OSM Request

Request the [OSM API](https://wiki.openstreetmap.org/wiki/API) (v0.6) from Javascript, with promises :)

**⚠ That project is in an heavy development phase. Do not use it until the first stable release.**


## Installation

```sh
$ npm install osm-request
```


## Usage

The full documentation of osm-request API is detailed in [the API documentation](API.md).

### Example

```javascript
import OsmRequest from 'osm-request';

const osm = new OsmRequest({
  apiUrl: 'https://www.openstreetmap.org',
  oauthConsumerKey: '...',
  oauthSecret: '...',
  oauthUserToken: '...',
  oauthUserTokenSecret: '...',
});

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
