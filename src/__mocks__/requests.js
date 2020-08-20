export const fetchElementRequest = jest.fn().mockImplementation(() => ({
  osm: {
    $: {
      version: '0.6',
      generator: 'CGImap 0.6.0 (9711 thorn-01.openstreetmap.org)',
      copyright: 'OpenStreetMap and contributors',
      attribution: 'http://www.openstreetmap.org/copyright',
      license: 'http://opendatacommons.org/licenses/odbl/1-0/'
    },
    node: [
      {
        $: {
          id: '3683625932',
          visible: 'true',
          version: '1',
          changeset: '33150668',
          timestamp: '2015-08-06T09:49:47Z',
          user: 'Vinber-Num&Lib',
          uid: '2568974',
          lat: '44.8331455',
          lon: '-0.5936602'
        },
        tag: [
          {
            $: {
              k: 'amenity',
              v: 'drinking_water'
            }
          }
        ]
      }
    ]
  },
  _id: '3683625932',
  _type: 'node'
}));

export const fetchWaysForNodeRequest = jest.fn().mockImplementation(() => ({
  _id: '536287533',
  _type: 'way',
  osm: {
    $: {
      attribution: 'http://www.openstreetmap.org/copyright',
      copyright: 'OpenStreetMap and contributors',
      generator: 'CGImap 0.6.0 (9711 thorn-01.openstreetmap.org)',
      license: 'http://opendatacommons.org/licenses/odbl/1-0/',
      version: '0.6'
    },
    way: [
      {
        $: {
          changeset: '62261628',
          id: '536287533',
          timestamp: '2018-09-03T23:46:20Z',
          uid: '1443767',
          user: 'Olyon',
          version: '3',
          visible: 'true'
        },
        nd: [
          {
            $: {
              ref: '5195549178'
            }
          },
          {
            $: {
              ref: '5336441517'
            }
          },
          {
            $: {
              ref: '5336441515'
            }
          },
          {
            $: {
              ref: '5336441519'
            }
          },
          {
            $: {
              ref: '5336441518'
            }
          },
          {
            $: {
              ref: '1153562749'
            }
          }
        ],
        tag: [
          {
            $: {
              k: 'highway',
              v: 'primary'
            }
          },
          {
            $: {
              k: 'lanes',
              v: '1'
            }
          },
          {
            $: {
              k: 'maxspeed',
              v: '80'
            }
          },
          {
            $: {
              k: 'old_ref',
              v: 'N 512'
            }
          },
          {
            $: {
              k: 'oneway',
              v: 'yes'
            }
          },
          {
            $: {
              k: 'ref',
              v: 'D 2152'
            }
          }
        ]
      }
    ]
  }
}));

export const fetchNotesRequest = jest.fn().mockImplementation(() => [
  {
    lon: '0.5891000',
    lat: '44.4068500',
    id: '1369237',
    url: 'https://api.openstreetmap.org/api/0.6/notes/1369237',
    comment_url: 'https://api.openstreetmap.org/api/0.6/notes/1369237/comment',
    close_url: 'https://api.openstreetmap.org/api/0.6/notes/1369237/close',
    date_created: '2018-04-22 17:54:49 UTC',
    status: 'open',
    comments: [
      {
        date: '2018-04-22 17:54:49 UTC',
        action: 'opened',
        text: 'Chez Florentin, Faustine, Aimé, Julien et Marine.',
        html: '<p>Chez Florentin, Faustine, Aimé, Julien et Marine.</p>'
      },
      {
        date: '2018-04-22 17:57:56 UTC',
        action: 'commented',
        text:
          "c'est quoi ? une note personnelle ou le nom d'un établissement ?",
        html:
          "<p>c'est quoi ? une note personnelle ou le nom d'un établissement ?</p>"
      }
    ]
  },
  {
    lon: '0.1802000',
    lat: '44.4890700',
    id: '1270165',
    url: 'https://api.openstreetmap.org/api/0.6/notes/1270165',
    reopen_url: 'https://api.openstreetmap.org/api/0.6/notes/1270165/reopen',
    date_created: '2018-01-16 15:28:34 UTC',
    status: 'closed',
    date_closed: '2018-04-20 11:43:00 UTC',
    comments: [
      {
        date: '2018-01-16 15:28:34 UTC',
        action: 'opened',
        text: 'carrefour market',
        html: '<p>carrefour market</p>'
      },
      {
        date: '2018-04-20 11:43:00 UTC',
        uid: '2533303',
        user: 'opline',
        user_url: 'https://api.openstreetmap.org/user/opline',
        action: 'closed',
        text: '',
        html: '<p></p>'
      }
    ]
  },
  {
    lon: '0.7933400',
    lat: '44.4201400',
    id: '1365069',
    url: 'https://api.openstreetmap.org/api/0.6/notes/1365069',
    comment_url: 'https://api.openstreetmap.org/api/0.6/notes/1365069/comment',
    close_url: 'https://api.openstreetmap.org/api/0.6/notes/1365069/close',
    date_created: '2018-04-18 17:46:14 UTC',
    status: 'open',
    comments: [
      {
        date: '2018-04-18 17:46:14 UTC',
        action: 'opened',
        text: 'Labro',
        html: '<p>Labro</p>'
      }
    ]
  },
  {
    lon: '0.2216578',
    lat: '44.5063613',
    id: '1106518',
    url: 'https://api.openstreetmap.org/api/0.6/notes/1106518',
    comment_url: 'https://api.openstreetmap.org/api/0.6/notes/1106518/comment',
    close_url: 'https://api.openstreetmap.org/api/0.6/notes/1106518/close',
    date_created: '2017-08-16 15:41:56 UTC',
    status: 'open',
    comments: [
      {
        date: '2017-08-16 15:41:56 UTC',
        action: 'opened',
        text: 'Monplaisir',
        html: '<p>Monplaisir</p>'
      },
      {
        date: '2017-08-16 15:42:43 UTC',
        action: 'commented',
        text: 'Les Carbonnières\n',
        html: '<p>Les Carbonnières\n</p>'
      },
      {
        date: '2017-08-17 16:57:49 UTC',
        uid: '379182',
        user: 'Metaltyty',
        user_url: 'https://api.openstreetmap.org/user/Metaltyty',
        action: 'commented',
        text: 'lieu-dit, rue ou résidence?',
        html: '<p>lieu-dit, rue ou résidence?</p>'
      },
      {
        date: '2017-08-24 15:44:07 UTC',
        action: 'commented',
        text: 'Lieu dit',
        html: '<p>Lieu dit</p>'
      },
      {
        date: '2017-10-22 16:06:12 UTC',
        uid: '2533303',
        user: 'opline',
        user_url: 'https://api.openstreetmap.org/user/opline',
        action: 'commented',
        text: 'Monplaisir ou les carbonnières ? Vous nous proposez deux noms',
        html:
          '<p>Monplaisir ou les carbonnières ? Vous nous proposez deux noms</p>'
      },
      {
        date: '2018-04-08 19:35:56 UTC',
        uid: '2568974',
        user: 'Vinber-Num&Lib',
        user_url: 'https://api.openstreetmap.org/user/Vinber-Num&Lib',
        action: 'commented',
        text: 'on cloture, pas de réactions ?',
        html: '<p>on cloture, pas de réactions ?</p>'
      }
    ]
  }
]);

