"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dynamicLoader = void 0;
var _registry = require("@react-native/assets-registry/registry");
var _resolveAssetSource = _interopRequireDefault(require("react-native/Libraries/Image/resolveAssetSource"));
var _dynamicLoadingSetting = require("./dynamic-loading-setting.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/*
 * The following imports are always present when react native is installed
 * in the future, more explicit apis will be exposed by the core, including typings
 * */
// @ts-expect-error missing types
// eslint-disable-next-line import/no-extraneous-dependencies,import/no-unresolved

// @ts-expect-error missing types
// eslint-disable-next-line import/no-extraneous-dependencies

const loadPromises = {};
const loadFontAsync = async (fontFamily, fontSource) => {
  const expoModules = globalThis?.expo?.modules;
  if (!expoModules) {
    throw new Error('Expo is not available. Dynamic font loading is not available.');
  }
  if (loadPromises[fontFamily]) {
    return loadPromises[fontFamily];
  }
  loadPromises[fontFamily] = async function LoadFont() {
    try {
      const localUri = await (() => {
        if (typeof fontSource === 'string') {
          // a local filesystem uri
          return fontSource;
        }
        // a module id
        const {
          uri,
          type,
          hash
        } = getLocalFontUrl(fontSource, fontFamily);
        return expoModules.ExpoAsset.downloadAsync(uri, hash, type);
      })();
      await expoModules.ExpoFontLoader.loadAsync(fontFamily, localUri);
    } catch (error) {
      console.error(`Failed to load font ${fontFamily}`, error); // eslint-disable-line no-console

      (0, _dynamicLoadingSetting.getErrorCallback)()?.({
        error: error,
        fontFamily,
        fontSource
      });
    } finally {
      delete loadPromises[fontFamily];
    }
  }();
  return loadPromises[fontFamily];
};
const getLocalFontUrl = (fontModuleId, fontFamily) => {
  const assetMeta = (0, _registry.getAssetByID)(fontModuleId);
  if (!assetMeta) {
    throw new Error(`no asset found for font family "${fontFamily}", moduleId: ${String(fontModuleId)}`);
  }
  const resolver = _resolveAssetSource.default;
  const assetSource = resolver(fontModuleId);
  return {
    ...assetMeta,
    ...assetSource
  };
};
const loadedFontsCache = {};
const isLoadedNative = fontFamily => {
  if (fontFamily in loadedFontsCache) {
    return true;
  }
  const {
    expo
  } = globalThis;
  if (!expo) {
    throw new Error('Expo is not available. Dynamic font loading is not available.');
  }
  const loadedNativeFonts = expo.modules.ExpoFontLoader.getLoadedFonts();
  loadedNativeFonts.forEach(font => {
    loadedFontsCache[font] = true;
  });
  return fontFamily in loadedFontsCache;
};
const dynamicLoader = exports.dynamicLoader = {
  isLoaded: isLoadedNative,
  loadFontAsync
};
//# sourceMappingURL=dynamic-font-loading.js.map