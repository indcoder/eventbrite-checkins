import debug from 'debug'
import * as rm from 'typed-rest-client/RestClient'
import { IAttendee, IEBEventAttendees } from './eventbrite-event-attendee-json'

const logger = debug('ebcheckin:module')
const errorLogger = debug('ebcheckin:error')

type AttendanceFlag = 'NOSHOW' | 'CHECKEDIN'

const baseURL = 'https://www.eventbriteapi.com/v3/events/'
const rest: rm.RestClient = new rm.RestClient('ebCheckins', baseURL)

/**
 * Get the attendees of an Eventbrite event depending on their attendance status
 * @param {string} accessToken
 * @param {number} eventID
 * @param {string} flag
 * @return {[object]}
 */

export async function getAttendeesForEvent(
  accessToken: string,
  eventID: string,
  flag?: AttendanceFlag
): Promise<IAttendee[]> {
  try {
    const res: rm.IRestResponse<IEBEventAttendees> = await rest.get<
      IEBEventAttendees
    >(`${eventID}/attendees/?token=${accessToken}`)

    logger(`${eventID}/attendees/?token=${accessToken}`)

    if (res.result) {
      const attendees: IAttendee[] = res.result.attendees
      switch (flag) {
        case 'CHECKEDIN':
          const checkedinAttendees: IAttendee[] = []
          attendees.forEach((attendee: IAttendee) => {
            if (attendee.checked_in === true) {
              checkedinAttendees.push(attendee)
            }
          })
          return checkedinAttendees
        case 'NOSHOW':
          const noshowAttendees: IAttendee[] = []
          attendees.forEach((attendee: IAttendee) => {
            if (
              attendee.checked_in === false &&
              attendee.refunded === false &&
              attendee.cancelled === false
            ) {
              noshowAttendees.push(attendee)
            }
          })
          return noshowAttendees
        default:
          return attendees
      }
    } else {
      throw new Error('Error in processing json payload')
    }
  } catch (err) {
    errorLogger(`Error thrown during Eventbrite API invocation: {err
    }`)
    throw new Error(err)
  }
}

/**
 * Check if the attendee has registered for the Eventbrite event
 * @param {string} accessToken
 * @param {number} eventID
 * @param {string} attendeeID
 * @return {boolean}
 */

export async function hasRegisteredForEvent(
  accessToken: string,
  eventID: string,
  attendeeID: string
): Promise<boolean> {
  try {
    await rest.get<IAttendee>(
      `${eventID}/attendees/${attendeeID}?token=${accessToken}`
    )

    return true
  } catch (err) {
    // console.error('Error in EB registrant invocation', err);
    return false
  }
}
