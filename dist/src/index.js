"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const got = require("got");
/**
 * Get attendees that are checked-in for an Eventbrite event
 * @param {string} accessToken
 * @param {number} eventID
 * @param {string} flag
 * @return {[string]}
 */
function getAttendeesForEvent(accessToken, eventID, flag) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield got.get(`https://www.eventbriteapi.com/v3/events/${eventID}/attendees/`, { json: true });
        return [{ 'name': 'Augustine', 'eb_id': 'rrg' }];
        // return IPromise
        //   .try(() =>{
        //     const options = {
        //       uri: `https://www.eventbriteapi.com/v3/events/${eventID}/attendees/`,
        //       qs: {
        //         token: accessToken, // -> uri + '?access_token=xxxxx%20xxxxx'
        //       },
        //       json: true,
        //     };
        //     debug(`Flag is ${flag}`);
        //     if(arguments.length < 2 || (typeof accessToken === 'undefined') || (eventID === 'undefined')) {
        //       throw new Error('INCORRECT_ARGUMENTS');
        //     }
        //     if (flag && !(['noshow', 'checkedin', 'all'].indexOf(flag.toLowerCase()) > -1)) {
        //       throw new Error('INCORRECT_FLAG');
        //     }
        //     return rp(options);
        //   })
        //   .then(body => {
        //     debug(`Message returned: ${body.attendees}`);
        //     return body.attendees;
        //   })
        //   .filter(attendee =>{
        //     if(!flag) {
        //       return attendee;
        //     }
        //     else if(flag.toLowerCase() === 'noshow') {
        //       return attendee.checked_in === false && attendee.cancelled === false && attendee.refunded === false;
        //     }
        //     return attendee.checked_in === true && attendee.cancelled === false && attendee.refunded === false;
        //   })
        //   .map(attendee => {
        //     debug(`The filtered attendee name is ${attendee.profile.name}`);
        //     return {
        //       'name': attendee.profile.name,
        //       'email': attendee.profile.email,
        //       'evenbriteID': attendee.id,
        //     };
        //   })
        //   .catch(err => {
        //     console.error('Error ', err);
        //     throw new Error(err);
        //   });
    });
}
exports.getAttendeesForEvent = getAttendeesForEvent;
// function hasRegisteredForEvent(accessToken, eventID, attendeeID) {
//   return IPromise
//     .try(() =>{
//       const options = {
//         uri: `https://www.eventbriteapi.com/v3/events/${eventID}/attendees/${attendeeID}`,
//         qs: {
//           token: accessToken, // -> uri + '?access_token=xxxxx%20xxxxx'
//         },
//         json: true,
//       };
//       if(arguments.length < 3 || (typeof accessToken === 'undefined')
//         || (eventID === 'undefined') || (attendeeID === 'undefined')) {
//         throw new Error('INCORRECT_ARGUMENTS');
//       }
//       return rp(options);
//     })
//     .then(body =>{
//       if(body.id === attendeeID) {return true;}
//       return false;
//     })
//     .catch(error => {
//       console.error(`Error thrown during invocation ${error}`);
//       throw error;
//     });
// }
// module.exports = {
//   getAttendeesForEvent,
//   hasRegisteredForEvent,
// };
//# sourceMappingURL=index.js.map