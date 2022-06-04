const assert = require('assert');
const app = require('../../src/app');

describe('\'flight\' service', () => {
  it('registered the service', () => {
    const service = app.service('flight');

    assert.ok(service, 'Registered the service');
  });
});
