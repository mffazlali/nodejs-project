import {describe} from 'mocha';
import expect from 'expect';
import request from 'supertest';
import {appExpress} from "./app";
import {ActionType} from "./src/models";
import {ActionMongooseController} from "./src/controller";
import {ObjectId} from "mongodb";

before('before call service', (done) => {
    let actionMongooseController = new ActionMongooseController();
    actionMongooseController.deleteAll().then(() => {
        let actionData: Partial<ActionType> = {text: 'swim'};
        actionMongooseController.create(actionData as ActionType).then(() => done());
    })
})

beforeEach('before each call service', (done) => {
    done()
})

describe('web services', () => {
    it('fetchallaction', done => {
        request(appExpress)
            .get('/fetchallaction')
            .expect(200)
            .expect(res => {
                expect(Array.isArray(res.body)).toBe(true);
                expect([...res.body]).toHaveLength([...res.body].length)
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                done();
            });

    });
    it('fetchaction', done => {
        let objectId = {_id: '627b9f9eb34acd796a928c94'}
        request(appExpress)
            .get('/fetchaction')
            .query(objectId)
            .expect(200)
            .expect(res => {
                expect(Array.isArray(res.body)).toBe(true);
                expect([...res.body]).toHaveLength([...res.body].length)
                if (res.body.length > 0) {
                    expect(res.body[0]).toHaveProperty('completed');
                }
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });
    it('insertaction', done => {
        let actionData: Partial<ActionType> = {text: 'run'};
        request(appExpress)
            .post('/insertaction')
            .send(actionData)
            .expect(200)
            .expect(res => {
                expect(typeof res.body).toBe('object');
                expect(res.body).toHaveProperty('text');
                expect(res.body.text).toBe(actionData.text);
                expect(res.body).toEqual(expect.objectContaining(actionData));
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                done();
            });
    })
    it('updateaction', done => {
        let actionData: Partial<ActionType> = {_id: new ObjectId('627e5b26f730bd69752871e0'), text: 'sleep3'};
        request(appExpress)
            .patch('/updateaction')
            .send(actionData)
            .expect(200)
            .expect(res => {
                expect(typeof res.body).toBe('object');
                expect(res.body).toEqual(expect.objectContaining({matchedCount: 0}));
                expect(res.body).toEqual(expect.objectContaining({modifiedCount: 0}));
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                done();
            });
    })
    it('deleteaction', done => {
        let id = '627b9f9eb34acd796a928c94';
        request(appExpress)
            .delete(`/deleteaction/${id}`)
            .expect(200)
            .expect(res => {
                expect(typeof res.body).toBe('object');
                expect(res.body).toEqual(expect.objectContaining({deletedCount: 0}));
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                done();
            });
    })
})

