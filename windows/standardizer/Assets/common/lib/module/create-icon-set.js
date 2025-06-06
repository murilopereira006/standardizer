"use strict";

// eslint-disable-next-line import/no-extraneous-dependencies
import React, { forwardRef, useEffect } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { PixelRatio, Platform, Text, processColor } from 'react-native';
import createIconSourceCache from "./create-icon-source-cache.js";
import { dynamicLoader } from './dynamicLoading/dynamic-font-loading';
import { isDynamicLoadingEnabled } from "./dynamicLoading/dynamic-loading-setting.js";
import { ensureGetImageAvailable } from "./get-image-library.js";
import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
export const DEFAULT_ICON_SIZE = 12;
export const DEFAULT_ICON_COLOR = 'black';
export function createIconSet(glyphMap, postScriptNameOrOptions, fontFileNameParam, fontStyleParam) {
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
  const fontReference = Platform.select({
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
    const [isFontLoaded, setIsFontLoaded] = React.useState(isDynamicLoadingEnabled() ? dynamicLoader.isLoaded(fontReference) : true);
    const glyph = isFontLoaded && name ? resolveGlyph(name) : '';

    // biome-ignore lint/correctness/useExhaustiveDependencies: the dependencies never change
    useEffect(() => {
      let isMounted = true;
      if (!isFontLoaded && typeof postScriptNameOrOptions === 'object' && typeof postScriptNameOrOptions.fontSource !== 'undefined') {
        dynamicLoader.loadFontAsync(fontReference, postScriptNameOrOptions.fontSource).finally(() => {
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
    return /*#__PURE__*/_jsxs(Text, {
      ref: innerRef,
      selectable: false,
      ...newProps,
      children: [glyph, children]
    });
  };
  const WrappedIcon = /*#__PURE__*/forwardRef((props, ref) => /*#__PURE__*/_jsx(Icon, {
    innerRef: ref,
    ...props
  }));
  WrappedIcon.displayName = 'Icon';
  const imageSourceCache = createIconSourceCache();
  const getImageSourceSync = (name, size = DEFAULT_ICON_SIZE, color = DEFAULT_ICON_COLOR) => {
    const NativeIconAPI = ensureGetImageAvailable();
    const glyph = resolveGlyph(name);
    const processedColor = processColor(color);
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
        scale: PixelRatio.get()
      };
      imageSourceCache.setValue(cacheKey, value);
      return value;
    } catch (error) {
      imageSourceCache.setError(cacheKey, error);
      throw error;
    }
  };
  const getImageSource = async (name, size = DEFAULT_ICON_SIZE, color = DEFAULT_ICON_COLOR) => {
    const NativeIconAPI = ensureGetImageAvailable();
    const glyph = resolveGlyph(name);
    const processedColor = processColor(color);
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
        scale: PixelRatio.get()
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