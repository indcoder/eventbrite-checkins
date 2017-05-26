const IPromise = require('bluebird');
const callEventBriteAPI = require('minimal-request-promise');
const host = 'https://www.eventbriteapi.com/v3';
const debug = require('debug')('eb-checkin');

/**
 * Get attendees that are checked-in for an Eventbrite event
 * @param {string} accessToken
 * @param {number} eventID
 * @param {string} flag
 * @return {[string]}
 */

function getAttendeesForEvent(accessToken, eventID, flag) {
  return IPromise
          .try(() =>{
            const path = `/events/${eventID}/attendees/?token=${accessToken}`;
            debug(`Url is ${host + path}`);
            debug(`Flag is ${flag}`);
            if(arguments.length < 2 || (typeof accessToken === 'undefined') || (eventID === 'undefined')) {
              throw new Error('INCORRECT_ARGUMENTS');
            }
            if (flag && !(['noshow', 'checkedin', 'all'].indexOf(flag.toLowerCase()) > -1)) {
              throw new Error('INCORRECT_FLAG');
            }

            return callEventBriteAPI(host + path, Promise);
          })
          .then(body => {
            const result = JSON.parse(body);
            debug(`Message returned: ${result.attendees}`);
            return result.attendees;
          })
          .filter(attendee =>{
            if(!flag) {
              return attendee;
            }

            else if(flag.toLowerCase() === 'noshow') {
              return attendee.checked_in === false && attendee.cancelled === false && attendee.refunded === false;
            }
            return attendee.checked_in === true && attendee.cancelled === false && attendee.refunded === false;

          })
          .map(attendee => {
            debug(`The filtered attendee name is ${attendee.profile.name}`);
            return {
              'name': attendee.profile.name,
              'email': attendee.profile.email,
              'evenbriteID': attendee.id,
            };
          })
          .catch(err => {
            console.error('Error ', err);
            throw new Error(err);
          });

}

module.exports = {
  getAttendeesForEvent,
};