export const fetchNotesSearchRequest = jest.fn().mockImplementation(() => ({
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [18.9413056, 50.9155037]
      },
      properties: {
        id: 1782041,
        url: 'https://api.openstreetmap.org/api/0.6/notes/1782041.json',
        comment_url:
          'https://api.openstreetmap.org/api/0.6/notes/1782041/comment.json',
        close_url:
          'https://api.openstreetmap.org/api/0.6/notes/1782041/close.json',
        date_created: '2019-05-17 12:19:30 UTC',
        status: 'open',
        comments: [
          {
            date: '2019-05-17 12:19:30 UTC',
            uid: 6475221,
            user: 'Dominik Kumiszczo',
            user_url: 'https://api.openstreetmap.org/user/Dominik%20Kumiszczo',
            action: 'opened',
            text:
              '"Tu nie ma hydrantu, potwierdzenie na google street view, ja widzialem osobiscie"\nThe place has gone or never existed. This is an auto-generated note from MAPS.ME application: a user reports a POI that is visible on a map (which can be outdated), but cannot be found on the ground.\nPOI has no name\nPOI types: emergency-fire_hydrant\nOSM data version: 2019-04-19T10:36:02Z\n #mapsme',
            html:
              '<p>"Tu nie ma hydrantu, potwierdzenie na google street view, ja widzialem osobiscie"\n<br />The place has gone or never existed. This is an auto-generated note from MAPS.ME application: a user reports a POI that is visible on a map (which can be outdated), but cannot be found on the ground.\n<br />POI has no name\n<br />POI types: emergency-fire_hydrant\n<br />OSM data version: 2019-04-19T10:36:02Z\n<br /> #mapsme</p>'
          }
        ]
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [22.9105161, 45.8820898]
      },
      properties: {
        id: 1781930,
        url: 'https://api.openstreetmap.org/api/0.6/notes/1781930.json',
        comment_url:
          'https://api.openstreetmap.org/api/0.6/notes/1781930/comment.json',
        close_url:
          'https://api.openstreetmap.org/api/0.6/notes/1781930/close.json',
        date_created: '2019-05-17 09:49:13 UTC',
        status: 'open',
        comments: [
          {
            date: '2019-05-17 09:49:13 UTC',
            uid: 9582846,
            user: 'CrihanMircea',
            user_url: 'https://api.openstreetmap.org/user/CrihanMircea',
            action: 'opened',
            text:
              '"Hidrant subteran tip B-B"\nPOI has no name\nPOI types: emergency-fire_hydrant\nOSM data version: 2019-03-28T14:13:02Z\n #mapsme',
            html:
              '<p>"Hidrant subteran tip B-B"\n<br />POI has no name\n<br />POI types: emergency-fire_hydrant\n<br />OSM data version: 2019-03-28T14:13:02Z\n<br /> #mapsme</p>'
          }
        ]
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [36.2521473, 54.5943915]
      },
      properties: {
        id: 1781857,
        url: 'https://api.openstreetmap.org/api/0.6/notes/1781857.json',
        comment_url:
          'https://api.openstreetmap.org/api/0.6/notes/1781857/comment.json',
        close_url:
          'https://api.openstreetmap.org/api/0.6/notes/1781857/close.json',
        date_created: '2019-05-17 08:40:50 UTC',
        status: 'open',
        comments: [
          {
            date: '2019-05-17 08:40:50 UTC',
            uid: 9863039,
            user: 'Муравей',
            user_url:
              'https://api.openstreetmap.org/user/%D0%9C%D1%83%D1%80%D0%B0%D0%B2%D0%B5%D0%B9',
            action: 'opened',
            text:
              '"ПГ"\nPOI has no name\nPOI types: emergency-fire_hydrant\nOSM data version: 2019-04-19T10:36:02Z\n #mapsme',
            html:
              '<p>"ПГ"\n<br />POI has no name\n<br />POI types: emergency-fire_hydrant\n<br />OSM data version: 2019-04-19T10:36:02Z\n<br /> #mapsme</p>'
          }
        ]
      }
    }
  ]
}));

