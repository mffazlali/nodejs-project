import {describe, it} from 'mocha'
import {expect} from 'expect'
import {googleApiCallbackService, googleApiPromiseService, googleApiAxiosService} from './src/services/index'

describe('google Api service', () => {
    it('call getByQuery in googleApiCallbackService', (done) => {
        googleApiCallbackService.getByQuery(4225, (error, result) => {
            expect({name: 'Reza'}).toEqual({name: 'Reza'});
            expect([1, 2, 3]).toContain(2);
            expect(typeof result).toBe('object');
            expect(result).toStrictEqual({
                "error_message": "You must use an API key to authenticate each request to Google Maps Platform APIs. For additional information, please refer to http://g.co/dev/maps-no-account",
                results: [],
                status: 'REQUEST_DENIED',
            });
            expect(result).not.toEqual(expect.objectContaining({
                results: null
            }));
            done();
        });
    });

    it('call getByQuery in googleApiPromiseService', () => {
        googleApiPromiseService.getByQuery(4225).then((result) => {
            console.log('promise result: ', JSON.stringify(result, undefined, 2));
            if (result.results === []) {
                throw new Error('callback error')
            }
        }).catch(error => {
            console.log('promise error: ', error);
        });
    });


    it('call getByQuery in googleApiAxiosService', () => {
        googleApiAxiosService.getByQuery(4225).then((result) => {
            console.log('axios result: ', result.data);
            if (result.results === []) {
                throw new Error('callback error')
            }
        }).catch(error => {
            console.log('axios error: ', error);
        });
    });
})



