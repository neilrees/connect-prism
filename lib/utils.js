'use strict';

var path = require('path');
var url = require('url');
var fs = require('fs');

module.exports = {
  getMockPath: function(proxy, requestedUrl, method) {
    var pathname = url.parse(requestedUrl).pathname;
    return path.join(proxy.config.mocksPath, proxy.config.name, pathname, (method || 'GET') + '.json');
  },
  absoluteUrl: function(proxy, url) {
    return (proxy.config.https ? 'https://' : 'http://') + proxy.config.host + ':' + proxy.config.port + url;
  },
  expandMockPath: function(mockPath) {

      var pathParts = mockPath.split('\\');

      var i = 0,
          newPath = '',
          exists = true;

      do {
          var tempPath = path.join(newPath,pathParts[i]);

          exists = fs.existsSync(tempPath);

          if (!exists) {
              tempPath = path.join(newPath,'__any');
              exists = fs.existsSync(tempPath);
          }

          newPath = tempPath;

      } while (exists && ++i < pathParts.length);

      return {
          record : mockPath,
          mock : exists ? newPath : null,
          mockExists: exists
      };
  }
};