export const fetchNoteByIdRequest = jest.fn().mockImplementation(() => ({
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: [22.9105161, 45.8820898]
  },
  properties: {
    id: 1781930,
    url: 'https://api.openstreetmap.org/api/0.6/notes/1781930.json',
    comment_url:
      'https://api.openstreetmap.org/api/0.6/notes/1781930/comment.json',
    close_url: 'https://api.openstreetmap.org/api/0.6/notes/1781930/close.json',
    date_created: '2019-05-17 09:49:13 UTC',
    status: 'open',
    comments: [
      {
        date: '2019-05-17 09:49:13 UTC',
        uid: 9582846,
        user: 'CrihanMircea',
        user_url: 'https://api.openstreetmap.org/user/CrihanMircea',
        action: 'opened',
        text:
          '"Hidrant subteran tip B-B"\nPOI has no name\nPOI types: emergency-fire_hydrant\nOSM data version: 2019-03-28T14:13:02Z\n #mapsme',
        html:
          '<p>"Hidrant subteran tip B-B"\n<br />POI has no name\n<br />POI types: emergency-fire_hydrant\n<br />OSM data version: 2019-03-28T14:13:02Z\n<br /> #mapsme</p>'
      }
    ]
  }
}));

export const createNoteRequest = jest.fn().mockImplementation(
  () => `<?xml version="1.0" encoding="UTF-8"?>
<osm version="0.6" generator="OpenStreetMap server" copyright="OpenStreetMap and contributors" attribution="http://www.openstreetmap.org/copyright" license="http://opendatacommons.org/licenses/odbl/1-0/">
<note lon="-0.456" lat="1.234">
  <id>16341</id>
  <url>https://master.apis.dev.openstreetmap.org/api/0.6/notes/16341</url>
  <comment_url>https://master.apis.dev.openstreetmap.org/api/0.6/notes/16341/comment</comment_url>
  <close_url>https://master.apis.dev.openstreetmap.org/api/0.6/notes/16341/close</close_url>
  <date_created>2019-05-17 13:14:21 UTC</date_created>
  <status>open</status>
  <comments>
    <comment>
      <date>2019-05-17 13:14:21 UTC</date>
      <action>opened</action>
      <text>there is a problem here</text>
      <html>&lt;p&gt;there is a problem here&lt;/p&gt;</html>
    </comment>
  </comments>
</note>
</osm>
`
);

export const fetchUserRequest = jest.fn().mockImplementation(() => ({
  account_created: '2010-01-02T13:40:42Z',
  blocks: {
    received: [
      {
        active: '0',
        count: '1'
      }
    ]
  },
  changesets: {
    count: '3616'
  },
  'contributor-terms': {
    agreed: 'true'
  },
  description:
    'OpenStreetMap passionate, I contribute mainly in the west of France on various subjects : indoor mapping, street equipment, advertisement...',
  display_name: 'PanierAvide',
  id: '214436',
  img: {
    href:
      'https://www.openstreetmap.org/rails/active_storage/representations/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBamNZIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--576881ff3e6c38ff381c9ecceff09761c61951db/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCam9MY21WemFYcGxTU0lOTVRBd2VERXdNRDRHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--efdc66963555b7419037018ba117eb1fea762dc5/Tux_avatar.png'
  },
  roles: ' ',
  traces: {
    count: '95'
  }
}));

export const createChangesetRequest = jest.fn().mockImplementation(() => 1234);
export const changesetCheckRequest = jest.fn().mockImplementation(() => true);

export const changesetGetRequest = jest.fn().mockImplementation(
  () => `<?xml version="1.0" encoding="UTF-8"?>
<osm version="0.6" generator="CGImap 0.6.1 (5071 thorn-01.openstreetmap.org)" copyright="OpenStreetMap and contributors" attribution="http://www.openstreetmap.org/copyright" license="http://opendatacommons.org/licenses/odbl/1-0/">
 <changeset id="12345" created_at="2007-04-11T14:14:22Z" closed_at="2007-04-11T16:22:41Z" open="false" user="A_Larsson" uid="1684" min_lat="60.4468373" min_lon="14.1935007" max_lat="60.5287575" max_lon="14.2675181" comments_count="0"/>
</osm>`
);

