#!/usr/bin/env node
/* eslint-disable no-console */
"use strict";

var _nodeFs = _interopRequireDefault(require("node:fs"));
var path = _interopRequireWildcard(require("node:path"));
var _picocolors = _interopRequireDefault(require("picocolors"));
var plist = _interopRequireWildcard(require("plist"));
var _common = require("./common.js");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const getFontName = fontPath => path.basename(fontPath);
const packageJsonFilename = process.argv[2];
if (!packageJsonFilename) {
  throw new Error('Need the path to the root package.json as the first argument');
}
const infoPlistFilename = process.argv[3];
if (!infoPlistFilename) {
  throw new Error('Need the path to the Info.plist as the second argument');
}
const fonts = (0, _common.getFontPaths)(packageJsonFilename);
console.log(`Found ${fonts.length} fonts`);
const infoPlistContent = _nodeFs.default.readFileSync(infoPlistFilename, 'utf8');
const infoPlist = plist.parse(infoPlistContent);
const plistFonts = new Set(infoPlist.UIAppFonts || []);
const providedFonts = new Set(fonts.map(getFontName));
let hasChanges = false;

// Check for missing fonts and add them
providedFonts.forEach(font => {
  if (!plistFonts.has(font)) {
    plistFonts.add(font);
    console.log(_picocolors.default.green(`Added ${font}`));
    hasChanges = true;
  } else {
    console.log(`Existing ${font}`);
  }
});

// Check for extra fonts in Info.plist
plistFonts.forEach(font => {
  if (!providedFonts.has(font)) {
    console.log(_picocolors.default.yellow(`Extra ${font} (Please remove manually if not needed)`));
  }
});

// Update Info.plist if there were changes
if (hasChanges) {
  infoPlist.UIAppFonts = Array.from(plistFonts);
  const updatedInfoPlistContent = plist.build(infoPlist).replace(/^ {2}/gm, '').replace(/ {2}/gm, '\t');
  _nodeFs.default.writeFileSync(infoPlistFilename, updatedInfoPlistContent, 'utf8');
}
//# sourceMappingURL=updatePlist.js.map