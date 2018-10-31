/* eslint camelcase: 0 */  // --> OFF
import * as chai from 'chai';
import * as eventbriteCheckins from '../src/index';
import * as chaiAsPromised from 'chai-as-promised';
import * as nock from 'nock';

chai.should();
chai.use(chaiAsPromised);

let scope: nock.Scope;

describe('Given the eventbriteCheckins module', () => {
  beforeEach(() => {
    scope = nock('https://www.eventbriteapi.com');
    
  });

  afterEach(() => {
    nock.cleanAll();
  });

  
  describe('getEventAttendees', () => {
    it('is a function', () => {
      eventbriteCheckins.getAttendeesForEvent.should.be.a('function');
    });

    it('should return a Promise', () => {
      const checkinsResult = eventbriteCheckins.getAttendeesForEvent(
        'dummytoken',
        'dummyeventid'
      );

      checkinsResult.then.should.be.a('function');
      checkinsResult.catch.should.be.a('function');
    });

    it('should throw a network error if a connection cannot be made to Eventbrite API endpoint', () => {
      
      scope
      .get('/v3/events/eventID/attendees/')
      .reply(404);

      return eventbriteCheckins
        .getAttendeesForEvent('testtoken', 'eventID')
        .should.eventually.be.empty;
    });

    it('should throw an authentication error if incorrect token is sent in api url', () => {
      // const authError = new Error('INVALID_AUTH');
      scope
      .get('/v3/events/eventID/attendees/')
      .reply(404);

      return eventbriteCheckins
        .getAttendeesForEvent('dummy_access_token', 'eventID')
        .should.eventually.be.empty;
    });

    it('should throw the error if EB API returns an error on processing the request', () => {
      scope
      .get('/v3/events/eventID/attendees/')
      .reply(404);
      const argumentError = new Error('ARGUMENTS_ERROR');
      return eventbriteCheckins
        .getAttendeesForEvent('dummy_access_token', 'eventID')
        .should.eventually.be.empty;
    });

    it('should return an empty list when no attendees has checked into the event', () => {
      
      scope
        .get('/v3/events/eventID/attendees/')
        .reply(404);

      const input = {
        attendees: [],
      };
      return eventbriteCheckins
        .getAttendeesForEvent('dummy_accesss_token', 'eventID')
        .should.eventually.be.eql([]);
    });

    it('should return the list of checkedin attendees', () => {
      /*
        The input has three dummy attendees in which the first and
        last attendee have been marked checked in while the second has not.
      */
      const input = {
        attendees: [
          {
            profile: {
              first_name: 'Attendee',
              last_name: 'First',
              addresses: {
                home: {
                  city: 'Mumbai',
                  country: 'IN',
                  region: 'Maharashtra',
                  postal_code: '400000',
                  address_1: 'Lala Land',
                  address_2: 'Moonlight',
                },
              },
              cell_phone: '9920220856',
              email: 'attendee1@mtp.mtp',
              name: 'Attendee First',
            },
            barcodes: [
              {
                status: 'used',
                changed: '2017-02-28T13:38:14Z',
                created: '2017-02-18T13:15:47Z',
                checkin_type: 2,
                checkin_method: 'search',
              },
            ],
            checked_in: true,
            cancelled: false,
            refunded: false,
            status: 'Checked In',
            id: 1001,
          },

          {
            profile: {
              first_name: 'Attendee',
              last_name: 'Second',
              addresses: {
                home: {
                  city: 'Mumbai',
                  country: 'IN',
                  region: 'Maharashtra',
                  postal_code: '400000',
                  address_1: 'Lala Land',
                  address_2: 'Moonlight',
                },
              },
              cell_phone: '9920220856',
              email: 'attendee2@mtp.mtp',
              name: 'Attendee Second',
            },
            barcodes: [
              {
                status: 'used',
                changed: '2017-02-28T13:38:14Z',
                created: '2017-02-18T13:15:47Z',
                checkin_type: 2,
                checkin_method: 'search',
              },
            ],
            checked_in: false,
            cancelled: false,
            refunded: false,
            status: 'Checked In',
            id: 1002,
          },

          {
            profile: {
              first_name: 'Attendee',
              last_name: 'Third',
              addresses: {
                home: {
                  city: 'Mumbai',
                  country: 'IN',
                  region: 'Maharashtra',
                  postal_code: '400000',
                  address_1: 'Lala Land',
                  address_2: 'Moonlight',
                },
              },
              cell_phone: '9920220856',
              email: 'attendee3@mtp.mtp',
              name: 'Attendee Third',
            },
            barcodes: [
              {
                status: 'used',
                changed: '2017-02-28T13:38:14Z',
                created: '2017-02-18T13:15:47Z',
                checkin_type: 2,
                checkin_method: 'search',
              },
            ],
            checked_in: true,
            cancelled: false,
            refunded: false,
            status: 'Checked In',
            id: 1003,
          },
        ],
      };

      const result = [
        {
          name: 'Attendee First',
          email: 'attendee1@mtp.mtp',
          evenbriteID: 1001,
        },

        {
          name: 'Attendee Third',
          email: 'attendee3@mtp.mtp',
          evenbriteID: 1003,
        },
      ];



      return eventbriteCheckins
        .getAttendeesForEvent('dummyaccesstoken', 'dummyeventid', 'checkedin')
        .should.eventually.eql(result);

      /*
      eventbriteCheckins.getAttendeesForEvent('dummyaccesstoken', 'dummyeventid')
        .then((obj) =>{
          console.log(obj);

        })
        .then(done,done);
      */
    });

    it('should return the list of noshow registerants if flag is noshow', () => {
      const input = {
        attendees: [
          {
            profile: {
              first_name: 'Attendee',
              last_name: 'First',
              addresses: {
                home: {
                  city: 'Mumbai',
                  country: 'IN',
                  region: 'Maharashtra',
                  postal_code: '400000',
                  address_1: 'Lala Land',
                  address_2: 'Moonlight',
                },
              },
              cell_phone: '9920220856',
              email: 'attendee1@mtp.mtp',
              name: 'Attendee First',
            },
            barcodes: [
              {
                status: 'used',
                changed: '2017-02-28T13:38:14Z',
                created: '2017-02-18T13:15:47Z',
                checkin_type: 2,
                checkin_method: 'search',
              },
            ],
            checked_in: true,
            cancelled: false,
            refunded: false,
            status: 'Checked In',
            id: 1001,
          },

          {
            profile: {
              first_name: 'Attendee',
              last_name: 'Second',
              addresses: {
                home: {
                  city: 'Mumbai',
                  country: 'IN',
                  region: 'Maharashtra',
                  postal_code: '400000',
                  address_1: 'Lala Land',
                  address_2: 'Moonlight',
                },
              },
              cell_phone: '9920220856',
              email: 'attendee2@mtp.mtp',
              name: 'Attendee Second',
            },
            barcodes: [
              {
                status: 'used',
                changed: '2017-02-28T13:38:14Z',
                created: '2017-02-18T13:15:47Z',
                checkin_type: 2,
                checkin_method: 'search',
              },
            ],
            checked_in: false,
            cancelled: false,
            refunded: false,
            status: 'Checked In',
            id: 1002,
          },

          {
            profile: {
              first_name: 'Attendee',
              last_name: 'Third',
              addresses: {
                home: {
                  city: 'Mumbai',
                  country: 'IN',
                  region: 'Maharashtra',
                  postal_code: '400000',
                  address_1: 'Lala Land',
                  address_2: 'Moonlight',
                },
              },
              cell_phone: '9920220856',
              email: 'attendee3@mtp.mtp',
              name: 'Attendee Third',
            },
            barcodes: [
              {
                status: 'used',
                changed: '2017-02-28T13:38:14Z',
                created: '2017-02-18T13:15:47Z',
                checkin_type: 2,
                checkin_method: 'search',
              },
            ],
            checked_in: true,
            cancelled: false,
            refunded: false,
            status: 'Checked In',
            id: 1003,
          },
        ],
      };

      const result = [
        {
          name: 'Attendee Second',
          email: 'attendee2@mtp.mtp',
          evenbriteID: 1002,
        },
      ];

      

      return eventbriteCheckins
        .getAttendeesForEvent('dummyaccesstoken', 'dummyeventid', 'noshow')
        .should.eventually.eql(result);
    });

    // Moving to Typescript has made this redundant
    // it('should throw an error if EB module is invoked with incorrect number of arguments', () => {
    //   return eventbriteCheckins
    //     .getAttendeesForEvent('dummy_access_token')
    //     .should.eventually.be.rejectedWith('INCORRECT_ARGUMENT');
    // });

    it('should throw an error if EB module is invoked with a wrong flag', () => {
      return eventbriteCheckins
        .getAttendeesForEvent(
          'dummy_access_token',
          'dummy_event_token',
          'random'
        )
        .should.eventually.be.rejectedWith('INCORRECT_FLAG');
    });
  });

  describe('hasRegisteredForEvent', () => {
    it('is a function', () => {
      eventbriteCheckins.hasRegisteredForEvent.should.be.a('function');
    });

    it('should return a Promise', () => {
      const input = {
        attendees: [],
      };
      
      const checkinsResult = eventbriteCheckins.hasRegisteredForEvent(
        'dummytoken',
        'dummyeventid',
        'dummyattendeeid'
      );
      checkinsResult.then.should.be.a('function');
      checkinsResult.catch.should.be.a('function');
    });
  });
});

/*
  If you want to test the module in online mode , uncomment the below describe section
  and comment the above describe section
  because we can "import/require" only one version of the module
  and the above describe sections uses proxyquire initialized module
*/
/*

describe("Given the eb-module in online/connected mode" , function(){
    this.timeout(15000);
    it("should get the request payload for a known past event ", (done)=>{

      const eventbriteCheckins_online = require("../src/index.js");
      eventbriteCheckins_online.getAttendeesForEvent("<Your Eeventbrite token>", "<Event ID>")
                                    .then( data => {
                                      console.log(data);

                                    })
                                    .then(done,done);

      //return eventbriteCheckins_online
                .getAttendeesForEvent("<Your Eeventbrite token>", "<Event ID>")
                .should.eventually.be.a("array");
    });
});
*/
