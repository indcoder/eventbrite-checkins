'use strict';

const Promise = require('bluebird');
const callEventBriteAPI = require('../lib/callAPI');
const host = 'https://www.eventbriteapi.com/v3';
const debug = require('debug')('eb-checkin');

/**
 * Get attendees that are checked-in for an Eventbrite event
 * @param {string} accessToken
 * @param {number} eventID
 * @param {string} flag
 * @return {[string]} 
 */
function getCheckedInAttendees (accessToken, eventID, flag) {  
  const path = `/events/${eventID}/attendees/?token=${accessToken}`;
  debug(`Url is ${host + path}`);
 
  return Promise
          .try(() => callEventBriteAPI(host + path))
          .then(body => {
            const result = JSON.parse(body);
            debug(`Message returned: ${result.attendees}`)
            return result.attendees;
          })
          .filter(attendee =>{
            return attendee.checked_in == true && attendee.cancelled == false && attendee.refunded == false ;
          })
          .map(attendee => {
            debug(`The filtered attendee name is ${attendee.profile.name}`);
              return {
                "name" : attendee.profile.name ,
                "email" : attendee.profile.email,
                "evenbrite_id" : attendee.id 
              }
          } )
          .catch(err => {
            console.error('Error ', err);
            throw new Error(err);
          });

};

module.exports = {  
  getCheckedInAttendees
}