import {describe} from 'mocha';
import expect from 'expect';
import request from 'supertest';
import {appExpress} from "./app";
import {ActionType} from "./src/models";
import {ActionMongooseController} from "./src/controller";
import {ObjectId} from "mongodb";

before('before call service', (done) => {
    let actionMongooseController = new ActionMongooseController();
    // actionMongooseController.deleteAll().then(() => {
    //     let actionData: Partial<ActionType> = {text: 'swim'};
    //     actionMongooseController.create(actionData as ActionType).then(() => done());
    // })
    done();
})

beforeEach('before each call service', (done) => {
    done()
})

describe('web services', () => {
    describe('action', () => {
        it('fetchall', done => {
            request(appExpress)
                .get('/action/fetchall')
                .expect(200)
                .expect(res => {
                    const result = res.body.result
                    expect(Array.isArray(result)).toBe(true);
                    expect([...result]).toHaveLength([...result].length)
                })
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    done();
                });

        });
        it('fetch', done => {
            let objectId = {_id: '6283667a82ad466a79f5aef9'}
            request(appExpress)
                .get('/action/fetch')
                .query(objectId)
                .expect(200)
                .expect(res => {
                    const result = res.body.result
                    expect(typeof (result)).toBe('object');
                    if (res.body) {
                        expect(result).toHaveProperty('completed');
                    }
                })
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    done();
                });
        });
        it('insert', done => {
            let actionData: Partial<ActionType> = {text: 'run'};
            request(appExpress)
                .post('/action/insert')
                .send(actionData)
                .expect(200)
                .expect(res => {
                    const result = res.body.result
                    expect(typeof result).toBe('object');
                    expect(result).toHaveProperty('text');
                    expect(result.text).toBe(actionData.text);
                    expect(result).toEqual(expect.objectContaining(actionData));
                })
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    done();
                });
        })
        it('update', done => {
            let actionData: Partial<ActionType> = {_id: new ObjectId('6283667a82ad466a79f5aef9'), text: 'sleep3'};
            request(appExpress)
                .patch('/action/update')
                .send(actionData)
                .expect(200)
                .expect(res => {
                    const result = res.body.result
                    expect(result).not.toBeNull();
                    expect(typeof result).toBe('object');
                    // expect(res.body).toEqual(expect.objectContaining({matchedCount: 0}));
                    // expect(res.body).toEqual(expect.objectContaining({modifiedCount: 0}));
                })
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    done();
                });
        })
        it('delete', done => {
            let id = '6283667a82ad466a79f5aef9';
            request(appExpress)
                .delete(`/action/delete/${id}`)
                .expect(200)
                .expect(res => {
                    const result = res.body.result
                    expect(result).not.toBeNull();
                    expect(typeof result).toBe('object');
                    // expect(res.body).toEqual(expect.objectContaining({deletedCount: 0}));
                })
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    done();
                });
        })
    })
})

