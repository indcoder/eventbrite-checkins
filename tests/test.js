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