export const fetchChangesetsRequest = jest.fn().mockImplementation(
  () => `<?xml version="1.0" encoding="UTF-8"?>
<osm version="0.6" generator="OpenStreetMap server" copyright="OpenStreetMap and contributors" attribution="http://www.openstreetmap.org/copyright" license="http://opendatacommons.org/licenses/odbl/1-0/">
<changeset id="70354642" created_at="2019-05-17T12:20:23Z" open="false" comments_count="1" changes_count="13" closed_at="2019-05-17T12:20:24Z" min_lat="-21.2063652" min_lon="-113.7673331" max_lat="50.6916719" max_lon="55.5956610" uid="1737608" user="ForstEK">
  <tag k="created_by" v="Level0 v1.2"/>
  <tag k="comment" v="fix mistakes in street cabinets by taginfo statistics and according wiki (https://wiki.openstreetmap.org/wiki/Tag%3Aman_made%3Dstreet_cabinet)"/>
</changeset>
<changeset id="70352483" created_at="2019-05-17T11:19:16Z" open="false" comments_count="0" changes_count="2" closed_at="2019-05-17T11:19:21Z" min_lat="42.5759727" min_lon="-3.3780966" max_lat="48.8128754" max_lon="9.4613199" uid="7344022" user="Ikkibird">
  <tag k="created_by" v="StreetComplete 12.0"/>
  <tag k="source" v="survey"/>
  <tag k="comment" v="Add road surfaces"/>
  <tag k="StreetComplete:quest_type" v="AddRoadSurface"/>
</changeset>
<changeset id="70351263" created_at="2019-05-17T10:44:37Z" open="true" comments_count="0" changes_count="43" min_lat="43.0549671" min_lon="-76.1438390" max_lat="52.5100814" max_lon="13.4560026" uid="290680" user="wheelmap_visitor">
  <tag k="created_by" v="rosemary v0.4.4"/>
  <tag k="comment" v="Modified via wheelmap.org"/>
</changeset>
</osm>`
);

export const multiFetchElementsByTypeRequest = jest.fn().mockImplementation(
  () => `<?xml version="1.0" encoding="UTF-8"?>
<osm version="0.6" generator="CGImap 0.6.1 (9425 thorn-03.openstreetmap.org)" copyright="OpenStreetMap and contributors" attribution="http://www.openstreetmap.org/copyright" license="http://opendatacommons.org/licenses/odbl/1-0/">
 <node id="123" visible="true" version="8" changeset="38852974" timestamp="2016-04-25T10:30:27Z" user="Noen" uid="605010" lat="59.9503286" lon="10.7899198"/>
 <node id="456" visible="true" version="2" changeset="54683425" timestamp="2017-12-16T15:58:37Z" user="Reitstoen_import" uid="3296383" lat="68.3744349" lon="16.5711354"/>
 <node id="789" visible="true" version="6" changeset="336150" timestamp="2008-10-14T20:00:50Z" user="Wojak" uid="51161" lat="59.8925629" lon="10.5063028"/>
</osm>`
);

