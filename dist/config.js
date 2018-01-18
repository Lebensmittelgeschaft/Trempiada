"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prodConfig = {
    mongodbUrl: `mongodb://prod:prod@ds159187.mlab.com:59187/
  the_hitchhikers_guide_to_the_galaxy_prod`,
    port: '80',
    momentLocale: `he`,
};
const devConfig = {
    mongodbUrl: `mongodb://dev:dev@ds159187.mlab.com:59187/the_hitchhikers_guide_to_the_galaxy_dev`,
    port: '3000',
    momentLocale: `he`,
};
const testConfig = {
    mongodbUrl: `mongodb://test:test@ds035059.mlab.com:35059/the_hitchhikers_guide_to_the_galaxy`,
    port: '3000',
    momentLocale: `he`,
};
let envConfig = {
    mongodbUrl: ``,
    port: '',
    momentLocale: ``,
};
exports.config = envConfig;
switch (process.env.NODE_ENV) {
    case 'prod': {
        exports.config = envConfig = exports.prodConfig;
        break;
    }
    case 'dev': {
        exports.config = envConfig = devConfig;
        break;
    }
    case 'test': {
        exports.config = envConfig = testConfig;
        break;
    }
    default: {
        exports.config = envConfig = devConfig;
        break;
    }
}
