# React Native and Browserify

_originally a fork of [React Native Webpack Server](https://github.com/mjohnston/react-native-webpack-server)_

NOTE: you may have to increase your open file limit (for watchify)

React Native Browserify Server is a development server that leverages [beefy](https://github.com/chrisdickinson/beefy) and the [React Packager](https://github.com/facebook/react-native/tree/master/packager) to enable building React Native JavaScript bundles with browserify. This allows you to use the existing browserify ecosystem when targeting React Native.

**If your project depends on react-native < 0.4.3 you will need to lock down the version of this package to 0.1.x.**

## Installing

```
npm install -g beefy browserify
npm install --save-dev react-native-browserify-server
```

## Using

```
./node_modules/react-native-webpack-server/.bin/cmd.js start --browserifyConfigPath "path/to/browserifyConfig"
```

browserifyConfig file contents
```
-t babelify -t brfs # etc
```

This will start the server on port 8080. The last step is to change the URL of your application bundle in `AppDelegate.m`, changing 8081 to 8080:

```objc
jsCodeLocation = [NSURL URLWithString:@"http://localhost:8080/index.ios.bundle"];
```

To run the development server:

```
npm start
```

## Source Maps

Current solutions for building React Native bundles with Webpack lose source maps. This is because the Webpack bundle is first built and then passed off to the React Packager which [constructs the source map by hand](https://github.com/facebook/react-native/blob/master/packager/react-packager/src/Packager/Package.js#L149). This is done for speed, but it also means you can only use transforms that map lines 1 to 1.

React Native Webpack Server enables source maps by generating the react-native and application bundles separately and then combining their source maps.

## Packaging for release

Coming soon