export const fetchMapByBboxRequest = jest.fn().mockImplementation(() => ({
  osm: {
    $: {
      version: '0.6',
      generator: 'CGImap 0.6.1 (11417 thorn-02.openstreetmap.org)',
      copyright: 'OpenStreetMap and contributors',
      attribution: 'http://www.openstreetmap.org/copyright',
      license: 'http://opendatacommons.org/licenses/odbl/1-0/'
    },
    bounds: [
      {
        $: {
          minlat: '47.2135900',
          minlon: '-1.5565400',
          maxlat: '47.2145300',
          maxlon: '-1.5540400'
        }
      }
    ],
    node: [
      {
        $: {
          id: '266221357',
          visible: 'true',
          version: '7',
          changeset: '18288835',
          timestamp: '2013-10-10T21:54:14Z',
          user: 'tchaik',
          uid: '1130870',
          lat: '47.2146551',
          lon: '-1.5550901'
        }
      },
      {
        $: {
          id: '266221362',
          visible: 'true',
          version: '15',
          changeset: '50500325',
          timestamp: '2017-07-23T12:17:35Z',
          user: 'Virgile1994',
          uid: '362997',
          lat: '47.2136820',
          lon: '-1.5548290'
        },
        tag: [
          {
            $: {
              k: 'highway',
              v: 'mini_roundabout'
            }
          }
        ]
      },
      {
        $: {
          id: '266221363',
          visible: 'true',
          version: '6',
          changeset: '47195696',
          timestamp: '2017-03-27T09:10:22Z',
          user: "Carto'Cité",
          uid: '5426135',
          lat: '47.2129483',
          lon: '-1.5541300'
        }
      }
    ],
    way: [
      {
        $: {
          id: '24485913',
          visible: 'true',
          version: '17',
          changeset: '50500325',
          timestamp: '2017-07-23T12:17:46Z',
          user: 'Virgile1994',
          uid: '362997'
        },
        nd: [
          {
            $: {
              ref: '266221362'
            }
          },
          {
            $: {
              ref: '3373186168'
            }
          },
          {
            $: {
              ref: '4009374095'
            }
          },
          {
            $: {
              ref: '293038819'
            }
          },
          {
            $: {
              ref: '4009374093'
            }
          },
          {
            $: {
              ref: '1973845387'
            }
          },
          {
            $: {
              ref: '1973845376'
            }
          },
          {
            $: {
              ref: '266221363'
            }
          },
          {
            $: {
              ref: '1973845371'
            }
          },
          {
            $: {
              ref: '1973845366'
            }
          },
          {
            $: {
              ref: '309231223'
            }
          }
        ],
        tag: [
          {
            $: {
              k: 'access',
              v: 'destination'
            }
          },
          {
            $: {
              k: 'bicycle',
              v: 'yes'
            }
          },
          {
            $: {
              k: 'description',
              v: 'Zone à Trafic Limité'
            }
          },
          {
            $: {
              k: 'emergency',
              v: 'yes'
            }
          },
          {
            $: {
              k: 'foot',
              v: 'yes'
            }
          },
          {
            $: {
              k: 'goods',
              v: 'delivery'
            }
          },
          {
            $: {
              k: 'hgv',
              v: 'destination'
            }
          },
          {
            $: {
              k: 'highway',
              v: 'residential'
            }
          },
          {
            $: {
              k: 'lanes',
              v: '2'
            }
          },
          {
            $: {
              k: 'lit',
              v: 'yes'
            }
          },
          {
            $: {
              k: 'maxspeed',
              v: '30'
            }
          },
          {
            $: {
              k: 'motorcar',
              v: 'destination'
            }
          },
          {
            $: {
              k: 'motorcycle',
              v: 'destination'
            }
          },
          {
            $: {
              k: 'motor_vehicle',
              v: 'destination'
            }
          },
          {
            $: {
              k: 'name',
              v: 'Cours Olivier de Clisson'
            }
          },
          {
            $: {
              k: 'psv',
              v: 'yes'
            }
          },
          {
            $: {
              k: 'surface',
              v: 'asphalt'
            }
          },
          {
            $: {
              k: 'traffic_sign',
              v: 'FR:B30[30]'
            }
          },
          {
            $: {
              k: 'zone:maxspeed',
              v: 'FR:30'
            }
          }
        ]
      },
      {
        $: {
          id: '26685358',
          visible: 'true',
          version: '14',
          changeset: '53306072',
          timestamp: '2017-10-27T23:21:26Z',
          user: 'Cybereric',
          uid: '699868'
        },
        nd: [
          {
            $: {
              ref: '5137481606'
            }
          },
          {
            $: {
              ref: '5195043605'
            }
          },
          {
            $: {
              ref: '3096039517'
            }
          },
          {
            $: {
              ref: '292661268'
            }
          }
        ],
        tag: [
          {
            $: {
              k: 'access',
              v: 'yes'
            }
          },
          {
            $: {
              k: 'bicycle',
              v: 'designated'
            }
          },
          {
            $: {
              k: 'emergency',
              v: 'yes'
            }
          },
          {
            $: {
              k: 'foot',
              v: 'designated'
            }
          },
          {
            $: {
              k: 'goods',
              v: 'delivery'
            }
          },
          {
            $: {
              k: 'highway',
              v: 'pedestrian'
            }
          },
          {
            $: {
              k: 'lit',
              v: 'yes'
            }
          },
          {
            $: {
              k: 'motor_vehicle',
              v: 'destination'
            }
          },
          {
            $: {
              k: 'name',
              v: 'Rue Sainte-Catherine'
            }
          },
          {
            $: {
              k: 'surface',
              v: 'paving_stones'
            }
          }
        ]
      },
      {
        $: {
          id: '26690880',
          visible: 'true',
          version: '13',
          changeset: '52512215',
          timestamp: '2017-09-30T13:31:33Z',
          user: 'FRichard44',
          uid: '2516858'
        },
        nd: [
          {
            $: {
              ref: '292713474'
            }
          },
          {
            $: {
              ref: '1739990720'
            }
          },
          {
            $: {
              ref: '3096039520'
            }
          },
          {
            $: {
              ref: '3096039518'
            }
          },
          {
            $: {
              ref: '292661268'
            }
          },
          {
            $: {
              ref: '3096039516'
            }
          },
          {
            $: {
              ref: '1687898128'
            }
          },
          {
            $: {
              ref: '292713471'
            }
          },
          {
            $: {
              ref: '1557439747'
            }
          }
        ],
        tag: [
          {
            $: {
              k: 'access',
              v: 'yes'
            }
          },
          {
            $: {
              k: 'bicycle',
              v: 'destination'
            }
          },
          {
            $: {
              k: 'foot',
              v: 'designated'
            }
          },
          {
            $: {
              k: 'highway',
              v: 'footway'
            }
          },
          {
            $: {
              k: 'lit',
              v: 'yes'
            }
          },
          {
            $: {
              k: 'motorcycle',
              v: 'no'
            }
          },
          {
            $: {
              k: 'motor_vehicle',
              v: 'no'
            }
          },
          {
            $: {
              k: 'name',
              v: 'Allée Cassard'
            }
          },
          {
            $: {
              k: 'name:br',
              v: 'Alez Cassard'
            }
          },
          {
            $: {
              k: 'name:fr',
              v: 'Allée Cassard'
            }
          },
          {
            $: {
              k: 'source:name:br',
              v: 'ofis publik ar brezhoneg'
            }
          },
          {
            $: {
              k: 'surface',
              v: 'concrete'
            }
          }
        ]
      }
    ],
    relation: [
      {
        $: {
          id: '64031',
          visible: 'true',
          version: '75',
          changeset: '56703093',
          timestamp: '2018-02-26T21:06:41Z',
          user: 'Pj44300',
          uid: '405985'
        },
        member: [
          {
            $: {
              type: 'node',
              ref: '1574613517',
              role: 'stop'
            }
          },
          {
            $: {
              type: 'way',
              ref: '513266254',
              role: 'platform'
            }
          },
          {
            $: {
              type: 'node',
              ref: '1574613537',
              role: 'stop'
            }
          },
          {
            $: {
              type: 'way',
              ref: '513266277',
              role: 'platform'
            }
          },
          {
            $: {
              type: 'node',
              ref: '1574613532',
              role: 'stop'
            }
          },
          {
            $: {
              type: 'way',
              ref: '513266329',
              role: 'platform'
            }
          },
          {
            $: {
              type: 'node',
              ref: '1574627200',
              role: 'stop'
            }
          },
          {
            $: {
              type: 'way',
              ref: '156560791',
              role: 'platform'
            }
          },
          {
            $: {
              type: 'node',
              ref: '1574627229',
              role: 'stop'
            }
          },
          {
            $: {
              type: 'way',
              ref: '156560847',
              role: 'platform'
            }
          },
          {
            $: {
              type: 'node',
              ref: '1574627238',
              role: 'stop'
            }
          },
          {
            $: {
              type: 'way',
              ref: '156560812',
              role: 'platform'
            }
          },
          {
            $: {
              type: 'node',
              ref: '1574627233',
              role: 'stop'
            }
          },
          {
            $: {
              type: 'way',
              ref: '156560758',
              role: 'platform'
            }
          },
          {
            $: {
              type: 'node',
              ref: '1574627206',
              role: 'stop'
            }
          },
          {
            $: {
              type: 'way',
              ref: '156560762',
              role: 'platform'
            }
          },
          {
            $: {
              type: 'node',
              ref: '1573913312',
              role: 'stop'
            }
          },
          {
            $: {
              type: 'way',
              ref: '178277314',
              role: 'platform'
            }
          },
          {
            $: {
              type: 'node',
              ref: '1573909399',
              role: 'stop'
            }
          },
          {
            $: {
              type: 'way',
              ref: '286690619',
              role: 'platform'
            }
          },
          {
            $: {
              type: 'node',
              ref: '1573913309',
              role: 'stop'
            }
          },
          {
            $: {
              type: 'way',
              ref: '156560800',
              role: 'platform'
            }
          },
          {
            $: {
              type: 'node',
              ref: '1573830585',
              role: 'stop'
            }
          },
          {
            $: {
              type: 'way',
              ref: '156560795',
              role: 'platform'
            }
          },
          {
            $: {
              type: 'node',
              ref: '1573830595',
              role: 'stop'
            }
          },
          {
            $: {
              type: 'way',
              ref: '156560747',
              role: 'platform'
            }
          },
          {
            $: {
              type: 'node',
              ref: '1573830586',
              role: 'stop'
            }
          },
          {
            $: {
              type: 'way',
              ref: '156560829',
              role: 'platform'
            }
          },
          {
            $: {
              type: 'node',
              ref: '1573800311',
              role: 'stop'
            }
          },
          {
            $: {
              type: 'way',
              ref: '156560613',
              role: 'platform'
            }
          },
          {
            $: {
              type: 'node',
              ref: '1573645606',
              role: 'stop'
            }
          },
          {
            $: {
              type: 'way',
              ref: '156560619',
              role: 'platform'
            }
          },
          {
            $: {
              type: 'node',
              ref: '1573642018',
              role: 'stop'
            }
          },
          {
            $: {
              type: 'way',
              ref: '156560603',
              role: 'platform'
            }
          },
          {
            $: {
              type: 'node',
              ref: '1573642014',
              role: 'stop'
            }
          },
          {
            $: {
              type: 'node',
              ref: '296396199',
              role: 'stop'
            }
          },
          {
            $: {
              type: 'node',
              ref: '302674029',
              role: 'stop'
            }
          },
          {
            $: {
              type: 'node',
              ref: '302674023',
              role: 'stop'
            }
          },
          {
            $: {
              type: 'way',
              ref: '505664856',
              role: 'platform'
            }
          },
          {
            $: {
              type: 'node',
              ref: '302674015',
              role: 'stop'
            }
          },
          {
            $: {
              type: 'way',
              ref: '505664877',
              role: 'platform'
            }
          },
          {
            $: {
              type: 'node',
              ref: '302674011',
              role: 'stop'
            }
          },
          {
            $: {
              type: 'way',
              ref: '156560685',
              role: 'platform'
            }
          },
          {
            $: {
              type: 'node',
              ref: '302677573',
              role: 'stop'
            }
          },
          {
            $: {
              type: 'way',
              ref: '147086029',
              role: 'platform'
            }
          },
          {
            $: {
              type: 'node',
              ref: '302677676',
              role: 'stop'
            }
          },
          {
            $: {
              type: 'way',
              ref: '156560760',
              role: 'platform'
            }
          },
          {
            $: {
              type: 'node',
              ref: '302680659',
              role: 'stop'
            }
          },
          {
            $: {
              type: 'way',
              ref: '156560715',
              role: 'platform'
            }
          },
          {
            $: {
              type: 'node',
              ref: '302680657',
              role: 'stop'
            }
          },
          {
            $: {
              type: 'way',
              ref: '156560611',
              role: 'platform'
            }
          },
          {
            $: {
              type: 'node',
              ref: '302679787',
              role: 'stop'
            }
          },
          {
            $: {
              type: 'way',
              ref: '156560643',
              role: 'platform'
            }
          },
          {
            $: {
              type: 'node',
              ref: '302678221',
              role: 'stop'
            }
          },
          {
            $: {
              type: 'way',
              ref: '502473105',
              role: 'platform'
            }
          },
          {
            $: {
              type: 'node',
              ref: '1937874559',
              role: 'stop'
            }
          },
          {
            $: {
              type: 'way',
              ref: '501456699',
              role: 'platform'
            }
          },
          {
            $: {
              type: 'node',
              ref: '302678467',
              role: 'stop'
            }
          },
          {
            $: {
              type: 'way',
              ref: '156560743',
              role: 'platform'
            }
          },
          {
            $: {
              type: 'node',
              ref: '302678647',
              role: 'stop'
            }
          },
          {
            $: {
              type: 'way',
              ref: '156560702',
              role: 'platform'
            }
          },
          {
            $: {
              type: 'way',
              ref: '156559266',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '156559219',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '156559383',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '156559220',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '156559421',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '156559508',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '143898823',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '156559451',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '156559425',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '156559499',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '156559346',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '156559238',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '156559336',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '156559241',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '156559375',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '156559325',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '156559283',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '156559279',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '156559519',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '156559228',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '156559549',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '156559313',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '156559573',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '156559269',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '156559232',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '156559408',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '143824616',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '156559399',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '156559260',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '156559247',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '156559230',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '45758425',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '45758426',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '156559253',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '156559434',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '156559282',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '318023906',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '156559478',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '156559357',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '156559492',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '156559485',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '156559224',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '194265789',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '156559264',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '275562087',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '156559268',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '143767558',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '502473062',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '27584680',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '28434137',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '28434136',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '156559240',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '502473109',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '27585524',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '183418696',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '27585525',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '156559322',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '156559406',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '156559262',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '156559486',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '156559328',
              role: ''
            }
          }
        ],
        tag: [
          {
            $: {
              k: 'air_conditioning',
              v: 'limited'
            }
          },
          {
            $: {
              k: 'bicycle',
              v: 'limited'
            }
          },
          {
            $: {
              k: 'by_night',
              v: 'yes'
            }
          },
          {
            $: {
              k: 'colour',
              v: '#00A651'
            }
          },
          {
            $: {
              k: 'from',
              v: 'François Mitterrand'
            }
          },
          {
            $: {
              k: 'name',
              v: '1 François Mitterrand → Beaujoire'
            }
          },
          {
            $: {
              k: 'network',
              v: 'TAN'
            }
          },
          {
            $: {
              k: 'note:en',
              v: 'Please keep nodes and ways in the right order'
            }
          },
          {
            $: {
              k: 'note:fr',
              v: 'Merci de garder les nœuds et les tronçons dans le bon ordre'
            }
          },
          {
            $: {
              k: 'operator',
              v: 'SEMITAN'
            }
          },
          {
            $: {
              k: 'public_transport:version',
              v: '2'
            }
          },
          {
            $: {
              k: 'ref',
              v: '1'
            }
          },
          {
            $: {
              k: 'route',
              v: 'tram'
            }
          },
          {
            $: {
              k: 'supervised',
              v: 'yes'
            }
          },
          {
            $: {
              k: 'text_colour',
              v: '#FFF'
            }
          },
          {
            $: {
              k: 'to',
              v: 'Beaujoire'
            }
          },
          {
            $: {
              k: 'type',
              v: 'route'
            }
          },
          {
            $: {
              k: 'via',
              v: 'Commerce'
            }
          },
          {
            $: {
              k: 'wheelchair',
              v: 'yes'
            }
          }
        ]
      },
      {
        $: {
          id: '64032',
          visible: 'true',
          version: '73',
          changeset: '51866544',
          timestamp: '2017-09-08T23:18:31Z',
          user: 'Virgile1994',
          uid: '362997'
        },
        member: [
          {
            $: {
              type: 'node',
              ref: '292036066',
              role: 'stop'
            }
          },
          {
            $: {
              type: 'way',
              ref: '516237325',
              role: 'platform'
            }
          },
          {
            $: {
              type: 'node',
              ref: '290507757',
              role: 'stop'
            }
          },
          {
            $: {
              type: 'way',
              ref: '516237250',
              role: 'platform'
            }
          },
          {
            $: {
              type: 'node',
              ref: '290507744',
              role: 'stop'
            }
          },
          {
            $: {
              type: 'way',
              ref: '516696799',
              role: 'platform'
            }
          },
          {
            $: {
              type: 'node',
              ref: '290507724',
              role: 'stop'
            }
          },
          {
            $: {
              type: 'way',
              ref: '158056053',
              role: 'platform'
            }
          },
          {
            $: {
              type: 'node',
              ref: '290507715',
              role: 'stop'
            }
          },
          {
            $: {
              type: 'way',
              ref: '158056052',
              role: 'platform'
            }
          },
          {
            $: {
              type: 'node',
              ref: '290507697',
              role: 'stop'
            }
          },
          {
            $: {
              type: 'way',
              ref: '517020602',
              role: 'platform'
            }
          },
          {
            $: {
              type: 'node',
              ref: '1573734002',
              role: 'stop'
            }
          },
          {
            $: {
              type: 'way',
              ref: '517020592',
              role: 'platform'
            }
          },
          {
            $: {
              type: 'node',
              ref: '290501129',
              role: 'stop'
            }
          },
          {
            $: {
              type: 'way',
              ref: '517020584',
              role: 'platform'
            }
          },
          {
            $: {
              type: 'node',
              ref: '290501108',
              role: 'stop'
            }
          },
          {
            $: {
              type: 'way',
              ref: '158056051',
              role: 'platform'
            }
          },
          {
            $: {
              type: 'node',
              ref: '290495632',
              role: 'stop'
            }
          },
          {
            $: {
              type: 'way',
              ref: '158056050',
              role: 'platform'
            }
          },
          {
            $: {
              type: 'node',
              ref: '290495591',
              role: 'stop'
            }
          },
          {
            $: {
              type: 'way',
              ref: '519069657',
              role: 'platform'
            }
          },
          {
            $: {
              type: 'node',
              ref: '290495580',
              role: 'stop'
            }
          },
          {
            $: {
              type: 'way',
              ref: '519069642',
              role: 'platform'
            }
          },
          {
            $: {
              type: 'node',
              ref: '290495562',
              role: 'stop'
            }
          },
          {
            $: {
              type: 'way',
              ref: '519069628',
              role: 'platform'
            }
          },
          {
            $: {
              type: 'node',
              ref: '290021045',
              role: 'stop'
            }
          },
          {
            $: {
              type: 'way',
              ref: '158056033',
              role: 'platform'
            }
          },
          {
            $: {
              type: 'node',
              ref: '290021048',
              role: 'stop'
            }
          },
          {
            $: {
              type: 'way',
              ref: '158056047',
              role: 'platform'
            }
          },
          {
            $: {
              type: 'node',
              ref: '290012688',
              role: 'stop'
            }
          },
          {
            $: {
              type: 'way',
              ref: '158056046',
              role: 'platform'
            }
          },
          {
            $: {
              type: 'node',
              ref: '290012677',
              role: 'stop'
            }
          },
          {
            $: {
              type: 'way',
              ref: '158056023',
              role: 'platform'
            }
          },
          {
            $: {
              type: 'node',
              ref: '290012672',
              role: 'stop'
            }
          },
          {
            $: {
              type: 'way',
              ref: '158056021',
              role: 'platform'
            }
          },
          {
            $: {
              type: 'node',
              ref: '290007595',
              role: 'stop'
            }
          },
          {
            $: {
              type: 'way',
              ref: '158056017',
              role: 'platform'
            }
          },
          {
            $: {
              type: 'node',
              ref: '290007594',
              role: 'stop'
            }
          },
          {
            $: {
              type: 'way',
              ref: '520769004',
              role: 'platform'
            }
          },
          {
            $: {
              type: 'node',
              ref: '1550758490',
              role: 'stop'
            }
          },
          {
            $: {
              type: 'way',
              ref: '158056028',
              role: 'platform'
            }
          },
          {
            $: {
              type: 'node',
              ref: '1550758491',
              role: 'stop'
            }
          },
          {
            $: {
              type: 'way',
              ref: '521384846',
              role: 'platform'
            }
          },
          {
            $: {
              type: 'node',
              ref: '1550758489',
              role: 'stop'
            }
          },
          {
            $: {
              type: 'way',
              ref: '158056019',
              role: 'platform'
            }
          },
          {
            $: {
              type: 'node',
              ref: '290003107',
              role: 'stop'
            }
          },
          {
            $: {
              type: 'way',
              ref: '521384817',
              role: 'platform'
            }
          },
          {
            $: {
              type: 'node',
              ref: '1702975501',
              role: 'stop'
            }
          },
          {
            $: {
              type: 'way',
              ref: '158055064',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '158055267',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '158055273',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '158055084',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '158055270',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '158055065',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '332126828',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '143769351',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '288191719',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '158055108',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '141671232',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '285609258',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '141669372',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '26463190',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '29013965',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '29013967',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '141690634',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '141564605',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '158055899',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '158055082',
              role: ''
            }
          },
          {
            $: {
              type: 'way',
              ref: '158055092',
              role: ''
            }
          }
        ],
        tag: [
          {
            $: {
              k: 'air_conditioning',
              v: 'no'
            }
          },
          {
            $: {
              k: 'bicycle',
              v: 'limited'
            }
          },
          {
            $: {
              k: 'by_night',
              v: 'yes'
            }
          },
          {
            $: {
              k: 'colour',
              v: '#EE1C25'
            }
          },
          {
            $: {
              k: 'from',
              v: 'Orvault Grand Val'
            }
          },
          {
            $: {
              k: 'name',
              v: '2 Orvault Grand Val → Gare de Pont-Rousseau'
            }
          },
          {
            $: {
              k: 'network',
              v: 'TAN'
            }
          },
          {
            $: {
              k: 'note:en',
              v: 'Please keep nodes and ways in the right order'
            }
          },
          {
            $: {
              k: 'note:fr',
              v: 'Merci de garder les nœuds et les tronçons dans le bon ordre'
            }
          },
          {
            $: {
              k: 'operator',
              v: 'SEMITAN'
            }
          },
          {
            $: {
              k: 'public_transport:version',
              v: '2'
            }
          },
          {
            $: {
              k: 'ref',
              v: '2'
            }
          },
          {
            $: {
              k: 'route',
              v: 'tram'
            }
          },
          {
            $: {
              k: 'supervised',
              v: 'yes'
            }
          },
          {
            $: {
              k: 'text_colour',
              v: '#FFF'
            }
          },
          {
            $: {
              k: 'to',
              v: 'Gare de Pont Rousseau'
            }
          },
          {
            $: {
              k: 'type',
              v: 'route'
            }
          },
          {
            $: {
              k: 'via',
              v: 'Commerce'
            }
          },
          {
            $: {
              k: 'wheelchair',
              v: 'yes'
            }
          }
        ]
      }
    ]
  }
}));
