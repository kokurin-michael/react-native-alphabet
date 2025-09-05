const path = require('path');
const { getDefaultConfig } = require('@expo/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = getDefaultConfig(__dirname);

// Allow resolving the local library from one directory up
config.resolver.unstable_enableSymlinks = true;
config.watchFolders = [path.resolve(__dirname, '..')];

// Map the package name to the local library path
config.resolver.extraNodeModules = {
  // Point directly to the source folder so you can run without building lib/
  'react-native-alphabet': path.resolve(__dirname, '..', 'src'),
};

config.resolver.unstable_enablePackageExports = true;

module.exports = config;
