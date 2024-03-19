export const MAPBOX_DRAW_STYLES = [
    // default themes provided by MB Draw
    // default themes provided by MB Draw
    // default themes provided by MB Draw
    // default themes provided by MB Draw

    {
      'id': 'gl-draw-polygon-fill-inactive',
      'type': 'fill',
      'filter': ['all', ['==', 'active', 'false'],
        ['==', '$type', 'Polygon'],
        ['!=', 'mode', 'static']
      ],
      'paint': {
        'fill-color': '#0bbdbd',
        'fill-outline-color': '#0bbdbd',
        'fill-opacity': 0.1
      }
    },
    {
      'id': 'gl-draw-polygon-fill-active',
      'type': 'fill',
      'filter': ['all', ['==', 'active', 'true'],
        ['==', '$type', 'Polygon']
      ],
      'paint': {
        'fill-color': '#0bbdbd',
        'fill-outline-color': '#0bbdbd',
        'fill-opacity': 0.1
      }
    },
    {
      'id': 'gl-draw-polygon-midpoint',
      'type': 'circle',
      'filter': ['all', ['==', '$type', 'Point'],
        ['==', 'meta', 'midpoint']
      ],
      'paint': {
        'circle-radius': 3,
        'circle-color': '#fbb03b'
      }
    },
    {
      'id': 'gl-draw-polygon-stroke-inactive',
      'type': 'line',
      'filter': ['all', ['==', 'active', 'false'],
        ['==', '$type', 'Polygon'],
        ['!=', 'mode', 'static']
      ],
      'layout': {
        'line-cap': 'round',
        'line-join': 'round'
      },
      'paint': {
        'line-color': '#3bb2d0',
        'line-width': 2
      }
    },
    {
      'id': 'gl-draw-polygon-stroke-active',
      'type': 'line',
      'filter': ['all', ['==', 'active', 'true'],
        ['==', '$type', 'Polygon']
      ],
      'layout': {
        'line-cap': 'round',
        'line-join': 'round'
      },
      'paint': {
        'line-color': '#0bbdbd',
        'line-dasharray': [0.2, 2],
        'line-width': 2
      }
    },
    {
      'id': 'gl-draw-line-inactive',
      'type': 'line',
      'filter': ['all', ['==', 'active', 'false'],
        ['==', '$type', 'LineString'],
        ['!=', 'mode', 'static']
      ],
      'layout': {
        'line-cap': 'round',
        'line-join': 'round'
      },
      'paint': {
        'line-color': '#0bbdbd',
        'line-width': 2
      }
    },
    {
      'id': 'gl-draw-line-active',
      'type': 'line',
      'filter': ['all', ['==', '$type', 'LineString'],
        ['==', 'active', 'true']
      ],
      'layout': {
        'line-cap': 'round',
        'line-join': 'round'
      },
      'paint': {
        'line-color': '#0bbdbd',
        'line-dasharray': [0.2, 2],
        'line-width': 2
      }
    },
    {
      'id': 'gl-draw-polygon-and-line-vertex-stroke-inactive',
      'type': 'circle',
      'filter': ['all', ['==', 'meta', 'vertex'],
        ['==', '$type', 'Point'],
        ['!=', 'mode', 'static']
      ],
      'paint': {
        'circle-radius': 5,
        'circle-color': '#fff'
      }
    },
    {
      'id': 'gl-draw-polygon-and-line-vertex-inactive',
      'type': 'circle',
      'filter': ['all', ['==', 'meta', 'vertex'],
        ['==', '$type', 'Point'],
        ['!=', 'mode', 'static']
      ],
      'paint': {
        'circle-radius': 5,
        'circle-color': '#0bbdbd'
      }
    },
    {
      'id': 'gl-draw-point-point-stroke-inactive',
      'type': 'circle',
      'filter': ['all', ['==', 'active', 'false'],
        ['==', '$type', 'Point'],
        ['==', 'meta', 'feature'],
        ['!=', 'mode', 'static']
      ],
      'paint': {
        'circle-radius': 5,
        'circle-opacity': 1,
        'circle-color': 'transparent'
      }
    },
    {
      'id': 'gl-draw-point-inactive',
      'type': 'circle',
      'filter': ['all', ['==', 'active', 'false'],
        ['==', '$type', 'Point'],
        ['==', 'meta', 'feature'],
        ['!=', 'mode', 'static']
      ],
      'paint': {
        'circle-radius': 3,
        'circle-color': 'transparent'
      }
    },
    {
      'id': 'gl-draw-point-stroke-active',
      'type': 'circle',
      'filter': ['all', ['==', '$type', 'Point'],
        ['==', 'active', 'true'],
        ['!=', 'meta', 'midpoint']
      ],
      'paint': {
        'circle-radius': 0,
        'circle-color': '#fff'
      }
    },
    {
      'id': 'gl-draw-polygon-fill-static',
      'type': 'fill',
      'filter': ['all', ['==', 'mode', 'static'],
        ['==', '$type', 'Polygon']
      ],
      'paint': {
        'fill-color': '#404040',
        'fill-outline-color': '#404040',
        'fill-opacity': 0.1
      }
    },
    {
      'id': 'gl-draw-polygon-stroke-static',
      'type': 'line',
      'filter': ['all', ['==', 'mode', 'static'],
        ['==', '$type', 'Polygon']
      ],
      'layout': {
        'line-cap': 'round',
        'line-join': 'round'
      },
      'paint': {
        'line-color': '#404040',
        'line-width': 2
      }
    },
    {
      'id': 'gl-draw-line-static',
      'type': 'line',
      'filter': ['all', ['==', 'mode', 'static'],
        ['==', '$type', 'LineString']
      ],
      'layout': {
        'line-cap': 'round',
        'line-join': 'round'
      },
      'paint': {
        'line-color': '#404040',
        'line-width': 2
      }
    },
  {
    'id': 'gl-draw-point-static',
    'type': 'symbol',
    'filter': [
      'all',
      ['==', '$type', 'Point'],
      ['!=', 'meta', 'midpoint'],
      ['any', ['==', 'meta', 'feature'], ['==', 'meta', 'vertex']],
      ['!=', 'mode', 'static'],
      ['!=', 'active', 'false']
    ],
    'layout': {
      'icon-image': 'custom-marker',
      'icon-allow-overlap': true,
      'icon-size': 0.5
    }
  },

  {
    'id': 'gl-draw-point-active',
    'type': 'symbol',
    'filter': [
      'all',
      ['==', '$type', 'Point'],
      ['!=', 'meta', 'midpoint'],
      ['==', 'active', 'true']
    ],
    'layout': {
      'icon-image': 'custom-marker',
      'icon-allow-overlap': true,
      'icon-size': 0.5
    }
  },

];
