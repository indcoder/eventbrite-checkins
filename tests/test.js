'use strict';

let eventbrite_api = require('../src/index.js');
let sinon = require('sinon');
let PassThrough = require('stream').PassThrough;
let https = require('https');
let chai = require('chai');
let should = chai.should();
let chaiAsPromised = require("chai-as-promised");


chai.use(chaiAsPromised);
chai.config.includeStack = true;

describe('eventbrite_checkins in online mode', function() {
  
  beforeEach(function(){
    this.get = sinon.stub(https,'get');
  });

  afterEach(function(){
    https.get.restore();
  });

  it('should should an empty list when no attendees has checked into the event', function(){
       return eventbrite_api('<Add your acesss token here>', '<Meetup Event id with 0 checkins>').should.eventually.have.length(0) ;
  })

});