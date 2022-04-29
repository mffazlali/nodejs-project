import {describe, it} from "mocha";
import {expect} from 'expect'
import request from 'supertest';
import {app2} from './app'

describe('http service', () => {
    it('getJson /json', (done) => {
        request(app2.app)
            .get('/json')
            .expect(200)
            .expect((res) => {
                expect(res.body).toContainEqual({name: 'google', address: 'google.com'});
                console.log('res', res.body);
            })
            .end(done);
    })
})