import { WrongElementTypeException } from 'exceptions/element';
import defaultOptions from '../defaultOptions.json';
import OsmRequest from '../index';

const sampleFeature = {
  type: 'Feature',
  id: 'node/3683625932',
  properties: {
    timestamp: '2015-08-06T09:49:47Z',
    version: '1',
    changeset: '33150668',
    user: 'Vinber-Num&Lib',
    uid: '2568974',
    amenity: 'drinking_water',
    id: 'node/3683625932'
  },
  geometry: {
    type: 'Point',
    coordinates: [-0.5936602, 44.8331455]
  }
};

const sampleFeatureCollection = {
  type: 'FeatureCollection',
  features: [{ ...sampleFeature }]
};

describe('OsmRequest', () => {
  describe('Getters', () => {
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

  describe('createNodeElement', () => {
    it('Should return a new geoJSON element', () => {
      const lat = 1.234;
      const lon = -0.456;
      const properties = {
        aze: 'rty',
        uio: 'pqs'
      };
      const osm = new OsmRequest();
      const elementWithProperties = osm.createNodeElement(lat, lon, properties);
      const elementWithoutProperties = osm.createNodeElement(lat, lon);

      expect(elementWithProperties).toMatchSnapshot();
      expect(elementWithoutProperties).toMatchSnapshot();
    });
  });

  describe('setProperty', () => {
    it('Should add a property to an element', () => {
      const osm = new OsmRequest();
      const propertyName = 'weird_key';
      const propertyValue = 'stuff';
      const element = osm.setProperty(
        sampleFeature,
        propertyName,
        propertyValue
      );
      const collection = () =>
        osm.setProperty(sampleFeatureCollection, propertyName, propertyValue);

      expect(sampleFeature.properties[propertyName]).toBeUndefined();
      expect(collection).toThrow(WrongElementTypeException);
      expect(element.properties[propertyName]).toBe(propertyValue);
    });

    it('Should modify an element property', () => {
      const osm = new OsmRequest();
      const propertyName = 'amenity';
      const propertyValue = 'stuff';
      const element = osm.setProperty(
        sampleFeature,
        propertyName,
        propertyValue
      );
      const collection = () =>
        osm.setProperty(sampleFeatureCollection, propertyName, propertyValue);

      expect(sampleFeature.properties[propertyName]).toBeDefined();
      expect(collection).toThrow(WrongElementTypeException);
      expect(element.properties[propertyName]).toBe(propertyValue);
    });
  });

  describe('setProperties', () => {
    it('Should add a property to an element', () => {
      const osm = new OsmRequest();
      const propertyName = 'weird_key';
      const propertyValue = 'stuff';
      const element = osm.setProperties(sampleFeature, {
        [propertyName]: propertyValue
      });
      const collection = () =>
        osm.setProperties(sampleFeatureCollection, {
          [propertyName]: propertyValue
        });

      expect(sampleFeature.properties[propertyName]).toBeUndefined();
      expect(collection).toThrow(WrongElementTypeException);
      expect(element.properties[propertyName]).toBe(propertyValue);
    });

    it('Should modify an element property', () => {
      const osm = new OsmRequest();
      const propertyName = 'amenity';
      const propertyValue = 'stuff';
      const element = osm.setProperties(sampleFeature, {
        [propertyName]: propertyValue
      });
      const collection = () =>
        osm.setProperties(sampleFeatureCollection, {
          [propertyName]: propertyValue
        });

      expect(sampleFeature.properties[propertyName]).toBeDefined();
      expect(collection).toThrow(WrongElementTypeException);
      expect(element.properties[propertyName]).toBe(propertyValue);
    });
  });

  describe('removeProperty', () => {
    it('Should remove a property from an element', () => {
      const osm = new OsmRequest();
      const propertyName = 'amenity';
      const element = osm.removeProperty(sampleFeature, propertyName);
      const collection = () =>
        osm.removeProperty(sampleFeatureCollection, propertyName);

      expect(sampleFeature.properties[propertyName]).toBeDefined();
      expect(collection).toThrow(WrongElementTypeException);
      expect(element.properties[propertyName]).toBeUndefined();
    });
  });

  describe('setCoordinates', () => {
    it('Should update the coordinates of a node', () => {
      const lat = 1.234;
      const lon = -0.456;
      const osm = new OsmRequest();
      const element = osm.setCoordinates(sampleFeature, lat, lon);
      const wrongElementType = () =>
        osm.setCoordinates(sampleFeatureCollection, lat, lon);

      expect(sampleFeature.geometry.coordinates).not.toEqual([lon, lat]);
      expect(wrongElementType).toThrow(WrongElementTypeException);
      expect(element.geometry.coordinates).toEqual([lon, lat]);
    });
  });

  describe('incrementVersion', () => {
    it('Should upgrade the version number of a node', () => {
      const osm = new OsmRequest();
      const element = osm.incrementVersion(sampleFeature);
      const expected = (
        parseInt(sampleFeature.properties.version, 10) + 1
      ).toString();

      expect(element.properties.version).toBe(expected);
    });
  });
});
