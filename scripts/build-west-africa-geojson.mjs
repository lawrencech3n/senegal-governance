/**
 * Regenerate lib/data/westAfricaPeers.json from Natural Earth 110m (world-atlas).
 * Run: node scripts/build-west-africa-geojson.mjs
 */
import fs from "node:fs";
import https from "node:https";

const OUT = "lib/data/westAfricaPeers.json";
const URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const PEER_IDS = new Set(["686", "466", "324", "624", "478", "270", "854"]);
const CONTEXT_IDS = new Set(["384", "562", "288"]);
const NAMES = {
  686: "Senegal",
  466: "Mali",
  324: "Guinea",
  624: "Guinea-Bissau",
  478: "Mauritania",
  270: "Gambia",
  854: "Burkina Faso",
  384: "Côte d'Ivoire",
  562: "Niger",
  288: "Ghana",
};

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let body = "";
        res.on("data", (chunk) => {
          body += chunk;
        });
        res.on("end", () => resolve(JSON.parse(body)));
      })
      .on("error", reject);
  });
}

function decodeArcs(topology) {
  const { arcs, transform } = topology;
  const [sx, sy] = transform.scale;
  const [tx, ty] = transform.translate;
  return arcs.map((arc) => {
    let x = 0;
    let y = 0;
    return arc.map(([dx, dy]) => {
      x += dx;
      y += dy;
      return [x * sx + tx, y * sy + ty];
    });
  });
}

function ring(decodedArcs, arcIndexes) {
  let coordinates = [];
  for (const i of arcIndexes) {
    let arc = decodedArcs[i < 0 ? ~i : i];
    if (i < 0) arc = arc.slice().reverse();
    if (coordinates.length) arc = arc.slice(1);
    coordinates = coordinates.concat(arc);
  }
  return coordinates;
}

function geometryFromArcs(decodedArcs, geom) {
  if (geom.type === "Polygon") {
    return {
      type: "Polygon",
      coordinates: geom.arcs.map((ringArcs) => ring(decodedArcs, ringArcs)),
    };
  }
  return {
    type: "MultiPolygon",
    coordinates: geom.arcs.map((polygon) =>
      polygon.map((ringArcs) => ring(decodedArcs, ringArcs)),
    ),
  };
}

const topo = await fetchJson(URL);
const decodedArcs = decodeArcs(topo);
const features = [];

for (const g of topo.objects.countries.geometries) {
  const id = String(g.id);
  if (!PEER_IDS.has(id) && !CONTEXT_IDS.has(id)) continue;
  features.push({
    type: "Feature",
    id,
    properties: {
      name: NAMES[id] ?? id,
      numericId: id,
      layer: PEER_IDS.has(id) ? "peer" : "context",
    },
    geometry: geometryFromArcs(decodedArcs, g),
  });
}

fs.writeFileSync(OUT, JSON.stringify({ type: "FeatureCollection", features }));
console.log(`Wrote ${features.length} features to ${OUT}`);
