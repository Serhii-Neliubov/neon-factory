const defaultDrawStyles = [
  {
    id: "gl-draw-line",
    type: "line",
    filter: [
      "all",
      ["==", "$type", "LineString"],
      ["!=", "mode", "static"],
    ],
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "#000",
      "line-dasharray": [0.2, 2],
      "line-width": 2,
    },
  },
  // polygon fill
  {
    id: "gl-draw-polygon-fill",
    type: "fill",
    filter: ["all", ["==", "$type", "Polygon"], ["!=", "mode", "static"]],
    paint: {
      "fill-color": "#000",
      "fill-outline-color": "#D20C0C",
      "fill-opacity": 0.1,
    },
  },
  // polygon mid points
  {
    id: "gl-draw-polygon-midpoint",
    type: "circle",
    filter: ["all", ["==", "$type", "Point"], ["==", "meta", "midpoint"]],
    paint: {
      "circle-radius": 3,
      "circle-color": "#fbb03b",
    },
  },
  // polygon outline stroke
  // This doesn't style the first edge of the polygon, which uses the line stroke styling instead
  {
    id: "gl-draw-polygon-stroke-active",
    type: "line",
    filter: ["all", ["==", "$type", "Polygon"], ["!=", "mode", "static"]],
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "#000",
      "line-dasharray": [0.2, 2],
      "line-width": 2,
    },
  },
  // vertex point halos
  {
    id: "gl-draw-polygon-and-line-vertex-halo-active",
    type: "circle",
    filter: [
      "all",
      ["==", "meta", "vertex"],
      ["==", "$type", "Point"],
      ["!=", "mode", "static"],
    ],
    paint: {
      "circle-radius": 5,
      "circle-color": "#000",
    },
  },
  // vertex points
  {
    id: "gl-draw-polygon-and-line-vertex-active",
    type: "circle",
    filter: [
      "all",
      ["==", "meta", "vertex"],
      ["==", "$type", "Point"],
      ["!=", "mode", "static"],
    ],
    paint: {
      "circle-radius": 3,
      "circle-color": "#000",
    },
  },

  // INACTIVE (static, already drawn)
  // line stroke
  {
    id: "gl-draw-line-static",
    type: "line",
    filter: [
      "all",
      ["==", "$type", "LineString"],
      ["==", "mode", "static"],
    ],
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "#000",
      "line-width": 3,
    },
  },
  // polygon fill
  {
    id: "gl-draw-polygon-fill-static",
    type: "fill",
    filter: ["all", ["==", "$type", "Polygon"], ["==", "mode", "static"]],
    paint: {
      "fill-color": "#000",
      "fill-outline-color": "#000",
      "fill-opacity": 0.1,
    },
  },
  // polygon outline
  {
    id: "gl-draw-polygon-stroke-static",
    type: "line",
    filter: ["all", ["==", "$type", "Polygon"], ["==", "mode", "static"]],
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "#000",
      "line-width": 3,
    },
  },
  {
    id: "highlight-active-points",
    type: "symbol", // Измените тип на "symbol"
    filter: [
      "all",
      ["==", "$type", "Point"],
      ["==", "meta", "feature"],
      ["==", "active", "true"],
    ],
    layout: {
      "icon-image": "custom-pin", // Имя изображения без расширения файла
      "icon-size": 1,
      "icon-anchor": "bottom",
    },
    paint: {},
  },
  {
    id: "points-are-blue",
    type: "symbol",
    filter: [
      "all",
      ["==", "$type", "Point"],
      ["==", "meta", "feature"],
      ["==", "active", "false"],
    ],
    layout: {
      "icon-image": "custom-pin", // Имя изображения без расширения файла
      "icon-size": 1,
      "icon-anchor": "bottom",
    },
    paint: {},
  },
  {
    id: "gl-draw-polygon-color-picker",
    type: "fill",
    filter: [
      "all",
      ["==", "$type", "Polygon"],
      ["has", "user_portColor"],
    ],
    paint: {
      "fill-color": ["get", "user_portColor"],
      "fill-outline-color": ["get", "user_portColor"],
      "fill-opacity": 0.5,
    },
  },
  {
    id: "gl-draw-line-color-picker",
    type: "line",
    filter: [
      "all",
      ["==", "$type", "LineString"],
      ["has", "user_portColor"],
    ],
    paint: {
      "line-color": ["get", "user_portColor"],
      "line-width": 2,
    },
  },
  {
    id: "gl-draw-point-color-picker",
    type: "circle",
    filter: ["all", ["==", "$type", "Point"], ["has", "user_portColor"]],
    paint: {
      "circle-radius": 3,
      "circle-color": ["get", "user_portColor"],
    },
  },
]
export default defaultDrawStyles;