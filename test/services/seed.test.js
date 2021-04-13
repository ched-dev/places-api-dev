const assert = require('assert');
const app = require('../../src/app');

describe('\'seed\' service', () => {
  it('registered the service', () => {
    const service = app.service('seed');

    assert.ok(service, 'Registered the service');
  });
});
