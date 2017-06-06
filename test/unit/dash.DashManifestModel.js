import DashManifestModel from '../../src/dash/models/DashManifestModel';
import BaseURL from '../../src/dash/vo/BaseURL';
import MpdHelper from './helpers/MPDHelper';

const expect = require('chai').expect;

const context = {};
const dashManifestModel = DashManifestModel(context).getInstance();

const TEST_URL = 'http://www.example.com/';
const RELATIVE_TEST_URL = './';
const SERVICE_LOCATION = 'testServiceLocation';
const EMPTY_STRING = '';

describe('DashManifestModel', function () {
    
    const mpdHelper = new MpdHelper();

    it('should return false when getIsTypeOf is called and adaptation is undefined', () => {
        const isTypeOf = dashManifestModel.getIsTypeOf();

        expect(isTypeOf).to.be.false;  // jshint ignore:line
    });

    it('should return false when getIsTypeOf is called and type is undefined', () => {
        var adaptation = mpdHelper.composeAdaptation('video');
        const isTypeOf = dashManifestModel.getIsTypeOf(adaptation);

        expect(isTypeOf).to.be.false;  // jshint ignore:line
    });

    it('should return false when getIsTypeOf is called and type is empty string', () => {
        var adaptation = mpdHelper.composeAdaptation('video');
        const isTypeOf = dashManifestModel.getIsTypeOf(adaptation, EMPTY_STRING);

        expect(isTypeOf).to.be.false;  // jshint ignore:line
    });

    it('should return false when getIsTextTrack is called and type is undefined', () => {
        const isTextTrack = dashManifestModel.getIsTextTrack();

        expect(isTextTrack).to.be.false;  // jshint ignore:line
    });
    
    it('should return empty string when getLanguageForAdaptation is called and adaptation is undefined', () => {
        const language = dashManifestModel.getLanguageForAdaptation();

        expect(language).to.equal(EMPTY_STRING);  // jshint ignore:line
    });

    it('should return null when getViewpointForAdaptation is called and adaptation is undefined', () => {
        const viewPoint = dashManifestModel.getViewpointForAdaptation();

        expect(viewPoint).to.be.null;     // jshint ignore:line
    });

    it('should return an empty array when getAudioChannelConfigurationForAdaptation is called and adaptation is undefined', () => {
        const AudioChannelConfigurationArray = dashManifestModel.getAudioChannelConfigurationForAdaptation();

        expect(AudioChannelConfigurationArray).to.be.instanceOf(Array);    // jshint ignore:line
        expect(AudioChannelConfigurationArray).to.be.empty;                // jshint ignore:line
    });

    it('should return an empty array when getAccessibilityForAdaptation is called and adaptation is undefined', () => {
        const accessibilityArray = dashManifestModel.getAccessibilityForAdaptation();

        expect(accessibilityArray).to.be.instanceOf(Array);    // jshint ignore:line
        expect(accessibilityArray).to.be.empty;                // jshint ignore:line
    });

    it('should return an empty array when getRolesForAdaptation is called and adaptation is undefined', () => {
        const rolesArray = dashManifestModel.getRolesForAdaptation();

        expect(rolesArray).to.be.instanceOf(Array);    // jshint ignore:line
        expect(rolesArray).to.be.empty;                // jshint ignore:line
    });

    it('should return undefined when processAdaptation is called and adaptation is undefined', () => {
        const adaptation = dashManifestModel.processAdaptation();

        expect(adaptation).to.be.undefined;    // jshint ignore:line
    });

    it('should return null when getAdaptationForId is called and id, manifest and periodIndex are undefined', () => {
        const adaptation = dashManifestModel.getAdaptationForId(undefined, undefined, undefined);

        expect(adaptation).to.be.null;    // jshint ignore:line
    });

    it('should return null when getAdaptationForId is called and id and periodIndex are undefined', () => {
        const manifest = { Period_asArray: [] };
        const adaptation = dashManifestModel.getAdaptationForId(undefined, manifest, undefined);

        expect(adaptation).to.be.null;    // jshint ignore:line
    });

    it('should return null when getAdaptationForId is called and id is undefined', () => {
        const manifest = { Period_asArray: [] };
        const adaptation = dashManifestModel.getAdaptationForId(undefined, manifest, 2);

        expect(adaptation).to.be.null;    // jshint ignore:line
    });

    it('should return null when getAdaptationForId is called and id is undefined and periodIndex = 0', () => {
        const manifest = { Period_asArray: [ { AdaptationSet_asArray: [ { id: 0 } ] }] };
        const adaptation = dashManifestModel.getAdaptationForId(undefined, manifest, 0);

        expect(adaptation).to.be.null;    // jshint ignore:line
    });

    it('should return valid value when getAdaptationForId is called and id is 0 and periodIndex = 0', () => {
        const manifest = { Period_asArray: [ { AdaptationSet_asArray: [ { id: 0 } ] }] };
        const adaptation = dashManifestModel.getAdaptationForId(0, manifest, 0);

        expect(adaptation.id).to.equal(0); // jshint ignore:line
    });

    it('should return null when getAdaptationForIndex is called and index, manifest and periodIndex are undefined', () => {
        const adaptation = dashManifestModel.getAdaptationForIndex(undefined, undefined, undefined);

        expect(adaptation).to.be.null;    // jshint ignore:line
    });

    it('should return null when getAdaptationForIndex is called and id and periodIndex are undefined', () => {
        const manifest = { Period_asArray: [] };
        const adaptation = dashManifestModel.getAdaptationForIndex(undefined, manifest, undefined);

        expect(adaptation).to.be.null;    // jshint ignore:line
    });

    it('should return null when getAdaptationForIndex is called and id is undefined', () => {
        const manifest = { Period_asArray: [] };
        const adaptation = dashManifestModel.getAdaptationForIndex(undefined, manifest, 2);

        expect(adaptation).to.be.null;    // jshint ignore:line
    });

    it('should return null when getAdaptationForIndex is called and id is undefined and periodIndex = 0', () => {
        const manifest = { Period_asArray: [ { AdaptationSet_asArray: [ { id: 0 } ] }] };
        const adaptation = dashManifestModel.getAdaptationForIndex(undefined, manifest, 0);

        expect(adaptation).to.be.null;    // jshint ignore:line
    });

    it('should return valid value when getAdaptationForIndex is called and id is 0 and periodIndex = 0', () => {
        const manifest = { Period_asArray: [ { AdaptationSet_asArray: [ { id: 0 } ] }] };
        const adaptation = dashManifestModel.getAdaptationForIndex(0, manifest, 0);

        expect(adaptation.id).to.equal(0); // jshint ignore:line
    });
    
    it('should return -1 when getIndexForAdaptation is called and adaptation, manifest and periodIndex are undefined', () => {
        const index = dashManifestModel.getIndexForAdaptation(undefined, undefined, undefined);

        expect(index).to.equal(-1); // jshint ignore:line
    });

    it('should return -1 when getIndexForAdaptation is called and manifest and periodIndex are undefined', () => {
        const manifest = { Period_asArray: [] };
        var adaptation = mpdHelper.composeAdaptation('video');
        const index = dashManifestModel.getIndexForAdaptation(adaptation, manifest, undefined);

        expect(index).to.equal(-1); // jshint ignore:line
    });

    it('should return -1 when getIndexForAdaptation is called and periodIndex are undefined', () => {
        var adaptation = mpdHelper.composeAdaptation('video');
        const index = dashManifestModel.getIndexForAdaptation(adaptation, undefined, undefined);

        expect(index).to.equal(-1); // jshint ignore:line
    });

    it('should return an empty array when getAdaptationsForType is called and manifest, periodIndex and type are undefined', () => {
        const adaptationsArray = dashManifestModel.getAdaptationsForType();

        expect(adaptationsArray).to.be.instanceOf(Array);    // jshint ignore:line
        expect(adaptationsArray).to.be.empty;                // jshint ignore:line
    });

    it('should return an empty array when getAdaptationsForType is called and periodIndex and type are undefined', () => {
        const manifest = { Period_asArray: [] };
        const adaptationsArray = dashManifestModel.getAdaptationsForType(manifest, undefined, undefined);

        expect(adaptationsArray).to.be.instanceOf(Array);    // jshint ignore:line
        expect(adaptationsArray).to.be.empty;                // jshint ignore:line
    });

    it('should return an empty array when getAdaptationsForType is called and type is undefined', () => {
        const manifest = { Period_asArray: [ { AdaptationSet_asArray: [ { id: 0 } ] }] };
        const adaptationsArray = dashManifestModel.getAdaptationsForType(manifest, 0, undefined);

        expect(adaptationsArray).to.be.instanceOf(Array);    // jshint ignore:line
        expect(adaptationsArray).to.be.empty;                // jshint ignore:line
    });

    it('should return an empty array when getAdaptationForType is called and streamInfo is undefined', () => {
        const manifest = { Period_asArray: [ { AdaptationSet_asArray: [ { id: 0, mimeType: 'video' } ] }] };
        const adaptation = dashManifestModel.getAdaptationForType(manifest, 0, 'video', undefined);

        expect(adaptation.id).to.equal(0); // jshint ignore:line
    });

    it('should return null when getCodec is called and adaptation is undefined', () => {
        const codec = dashManifestModel.getCodec();

        expect(codec).to.be.null;    // jshint ignore:line
    });

    it('should return null when getCodec is called and adaptation.Representation_asArray is undefined', () => {
        const codec = dashManifestModel.getCodec({});

        expect(codec).to.be.null;    // jshint ignore:line
    });

    it('should return null when getCodec is called and adaptation.Representation_asArray.length is -1', () => {
        const codec = dashManifestModel.getCodec({Representation_asArray: {length: -1}});

        expect(codec).to.be.null;    // jshint ignore:line
    });

    it('should return null when getMimeType is called and adaptation is undefined', () => {
        const mimeType = dashManifestModel.getMimeType();

        expect(mimeType).to.be.null;    // jshint ignore:line
    });

    it('should return null when getMimeType is called and adaptation.Representation_asArray is undefined', () => {
        const mimeType = dashManifestModel.getMimeType({});

        expect(mimeType).to.be.null;    // jshint ignore:line
    });

    it('should return null when getMimeType is called and adaptation.Representation_asArray.length is -1', () => {
        const mimeType = dashManifestModel.getMimeType({Representation_asArray: {length: -1}});

        expect(mimeType).to.be.null;    // jshint ignore:line
    });

    it('should return null when getKID is called and adaptation is undefined', () => {
        const kid = dashManifestModel.getKID();

        expect(kid).to.be.null;    // jshint ignore:line
    });

    it('should return null when getContentProtectionData is called and adaptation is undefined', () => {
        const contentProtection = dashManifestModel.getContentProtectionData();

        expect(contentProtection).to.be.null;    // jshint ignore:line
    });

    it('should return false when getIsDynamic is called and manifest is undefined', () => {
        const isDynamic = dashManifestModel.getIsDynamic();

        expect(isDynamic).to.be.false;    // jshint ignore:line
    });
        
    it('should return true when getIsDVB is called and manifest contains a valid DVB profile', () => {
        const manifest = {
            profiles: 'urn:dvb:dash:profile:dvb-dash:2014,urn:dvb:dash:profile:dvb-dash:isoff-ext-live:2014'
        };

        const isDVB = dashManifestModel.getIsDVB(manifest);

        expect(isDVB).to.be.true; // jshint ignore:line
    });

    it('should return false when getIsDVB is called and manifest does not contain a valid DVB profile', () => {
        const manifest = {
            profiles: 'urn:mpeg:dash:profile:isoff-on-demand:2011, http://dashif.org/guildelines/dash264'
        };

        const isDVB = dashManifestModel.getIsDVB(manifest);

        expect(isDVB).to.be.false; // jshint ignore:line
    });   

    it('should return NaN when minimumUpdatePeriod is not present in manifest', () => {
        const manifest = {};
        const updatePeriod = dashManifestModel.getManifestUpdatePeriod(manifest);
        expect(updatePeriod).to.be.NaN; // jshint ignore:line
    });

    it('should return valid value when minimumUpdatePeriod is present in manifest and latencyOfLastUpdate is defined', () => {
        const minimumUpdatePeriod = 30;
        const latencyOfLastUpdate = 0.5;
        const manifest = { minimumUpdatePeriod:minimumUpdatePeriod };
        const expectedResult = minimumUpdatePeriod - latencyOfLastUpdate;
        const updatePeriod = dashManifestModel.getManifestUpdatePeriod(manifest, latencyOfLastUpdate);
        expect(updatePeriod).to.equal(expectedResult); // jshint ignore:line
    });

    it('should return valid value when minimumUpdatePeriod is present in manifest and latencyOfLastUpdate is not defined', () => {
        const minimumUpdatePeriod = 30;
        const manifest = { minimumUpdatePeriod:minimumUpdatePeriod };
        const expectedResult = minimumUpdatePeriod
        const updatePeriod = dashManifestModel.getManifestUpdatePeriod(manifest);
        expect(updatePeriod).to.equal(expectedResult); // jshint ignore:line
    });

    describe('getBaseUrlsFromElement', () => {
        it('returns an empty Array when no BaseURLs or baseUri are present on a node', () => {
            const node = {};

            const obj = dashManifestModel.getBaseURLsFromElement(node);

            expect(obj).to.be.instanceOf(Array);    // jshint ignore:line
            expect(obj).to.be.empty;                // jshint ignore:line

        });

        it('returns an Array of BaseURLs when no BaseURLs are present on a node, but there is a baseUri', () => {
            const node = {
                baseUri: TEST_URL
            };

            const obj = dashManifestModel.getBaseURLsFromElement(node);

            expect(obj).to.be.instanceOf(Array);        // jshint ignore:line
            expect(obj).to.have.lengthOf(1);            // jshint ignore:line
            expect(obj[0]).to.be.instanceOf(BaseURL);   // jshint ignore:line
            expect(obj[0].url).to.equal(TEST_URL);      // jshint ignore:line
        });

        it('returns an Array of BaseURLs with BaseURL[0] serviceLocation set to URL when no serviceLocation was specified', () => {
            const node = {
                BaseURL_asArray: [{
                    __text: TEST_URL
                }]
            };

            const obj = dashManifestModel.getBaseURLsFromElement(node);

            expect(obj).to.be.instanceOf(Array);                // jshint ignore:line
            expect(obj).to.have.lengthOf(1);                    // jshint ignore:line
            expect(obj[0]).to.be.instanceOf(BaseURL);           // jshint ignore:line
            expect(obj[0].url).to.equal(TEST_URL);              // jshint ignore:line
            expect(obj[0].serviceLocation).to.equal(TEST_URL);  // jshint ignore:line
        });

        it('returns an Array of BaseURLs with length 1 when multiple relative BaseUrls were specified', () => {
            const node = {
                BaseURL_asArray: [
                    {
                        __text: RELATIVE_TEST_URL + '0'
                    },
                    {
                        __text: RELATIVE_TEST_URL + '1'
                    }
                ]
            };

            const obj = dashManifestModel.getBaseURLsFromElement(node);

            expect(obj).to.be.instanceOf(Array);                    // jshint ignore:line
            expect(obj).to.have.lengthOf(1);                        // jshint ignore:line
            expect(obj[0]).to.be.instanceOf(BaseURL);               // jshint ignore:line
            expect(obj[0].url).to.equal(RELATIVE_TEST_URL + '0');   // jshint ignore:line
        });

        it('returns an Array of BaseURLs when multiple BaseUrls were specified', () => {
            const node = {
                BaseURL_asArray: [
                    {
                        __text: TEST_URL + '0'
                    },
                    {
                        __text: TEST_URL + '1'
                    }
                ]
            };

            const obj = dashManifestModel.getBaseURLsFromElement(node);

            expect(obj).to.be.instanceOf(Array);        // jshint ignore:line
            expect(obj).to.have.lengthOf(2);            // jshint ignore:line
            obj.forEach((o, i) => {
                expect(o).to.be.instanceOf(BaseURL);    // jshint ignore:line
                expect(o.url).to.equal(TEST_URL + i);   // jshint ignore:line
            });
        });

        it('returns an Array of BaseURLs with BaseURL[0] serviceLocation set when serviceLocation was specified', () => {
            const node = {
                BaseURL_asArray: [{
                    __text: TEST_URL,
                    serviceLocation: SERVICE_LOCATION
                }]
            };

            const obj = dashManifestModel.getBaseURLsFromElement(node);

            expect(obj).to.be.instanceOf(Array);                        // jshint ignore:line
            expect(obj).to.have.lengthOf(1);                            // jshint ignore:line
            expect(obj[0]).to.be.instanceOf(BaseURL);                   // jshint ignore:line
            expect(obj[0].url).to.equal(TEST_URL);                      // jshint ignore:line
            expect(obj[0].serviceLocation).to.equal(SERVICE_LOCATION);  // jshint ignore:line
        });

        it('returns an Array of BaseURLs with BaseURL[0] having correct defaults for DVB extensions when not specified', () => {
            const node = {
                BaseURL_asArray: [{
                    __text: TEST_URL
                }]
            };

            const obj = dashManifestModel.getBaseURLsFromElement(node);

            expect(obj).to.be.instanceOf(Array);                                // jshint ignore:line
            expect(obj).to.have.lengthOf(1);                                    // jshint ignore:line
            expect(obj[0].dvb_priority).to.equal(BaseURL.DEFAULT_DVB_PRIORITY); // jshint ignore:line
            expect(obj[0].dvb_weight).to.equal(BaseURL.DEFAULT_DVB_WEIGHT);     // jshint ignore:line
        });

        it('returns an Array of BaseURLs with BaseURL[0] having correct priority and weight for DVB extensions when specified', () => {
            const TEST_PRIORITY = 3;
            const TEST_WEIGHT = 2;
            const node = {
                BaseURL_asArray: [{
                    __text:         TEST_URL,
                    'dvb:priority': TEST_PRIORITY,
                    'dvb:weight':   TEST_WEIGHT
                }]
            };

            const obj = dashManifestModel.getBaseURLsFromElement(node);

            expect(obj).to.be.instanceOf(Array);                                // jshint ignore:line
            expect(obj).to.have.lengthOf(1);                                    // jshint ignore:line
            expect(obj[0].dvb_priority).to.equal(TEST_PRIORITY);                // jshint ignore:line
            expect(obj[0].dvb_weight).to.equal(TEST_WEIGHT);                    // jshint ignore:line
        });

        it('returns an Array of BaseURLs with BaseURL[0] resolved to the document base uri when the base uri is specified and the input url is relative', () => {
            const node = {
                baseUri: TEST_URL,
                BaseURL_asArray: [{
                    __text: RELATIVE_TEST_URL
                }]
            };

            const obj = dashManifestModel.getBaseURLsFromElement(node);

            expect(obj).to.be.instanceOf(Array);                                // jshint ignore:line
            expect(obj).to.have.lengthOf(1);                                    // jshint ignore:line
            expect(obj[0].url).to.equal(TEST_URL + RELATIVE_TEST_URL);          // jshint ignore:line
        });

        it('returns an Array of BaseURLs with BaseURL[0] ignoring the document base uri when the base uri is specified and the input url is absolute', () => {
            const node = {
                baseUri: TEST_URL,
                BaseURL_asArray: [{
                    __text: TEST_URL
                }]
            };

            const obj = dashManifestModel.getBaseURLsFromElement(node);

            expect(obj).to.be.instanceOf(Array);                                // jshint ignore:line
            expect(obj).to.have.lengthOf(1);                                    // jshint ignore:line
            expect(obj[0].url).to.equal(TEST_URL);                              // jshint ignore:line
        });

        it('returns an Array of BaseURLs with BaseURL[0] resolved to the document base uri when the base uri is specified but no other urls', () => {
            const node = {
                baseUri: TEST_URL
            };

            const obj = dashManifestModel.getBaseURLsFromElement(node);

            expect(obj).to.be.instanceOf(Array);                                // jshint ignore:line
            expect(obj).to.have.lengthOf(1);                                    // jshint ignore:line
            expect(obj[0].url).to.equal(TEST_URL);                              // jshint ignore:line
        });
    });
});
