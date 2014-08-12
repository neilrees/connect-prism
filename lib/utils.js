'use strict';

var path = require('path');
var url = require('url');

module.exports = {
  getMockPath: function(proxy, requestedUrl, method) {
    var pathname = url.parse(requestedUrl).pathname;
    return path.join(proxy.config.mocksPath, proxy.config.name, pathname, (method || 'GET') + '.json');
  },
  absoluteUrl: function(proxy, url) {
    return (proxy.config.https ? 'https://' : 'http://') + proxy.config.host + ':' + proxy.config.port + url;
  }
};