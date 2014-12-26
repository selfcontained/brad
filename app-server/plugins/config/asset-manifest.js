var path = require('path'),
    LEADING_SLASH = /^\//;

module.exports = function(app) {
    var location = path.join(app.ROOT, 'rev-manifest.json'),
        publicRoot = path.join(app.ROOT, 'public'),
        manifest = {},
        revManifest = {};

    try {
        revManifest = require(location);
        console.log('Loading asset manifest file @ %s', location);
    }catch(e){
        console.log('No asset manifest file found @ %s', location);
    }

    // adjust keys to be relative paths instead of absolute
    Object.keys(revManifest).forEach(function(absPath) {
        if(absPath.indexOf(publicRoot) === 0) {
            manifest[trimLeadingSlash(path.relative(publicRoot, absPath))] = trimLeadingSlash(revManifest[absPath]);
        }else {
            manifest[trimLeadingSlash(absPath)] = trimLeadingSlash(revManifest[absPath]);
        }
    });

    return manifest;

};

function trimLeadingSlash(value) {
    return value.replace(LEADING_SLASH, '');
}
