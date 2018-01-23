export const prodConfig = {
  mongodbUrl: `mongodb://prod:prod@ds159187.mlab.com:59187/
  the_hitchhikers_guide_to_the_galaxy_prod`,
  port: 80,
};

const devConfig = {
  mongodbUrl: `mongodb://dev:dev@ds159187.mlab.com:59187/the_hitchhikers_guide_to_the_galaxy_dev`,
  port: 3000,
};

const testConfig = {
  mongodbUrl: `mongodb://test:test@ds035059.mlab.com:35059/the_hitchhikers_guide_to_the_galaxy`,
  port: 3000,
};

let envConfig = {
  mongodbUrl: ``,
  port: 3000,
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