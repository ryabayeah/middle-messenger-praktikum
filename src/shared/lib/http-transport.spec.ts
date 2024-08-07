import { createSandbox, SinonStub } from 'sinon';
import { expect } from 'chai';
import { HTTPTransport, METHODS } from './http-transport';

const URL = '/user';

describe('HTTPTransport', () => {
  let http: HTTPTransport;
  let request: SinonStub;
  const sandbox = createSandbox();

  beforeEach(() => {
    http = new HTTPTransport();
    request = sandbox.stub(http, 'request').callsFake(() => Promise.resolve());
  });

  afterEach(() => {
    sandbox.restore();
  });

  // ---------------------------------------

  it('.get() send GET HTTP-method', async () => {
    await http.get(URL);
    expect(request.calledWithMatch(URL, { method: METHODS.GET })).to.be.true;
  });

  it('.post() send POST HTTP-method with data in body', async () => {
    const data = {
      id: '1',
      name: 'name',
      second_name: 'second_name',
    };

    await http.post(URL, { data });
    expect(request.calledWithMatch(URL, { method: METHODS.POST, data })).to.be
      .true;
  });

  it('.put() send PUT HTTP-method with data in body', async () => {
    const data = {
      id: '1',
      name: 'name',
      second_name: 'second_name',
    };

    await http.put(URL, { data });
    expect(request.calledWithMatch(URL, { method: METHODS.PUT, data })).to.be
      .true;
  });

  it('.put() send DELETE HTTP-method with data in body', async () => {
    const data = {
      id: '1',
    };

    await http.delete(URL, { data });
    expect(request.calledWithMatch(URL, { method: METHODS.DELETE, data })).to.be
      .true;
  });
});
