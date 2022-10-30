import { expect } from 'chai';
import { it } from 'mocha';
import Sinon from 'sinon';
import jwt from 'jsonwebtoken';

import { verifyToken } from '../middlewares/authorization.js';
import ResponseError from '../util/response-error.js';

describe('Authorization Middleware', function () {
  describe('verifyToken Function', function () {
    it('should throw an error if no authorization header is set', function (done) {
      const req = {
        get(headerName) {
          return null;
        },
      };

      const nextSpy = Sinon.spy();

      verifyToken(req, {}, nextSpy).then(() => {
        const error = nextSpy.firstCall.firstArg;
        expect(error).to.be.instanceOf(ResponseError);
        expect(error).to.have.property(
          'message',
          'Your not authorized to do this action'
        );
        expect(error).to.have.property('status', 401);
        done();
      });
    });

    it('should throw an error if token doesn\'t start with "Bearer"', function (done) {
      const req = {
        get(headerName) {
          return 'xyz';
        },
      };

      const nextSpy = Sinon.spy();

      verifyToken(req, {}, nextSpy).then(() => {
        const error = nextSpy.firstCall.firstArg;
        expect(error).to.be.instanceOf(ResponseError);
        expect(error).to.have.property(
          'message',
          'Your not authorized to do this action'
        );
        expect(error).to.have.property('status', 401);
        done();
      });
    });

    it('should yield userId after verifying the token', function (done) {
      const req = {
        get(headerName) {
          return 'Bearer xyz';
        },
      };

      const stub = Sinon.stub(jwt, 'verify');
      stub.returns({ userId: 'abc' });

      verifyToken(req, {}, () => {}).then(() => {
        expect(req).to.have.property('userId');
        stub.restore();
        done();
      });

    });
  });
});
