import * as nock from 'nock'
import * as eventbriteCheckins from '../ebcheckins'
import {
  IAttendee,
  IEBEventAttendees
} from './../eventbrite-event-attendee-json'
import { attendeeMock, ebEventAttendeesMock } from './testdata/attendeefactory'

let scope: nock.Scope

describe('Given the eventbriteCheckins module', () => {
  beforeAll(async () => {
    scope = nock('https://www.eventbriteapi.com')
  })

  afterEach(() => {
    nock.cleanAll()
  })

  afterAll(nock.restore)

  describe('getEventAttendees', () => {
    let attendees: IAttendee[]
    let ebEventAttendees: IEBEventAttendees

    beforeAll(async () => {
      attendees = await attendeeMock.buildList(7)

      const Joe = await attendeeMock.build({
        cancelled: false,
        checked_in: true,
        profile: {
          first_name: 'Joe'
        },
        refunded: false
      })
      const Jack = await attendeeMock.build({
        cancelled: false,
        checked_in: true,
        profile: {
          first_name: 'Jack'
        },
        refunded: false
      })

      const Jill = await attendeeMock.build({
        cancelled: false,
        checked_in: true,
        profile: {
          first_name: 'Jill'
        },
        refunded: false
      })

      attendees.push(Joe)
      attendees.push(Jack)
      attendees.push(Jill)

      ebEventAttendees = await ebEventAttendeesMock.build({
        attendees
      })
    })

    test('is a function', () => {
      expect(typeof eventbriteCheckins.getAttendeesForEvent).toBe('function')
    })

    test('should throw a network error if a connection cannot be made to Eventbrite API endpoint', async () => {
      scope
        .get('/v3/events/dummyEventID/attendees?token=dummyTestToken')
        .replyWithError('ETIMEOUT')

      await expect(
        eventbriteCheckins.getAttendeesForEvent(
          'dummyTestToken',
          'dummyEventID'
        )
      ).rejects.toThrow('ETIMEOUT')
    })

    test('should throw an authentication error if incorrect token is sent in api url', async () => {
      scope
        .get('/v3/events/dummyEventID/attendees?token=dummyTestToken')
        .replyWithError('INVALID_AUTH')

      await expect(
        eventbriteCheckins.getAttendeesForEvent(
          'dummyTestToken',
          'dummyEventID'
        )
      ).rejects.toThrow('INVALID_AUTH')
    })

    // To-do: Need to validate the actual payload sent by Eventbrite[EB] when they are no checkins. We close this
    //  by testing it before event date of a newly created Eventbrite event [circa Jul'19 end]
    test.skip('should return an empty list when no attendees has checked into the event', async () => {
      scope
        .matchHeader('accept', 'application/json')
        .matchHeader('user-agent', 'ebCheckins')
        .get('/v3/events/dummyEventID/attendees?token=dummyTestToken')
        .reply(200, {})

      const attendeesEmpty: IAttendee[] = await eventbriteCheckins.getAttendeesForEvent(
        'dummyTestToken',
        'dummyEventID'
      )
      expect(attendeesEmpty).toBe([])
    })

    test('it should return only checked in attendees', async () => {
      scope
        .get('/v3/events/dummyEventID/attendees?token=dummyTestToken')
        .reply(200, ebEventAttendees)

      const result = await eventbriteCheckins.getAttendeesForEvent(
        'dummyTestToken',
        'dummyEventID'
      )
      expect(result.length).toBe(3)
    })

    test('it should return no shows registrants when flag is set to NOSHOW', async () => {
      scope
        .get('/v3/events/dummyEventID/attendees?token=dummyTestToken')
        .reply(200, ebEventAttendees)

      const result = await eventbriteCheckins.getAttendeesForEvent(
        'dummyTestToken',
        'dummyEventID',
        'NOSHOW'
      )
      expect(result.length).toBe(7)
    })

    test('it should return all the registrants when flag is set to ALL', async () => {
      scope
        .get('/v3/events/dummyEventID/attendees?token=dummyTestToken')
        .reply(200, ebEventAttendees)

      const result = await eventbriteCheckins.getAttendeesForEvent(
        'dummyTestToken',
        'dummyEventID',
        'ALL'
      )
      expect(result.length).toBe(10)
    })
  })

  describe('hasRegisteredForEvent', () => {
    let registrant: IAttendee

    beforeAll(async () => {
      registrant = await attendeeMock.build({
        id: '1234',
        profile: {
          first_name: 'Joel'
        }
      })
    })

    test('is a function', () => {
      expect(typeof eventbriteCheckins.hasRegisteredForEvent).toBe('function')
    })

    test('it returns false if provided Eventbrite id is not a registrant of the event', async () => {
      scope
        .get(
          '/v3/events/dummyEventID/attendees/wrongAttendeeID/?token=dummyTestToken'
        )
        .reply(404, 'NOT_FOUND')

      const result: boolean = await eventbriteCheckins.hasRegisteredForEvent(
        'dummyEventID',
        'wrongAttendeeID',
        'dummyTokenID'
      )

      expect(result).toBe(false)
    })

    test('it returns true if provided Eventbrite id is a registrant of the event', async () => {
      scope
        .get(
          '/v3/events/dummyEventID/attendees/correctAttendeeID?token=dummyTestToken'
        )
        .reply(200, registrant)

      const result: boolean = await eventbriteCheckins.hasRegisteredForEvent(
        'dummyTestToken',
        'dummyEventID',
        'correctAttendeeID'
      )

      expect(result).toBe(true)
    })
  })
})
