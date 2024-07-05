[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![GitHub Tag](https://img.shields.io/github/v/tag/osmlab/osm-request)](https://github.com/osmlab/osm-request/tags)
[![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/osmlab/osm-request/build-tests-coverage.yml)](https://github.com/osmlab/osm-request/actions/workflows/build-tests-coverage.yml)
[![Coverage Status](https://coveralls.io/repos/github/osmlab/osm-request/badge.svg?branch=develop)](https://coveralls.io/github/osmlab/osm-request?branch=develop)

# OSM Request

Request the [OSM API](https://wiki.openstreetmap.org/wiki/API) (v0.6) from Javascript, with promises :)

## Installation

```sh
npm install osm-request
```

## Usage

The full documentation of osm-request API is detailed in [the API documentation](API.md).

OSM Request use the same configurations properties as [osm-auth 2.5.0](https://github.com/osmlab/osm-auth). So you can define your options in a constante conf variable and use it both for osm-request and osm-auth.

### Register your OAuth 2 application

1. Open https://www.openstreetmap.org/oauth2/applications
2. Click on `Register new application`
3. Choose a `name` for your app, example: `demo-app`
4. Choose a `Redirect URI`
    - For development, you can choose https://localhost and some port, it should be https.
    - For production, you can choose the url of your app, it should be https.
5. Choose the permission you need for your app.
    - read_prefs is the minimum
    - write_api is needed if your app can edit data
6. Consider choosing more permissions if needed
    - Read user preferences (read_prefs)
    - Modify user preferences (write_prefs)
    - Create diary entries, comments and make friends (write_diary)
    - Modify the map (write_api)
    - Read private GPS traces (read_gpx)
    - Upload GPS traces (write_gpx)
    - Modify notes (write_notes)
    - Redact map data (write_redactions)
    - Sign-in using OpenStreetMap (openid)
7. Click on `Register`
8. Make sure to copy the `Client ID`
9. The `Client Secret` is not needed, no need to copy it, also make sure not to disclose it

Note that OAuth 2.0 do no need the `Client Secret` to work. So it is safe to publish the `Client ID` of your app online. For example, you can create a browser/JavaScript app containing your `Client ID` and publish it online (on GitHub pages, etc).

### Example with single page and auto login form

The bellow example only show how to use osm-request. But to work, it needs first that you connect the user of your app to OSM throught osm-auth. To connect your user, please read osm-auth [readme](https://github.com/osmlab/osm-auth)

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

const osmRequest = new OsmRequest(conf);

async function start() {
  let element = await osmRequest.fetchElement('node/3683625932');
  element = osmRequest.setTag(element, 'key', 'value');
  element = osmRequest.setTags(element, {
    key1: 'value1',
    key2: 'value2',
    key3: 'value3',
  });
  element = osmRequest.removeTag(element, 'key2');
  element = osmRequest.setTimestampToNow(element);
  element = osmRequest.setCoordinates(element, 1.234, 0.456);

  const changesetId = await osmRequest.createChangeset('Created by me', 'My changeset comment');
  const isChangesetStillOpen = await osmRequest.isChangesetStillOpen(changesetId);
  const newElementVersion = await osmRequest.sendElement(element, changesetId);
  element = osmRequest.setVersion(element, newElementVersion);
}

start();
```

For the OSM dev instance, use that apiUrl: https://api06.dev.openstreetmap.org

## Contribute

To start contribute on this project, you can retrieve code using the following commands:

```sh
git clone git@github.com:osmlab/osm-request.git
cd osm-request
npm install
npm run watch
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
git checkout develop
git pull origin develop
npm version patch -m "release: %s"
npm publish
git checkout master
git pull origin master
git merge develop
git push origin master
```

  `npm version` tests the code, builds it and updates the doc. Then it upgrades the package version number according to the used keyword (patch, minor or major) and commits the modifications in Git (with a proper version tag). Finally, it pushes it to repository with the tag.

## Apps or libs using osm-request

- [Balluchon](https://gitlab.limos.fr/iia_braikeh/balluchon)
- [BANCO](https://github.com/PanierAvide/EditeurCommercesOSMFR)
- [Bike Ottawa Interactive Maps](https://github.com/BikeOttawa/maps.bikeottawa.ca-frontend)
- [Busy-Hours](https://github.com/Jungle-Bus/Busy-Hours)
- [Ça reste ouvert](https://github.com/caresteouvert/caresteouvert_backend)
- [OSM Mobile tag it](https://github.com/toutpt/osm-mobile-tagit)
- [osm-edit-bundle](https://www.npmjs.com/package/osm-edit-bundle)
- [OsmInEdit](https://framagit.org/PanierAvide/osminedit)
- [Parking Mapper](https://github.com/Binnette/parking-mapper)
- [Pic4Review](https://framagit.org/Pic4Carto/Pic4Review)
- [POIEditor](https://github.com/francois2metz/poieditor)
- [ProjetDuMois](https://github.com/vdct/ProjetDuMois)
- [tumulus](https://github.com/superrache/tumulus)
