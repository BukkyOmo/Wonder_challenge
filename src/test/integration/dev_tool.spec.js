import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../index';

chai.use(chaiHttp);
chai.should();

describe('INTEGRATION TEST FOR DEV TOOLS CONTOLLER', () => {
    describe('/GET ALL MESSAGES ROUTE', () => {
        it('it should successfully get all messages available in queue', (done) => {
            chai
                .request(app)
                .get('/api/v1/dev/messages')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have
                        .property('message')
                        .to.equals(`Messages in queue successfully fetched`);
                    done();
                });
        });
        it('it should successfully get messages with status provided in query', (done) => {
            chai
                .request(app)
                .get('/api/v1/dev/messages/status')
                .query({
                    status: 'processing'
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have
                        .property('message')
                        .to.equals(`Messages with status processing successfully fetched`);
                    done();
                });
        });
        it('it should successfully get messages with status provided in query', (done) => {
            chai
                .request(app)
                .get('/api/v1/dev/messages/status')
                .query({
                    status: 'unprocessed'
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have
                        .property('message')
                        .to.equals(`Messages with status unprocessed successfully fetched`);
                    done();
                });
        });
        it('it should successfully get count of messages from the queue', (done) => {
            chai
                .request(app)
                .get('/api/v1/dev/messages/count')
                .query({
                    status: 'processing'
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have
                        .property('message')
                        .to.equals(`Count of processing messages successfully fetched`);
                    done();
                });
        });
        it('it should successfully get count of messages from the queue', (done) => {
            chai
                .request(app)
                .get('/api/v1/dev/messages/count')
                .query({
                    status: 'unprocessed'
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have
                        .property('message')
                        .to.equals(`Count of unprocessed messages successfully fetched`);
                    done();
                });
        });
    });
});