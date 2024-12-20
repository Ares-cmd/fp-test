import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it, beforeEach } from 'mocha';
import sinon from 'sinon';
import app from '../src/server';
import * as fileUtils from '../src/utils/fileUtils';

const expect = chai.expect;
chai.use(chaiHttp);

describe('Apparel API', () => {
  let readInventoryStub: sinon.SinonStub;
  let writeInventoryStub: sinon.SinonStub;

  beforeEach(() => {
    readInventoryStub = sinon.stub(fileUtils, 'readInventory');
    writeInventoryStub = sinon.stub(fileUtils, 'writeInventory');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('PUT /api/apparel should update a single apparel item', async () => {
    readInventoryStub.resolves([]);
    writeInventoryStub.resolves();

    const response = await chai
      .request(app)
      .put('/api/apparel')
      .send({ code: 'A001', size: 'M', quantity: 10, price: 29.99 });

    expect(response).to.have.status(200);
    expect(response.body).to.have.property('message', 'Apparel updated successfully');
    expect(writeInventoryStub.calledOnce).to.be.true;
    expect(writeInventoryStub.firstCall.args[0]).to.deep.equal([{ code: 'A001', size: 'M', quantity: 10, price: 29.99 }]);
  });

  it('PUT /api/apparel/bulk should update multiple apparel items', async () => {
    readInventoryStub.resolves([]);
    writeInventoryStub.resolves();

    const response = await chai
      .request(app)
      .put('/api/apparel/bulk')
      .send([
        { code: 'A001', size: 'M', quantity: 10, price: 29.99 },
        { code: 'A002', size: 'L', quantity: 5, price: 34.99 },
      ]);

    expect(response).to.have.status(200);
    expect(response.body).to.have.property('message', 'Apparel updated successfully');
    expect(writeInventoryStub.calledOnce).to.be.true;
    expect(writeInventoryStub.firstCall.args[0]).to.deep.equal([
      { code: 'A001', size: 'M', quantity: 10, price: 29.99 },
      { code: 'A002', size: 'L', quantity: 5, price: 34.99 },
    ]);
  });

  it('POST /api/order/check should check if an order can be fulfilled', async () => {
    readInventoryStub.resolves([
      { code: 'A001', size: 'M', quantity: 10, price: 29.99 },
      { code: 'A002', size: 'L', quantity: 5, price: 34.99 },
    ]);

    const response = await chai
      .request(app)
      .post('/api/order/check')
      .send({
        items: [
          { code: 'A001', size: 'M', quantity: 2 },
          { code: 'A002', size: 'L', quantity: 1 },
        ],
      });

    expect(response).to.have.status(200);
    expect(response.body).to.have.property('canFulfill', true);
  });

  it('POST /api/order/cost should calculate the lowest cost for an order', async () => {
    readInventoryStub.resolves([
      { code: 'A001', size: 'M', quantity: 10, price: 29.99 },
      { code: 'A002', size: 'L', quantity: 5, price: 34.99 },
    ]);

    const response = await chai
      .request(app)
      .post('/api/order/cost')
      .send({
        items: [
          { code: 'A001', size: 'M', quantity: 2 },
          { code: 'A002', size: 'L', quantity: 1 },
        ],
      });

    expect(response).to.have.status(200);
    expect(response.body).to.have.property('totalCost').that.is.closeTo(94.97, 0.01);
  });
});

