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
