export abstract class constants {
  static readonly DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;
  static readonly MAX_RIDES_PER_DAY = 4;
}

const prodConfig = {
  mongodbUrl: `mongodb://prod:prod@ds159187.mlab.com:59187/
  the_hitchhikers_guide_to_the_galaxy_prod`,
  port: process.env.PORT || 80,
  client: {
    host: 'http://localhost',
    port: 4200
  },
};

const devConfig = {
  mongodbUrl: `mongodb://omri:Omri2707@ds113799.mlab.com:13799/trempdb_dev`,
  port: process.env.PORT || 3000,
  client: {
    host: 'http://localhost',
    port: 4200
  },
};

const testConfig = {
  mongodbUrl: `mongodb://test:test@ds121889.mlab.com:21889/trempdb_test`,
  port: process.env.PORT || 3000,
  client: {
    host: 'http://localhost',
    port: 4200
  },
};

let envConfig = {
  mongodbUrl: ``,
  port: process.env.PORT || 3000,
  client: {
    host: 'http://localhost',
    port: 4200
  },
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
