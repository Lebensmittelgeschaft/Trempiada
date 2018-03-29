export const prodConfig = {
  mongodbUrl: `mongodb://prod:prod@ds159187.mlab.com:59187/
  the_hitchhikers_guide_to_the_galaxy_prod`,
  port: process.env.PORT || 80,
};

export abstract class constants {
  static readonly MINUTES_IN_MILISECONDS = 60 * 1000;
}

const devConfig = {
  mongodbUrl: `mongodb://omri:Omri2707@ds113799.mlab.com:13799/trempdb_dev` ||
              `mongodb://dev:dev@ds159187.mlab.com:59187/the_hitchhikers_guide_to_the_galaxy_dev`,
  port: process.env.PORT || 3000,
};

const testConfig = {
  mongodbUrl: `mongodb://test:test@ds121889.mlab.com:21889/trempdb_test` ||
              `mongodb://test:test@ds035059.mlab.com:35059/the_hitchhikers_guide_to_the_galaxy`,
  port: process.env.PORT || 3000,
};

let envConfig = {
  mongodbUrl: ``,
  port: process.env.PORT || 3000,
};

switch (process.env.NODE_ENV) {
  case 'prod': {
    envConfig = prodConfig;

    break;
  }

  case 'dev': {
    envConfig = devConfig;

    break;
  }

  case 'test': {
    envConfig = testConfig;

    break;
  }

  default: {
    envConfig = devConfig;
    
    break;
  }
}

export { envConfig as config };
