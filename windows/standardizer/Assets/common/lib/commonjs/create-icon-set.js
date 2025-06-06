"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_ICON_SIZE = exports.DEFAULT_ICON_COLOR = void 0;
exports.createIconSet = createIconSet;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _createIconSourceCache = _interopRequireDefault(require("./create-icon-source-cache.js"));
var _dynamicFontLoading = require("./dynamicLoading/dynamic-font-loading");
var _dynamicLoadingSetting = require("./dynamicLoading/dynamic-loading-setting.js");
var _getImageLibrary = require("./get-image-library.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// eslint-disable-next-line import/no-extraneous-dependencies

// eslint-disable-next-line import/no-extraneous-dependencies

const DEFAULT_ICON_SIZE = exports.DEFAULT_ICON_SIZE = 12;
const DEFAULT_ICON_COLOR = exports.DEFAULT_ICON_COLOR = 'black';
function createIconSet(glyphMap, postScriptNameOrOptions, fontFileNameParam, fontStyleParam) {
  const {
    postScriptName,
    fontFileName,
    fontStyle
  } = typeof postScriptNameOrOptions === 'string' ? {
    postScriptName: postScriptNameOrOptions,
    fontFileName: fontFileNameParam,
    fontStyle: fontStyleParam
  } : postScriptNameOrOptions;
  const fontBasename = fontFileName ? fontFileName.replace(/\.(otf|ttf)$/, '') : postScriptName;
  const fontReference = _reactNative.Platform.select({
    windows: `/Assets/${fontFileName}#${postScriptName}`,
    android: fontBasename,
    web: fontBasename,
    default: postScriptName
  });
  const resolveGlyph = name => {
    const glyph = glyphMap[name] || '?';
    if (typeof glyph === 'number') {
      return String.fromCodePoint(glyph);
    }
    return glyph;
  };
  const Icon = ({
    name,
    size = DEFAULT_ICON_SIZE,
    color = DEFAULT_ICON_COLOR,
    style,
    children,
    allowFontScaling = false,
    innerRef,
    ...props
  }) => {
    const [isFontLoaded, setIsFontLoaded] = _react.default.useState((0, _dynamicLoadingSetting.isDynamicLoadingEnabled)() ? _dynamicFontLoading.dynamicLoader.isLoaded(fontReference) : true);
    const glyph = isFontLoaded && name ? resolveGlyph(name) : '';

    // biome-ignore lint/correctness/useExhaustiveDependencies: the dependencies never change
    (0, _react.useEffect)(() => {
      let isMounted = true;
      if (!isFontLoaded && typeof postScriptNameOrOptions === 'object' && typeof postScriptNameOrOptions.fontSource !== 'undefined') {
        _dynamicFontLoading.dynamicLoader.loadFontAsync(fontReference, postScriptNameOrOptions.fontSource).finally(() => {
          if (isMounted) {
            setIsFontLoaded(true);
          }
        });
      }
      return () => {
        isMounted = false;
      };
    }, []);
    const styleDefaults = {
      fontSize: size,
      color
    };
    const styleOverrides = {
      fontFamily: fontReference,
      fontWeight: 'normal',
      fontStyle: 'normal'
    };
    const newProps = {
      ...props,
      style: [styleDefaults, style, styleOverrides, fontStyle || {}],
      allowFontScaling
    };
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Text, {
      ref: innerRef,
      selectable: false,
      ...newProps,
      children: [glyph, children]
    });
  };
  const WrappedIcon = /*#__PURE__*/(0, _react.forwardRef)((props, ref) => /*#__PURE__*/(0, _jsxRuntime.jsx)(Icon, {
    innerRef: ref,
    ...props
  }));
  WrappedIcon.displayName = 'Icon';
  const imageSourceCache = (0, _createIconSourceCache.default)();
  const getImageSourceSync = (name, size = DEFAULT_ICON_SIZE, color = DEFAULT_ICON_COLOR) => {
    const NativeIconAPI = (0, _getImageLibrary.ensureGetImageAvailable)();
    const glyph = resolveGlyph(name);
    const processedColor = (0, _reactNative.processColor)(color);
    const cacheKey = `${glyph}:${size}:${String(processedColor)}`;
    if (imageSourceCache.has(cacheKey)) {
      // FIXME: Should this check if it's an error and throw it again?
      return imageSourceCache.get(cacheKey);
    }
    try {
      const imagePath = NativeIconAPI.getImageForFontSync(fontReference, glyph, size, processedColor // FIXME what if a non existant colour was passed in?
      );
      const value = {
        uri: imagePath,
        scale: _reactNative.PixelRatio.get()
      };
      imageSourceCache.setValue(cacheKey, value);
      return value;
    } catch (error) {
      imageSourceCache.setError(cacheKey, error);
      throw error;
    }
  };
  const getImageSource = async (name, size = DEFAULT_ICON_SIZE, color = DEFAULT_ICON_COLOR) => {
    const NativeIconAPI = (0, _getImageLibrary.ensureGetImageAvailable)();
    const glyph = resolveGlyph(name);
    const processedColor = (0, _reactNative.processColor)(color);
    const cacheKey = `${glyph}:${size}:${String(processedColor)}`;
    if (imageSourceCache.has(cacheKey)) {
      // FIXME: Should this check if it's an error and throw it again?
      return imageSourceCache.get(cacheKey);
    }
    try {
      const imagePath = await NativeIconAPI.getImageForFont(fontReference, glyph, size, processedColor // FIXME what if a non existant colour was passed in?
      );
      const value = {
        uri: imagePath,
        scale: _reactNative.PixelRatio.get()
      };
      imageSourceCache.setValue(cacheKey, value);
      return value;
    } catch (error) {
      imageSourceCache.setError(cacheKey, error);
      throw error;
    }
  };
  const IconNamespace = Object.assign(WrappedIcon, {
    getImageSource,
    getImageSourceSync
  });
  return IconNamespace;
}
//# sourceMappingURL=create-icon-set.js.map