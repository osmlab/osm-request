import defaultOptions from '../defaultOptions.json';
import OsmRequest from '../index';

describe('Instanciation', () => {
  it('Should return a default endpoint', () => {
    const osm = new OsmRequest();
    expect(osm.endpoint).toBe(defaultOptions.endpoint);
  });

  it('Should return a custom endpoint', () => {
    const customEndpoint = 'https://my-custom-endpoint/api/0.6';
    const osm = new OsmRequest({ endpoint: customEndpoint });
    expect(osm.endpoint).toBe(customEndpoint);
  });
});
