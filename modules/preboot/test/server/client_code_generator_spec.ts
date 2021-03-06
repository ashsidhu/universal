/// <reference path="../../typings/tsd.d.ts"/>

import * as browserify from 'browserify';
import {ignoreUnusedStrategies, getClientCode} from '../../src/server/client_code_generator';

describe('client_code_generator', function () {

  describe('ignoreUnusedStrategies()', function () {
    it('should filter out inactive strategies', function () {
      let b = browserify();
      let bOpts = { something: 'yo' };
      let strategyOpts = [{ name: 'foo' }, { name: 'choo' }];
      let allStrategies = { foo: true, choo: true, zoo: true, moo: true };
      let pathPrefix = 'prefix';

      spyOn(b, 'ignore');

      ignoreUnusedStrategies(b, bOpts, strategyOpts, allStrategies, pathPrefix);

      expect(b.ignore).not.toHaveBeenCalledWith(pathPrefix + 'foo.js', bOpts);
      expect(b.ignore).not.toHaveBeenCalledWith(pathPrefix + 'choo.js', bOpts);
      expect(b.ignore).toHaveBeenCalledWith(pathPrefix + 'zoo.js', bOpts);
      expect(b.ignore).toHaveBeenCalledWith(pathPrefix + 'moo.js', bOpts);
    });
  });

  describe('getClientCode()', function () {
    it('should get the client code when there are no options', function () {
      let opts = {};
      let fn = () => getClientCode(opts);
      expect(fn).toThrowError('Not listening for any events. Preboot not going to do anything.');
    });

    it('should get client code with a listen strategy', function (done) {
      let opts = { listen: [{ name: 'selectors' }] };
      getClientCode(opts, function (err, clientCode) {
        expect(err).toBeNull();
        expect(clientCode).toMatch(/function getNodeEvents/);
        done();
      });
    });
  });

});
