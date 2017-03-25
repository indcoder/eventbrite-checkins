'use strict';

const sinon = require('sinon');
var Bluebird = require('bluebird');
require('sinon-as-promised')(Bluebird);
const chai = require('chai');
const should = chai.should();
const chaiAsPromised = require("chai-as-promised");
const proxyquire = require('proxyquire');
let sandbox;
let apiCall;
let eventbrite_checkins ;
chai.use(chaiAsPromised);
chai.config.includeStack = true;


describe('Given the eventbrite_checkins module test in offline unit mode', function() {

  beforeEach(()=>{
    sandbox = sinon.sandbox.create();
    apiCall = sandbox.stub();
    eventbrite_checkins = proxyquire('../src/index.js', {'../lib/callAPI' : apiCall});
  });
    

  afterEach(() => {
    sandbox.restore();
  });
  
  it('should return a function', () => {
    (eventbrite_checkins.getCheckedInAttendees).should.be.a('function'); 
        
  });

  it('should return a Promise' , () => {
    const input = {
      "attendees" : []
    };
    apiCall.resolves(JSON.stringify(input));
    const checkinsResult = eventbrite_checkins.getCheckedInAttendees('dummytoken', 'dummyeventid');
    checkinsResult.then.should.be.a('function'); 
    checkinsResult.catch.should.be.a('function');
  });
  

  it('should throw a network error if a connection cannot be made to Eventbrite API endpoint', ()=>{
    const connect_error = new Error("getaddrinfo ENOTFOUND");
    apiCall.rejects(connect_error);
    return eventbrite_checkins.getCheckedInAttendees('accesstokentestauth', 'eventidtestauth').should.eventually.be.rejectedWith('getaddrinfo ENOTFOUND');
  });

  it('should throw an authentication error if incorrect token is sent in api url', () => {
    const auth_error = new Error("INVALID_AUTH");
    apiCall.rejects(auth_error);
    return eventbrite_checkins.getCheckedInAttendees('dummy_access_token', 'dummy_event_id').should.eventually.be.rejectedWith("INVALID_AUTH");
  });

  it('should throw the error if EB API returns an error on processing the request', ()=> {
    const argument_error = new Error("ARGUMENTS_ERROR");
    apiCall.rejects(argument_error);
    return eventbrite_checkins.getCheckedInAttendees('dummy_access_token', 'dummy_event_id').should.eventually.be.rejectedWith("ARGUMENTS_ERROR");
  });

  it('should return an empty list when no attendees has checked into the event', () => {
    const input = {
      "attendees" : []
    };
    apiCall.resolves(JSON.stringify(input));
    return eventbrite_checkins.getCheckedInAttendees('dummy_accesss_token', 'dummy_event_id').should.eventually.be.eql([]);
     
  });

  it('should return the list of checkedin attendees', ()=> {

    /*
      The input has three dummy attendees in which the first and last attendee have been marked checked in while the second has not.
    */
    const input = { "attendees": 
     [

        { "profile": {"first_name": "Attendee", "last_name": "First", "addresses": 
            {"home": {"city": "Mumbai", "country": "IN", "region": "Maharashtra", "postal_code": "400000",
              "address_1": "Lala Land", "address_2": "Moonlight"}
              }, "cell_phone": "9920220856", 
              "email": "attendee1@mtp.mtp", "name": "Attendee First"}, "barcodes": [{"status": "used",
              "changed": "2017-02-28T13:38:14Z", "created": "2017-02-18T13:15:47Z",
                "checkin_type": 2, "checkin_method": "search"}], 
                  "checked_in": true, "cancelled": false, "refunded": false, 
                    "status": "Checked In", "id" : 1001},

        { "profile": {"first_name": "Attendee", "last_name": "Second", "addresses": 
            {"home": {"city": "Mumbai", "country": "IN", "region": "Maharashtra", "postal_code": "400000",
              "address_1": "Lala Land", "address_2": "Moonlight"}
              }, "cell_phone": "9920220856", 
              "email": "attendee2@mtp.mtp", "name": "Attendee Second"}, "barcodes": [{"status": "used",
              "changed": "2017-02-28T13:38:14Z", "created": "2017-02-18T13:15:47Z",
                "checkin_type": 2, "checkin_method": "search"}], 
                  "checked_in": false, "cancelled": false, "refunded": false, 
                    "status": "Checked In", "id" : 1002},

        { "profile": {"first_name": "Attendee", "last_name": "Third", "addresses": 
            {"home": {"city": "Mumbai", "country": "IN", "region": "Maharashtra", "postal_code": "400000",
              "address_1": "Lala Land", "address_2": "Moonlight"}
              }, "cell_phone": "9920220856", 
              "email": "attendee3@mtp.mtp", "name": "Attendee Third"}, "barcodes": [{"status": "used",
              "changed": "2017-02-28T13:38:14Z", "created": "2017-02-18T13:15:47Z",
                "checkin_type": 2, "checkin_method": "search"}], 
                  "checked_in": true, "cancelled": false, "refunded": false, 
                    "status": "Checked In" , "id" : 1003}


    ]}; 

    const result = [ { name: 'Attendee First',
                       email: 'attendee1@mtp.mtp',
                       evenbrite_id: 1001 },


                     { name: 'Attendee Third',
                       email: 'attendee3@mtp.mtp',
                       evenbrite_id: 1003 } ] ;

    apiCall.resolves(JSON.stringify(input));
    
    return eventbrite_checkins.getCheckedInAttendees('dummyaccesstoken', 'dummyeventid').should.eventually.eql(result);
/*
    eventbrite_checkins.getCheckedInAttendees('dummyaccesstoken', 'dummyeventid')
      .then((obj) =>{
         console.log(obj);
        
      })
      .then(done,done);
*/
  });


  it('should return the list of noshow registerants if flag is noshow', () => {
    const input = { "attendees": 
     [

        { "profile": {"first_name": "Attendee", "last_name": "First", "addresses": 
            {"home": {"city": "Mumbai", "country": "IN", "region": "Maharashtra", "postal_code": "400000",
              "address_1": "Lala Land", "address_2": "Moonlight"}
              }, "cell_phone": "9920220856", 
              "email": "attendee1@mtp.mtp", "name": "Attendee First"}, "barcodes": [{"status": "used",
              "changed": "2017-02-28T13:38:14Z", "created": "2017-02-18T13:15:47Z",
                "checkin_type": 2, "checkin_method": "search"}], 
                  "checked_in": true, "cancelled": false, "refunded": false, 
                    "status": "Checked In", "id" : 1001},

        { "profile": {"first_name": "Attendee", "last_name": "Second", "addresses": 
            {"home": {"city": "Mumbai", "country": "IN", "region": "Maharashtra", "postal_code": "400000",
              "address_1": "Lala Land", "address_2": "Moonlight"}
              }, "cell_phone": "9920220856", 
              "email": "attendee2@mtp.mtp", "name": "Attendee Second"}, "barcodes": [{"status": "used",
              "changed": "2017-02-28T13:38:14Z", "created": "2017-02-18T13:15:47Z",
                "checkin_type": 2, "checkin_method": "search"}], 
                  "checked_in": false, "cancelled": false, "refunded": false, 
                    "status": "Checked In", "id" : 1002},

        { "profile": {"first_name": "Attendee", "last_name": "Third", "addresses": 
            {"home": {"city": "Mumbai", "country": "IN", "region": "Maharashtra", "postal_code": "400000",
              "address_1": "Lala Land", "address_2": "Moonlight"}
              }, "cell_phone": "9920220856", 
              "email": "attendee3@mtp.mtp", "name": "Attendee Third"}, "barcodes": [{"status": "used",
              "changed": "2017-02-28T13:38:14Z", "created": "2017-02-18T13:15:47Z",
                "checkin_type": 2, "checkin_method": "search"}], 
                  "checked_in": true, "cancelled": false, "refunded": false, 
                    "status": "Checked In" , "id" : 1003}


    ]}; 

    const result = [ { name: 'Attendee Second',
                       email: 'attendee2@mtp.mtp',
                       evenbrite_id: 1002 }
                       ];

    apiCall.resolves(JSON.stringify(input));
    
    return eventbrite_checkins.getCheckedInAttendees('dummyaccesstoken', 'dummyeventid', 'noshow').should.eventually.eql(result);
  });

  it('should throw an error if EB module is invoked with incorrect number of arguments', ()=> {
       
    return eventbrite_checkins.getCheckedInAttendees('dummy_access_token').should.eventually.be.rejectedWith("INCORRECT_ARGUMENT");
  });

  it('should throw an error if EB module is invoked with a wrong flag', ()=> {
       
    return eventbrite_checkins.getCheckedInAttendees('dummy_access_token', 'dummy_event_token', 'random').should.eventually.be.rejectedWith("INCORRECT_FLAG");
  });

});


/*
  If you want to test the module in online mode , uncomment the below describe section and comment the above describe section
  because we can "import/require" only one version of the module and the above describe sections uses proxyquire initialized module

*/
/*

describe("Given the eb-module in online/connected mode" , function(){
    this.timeout(15000);
    it("should get the request payload for a known past event ", (done)=>{
      
      const eventbrite_checkins_online = require("../src/index.js");
      eventbrite_checkins_online.getCheckedInAttendees("<Your Eeventbrite token>", "<Event ID>")
                                    .then( data => {
                                      console.log(data);
                                      
                                    })
                                    .then(done,done);
                                     
                                    
      
      //return eventbrite_checkins_online.getCheckedInAttendees("<Your Eeventbrite token>", "<Event ID>").should.eventually.be.a("array");
    });
});
*/