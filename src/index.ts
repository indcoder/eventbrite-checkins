import * as got from 'got';
import * as debug from 'debug';

interface Attendee{
  "name": string, // Name of attendee
  "eb_id": string, // Eventbrite ID
}


/**
 * Get attendees that are checked-in for an Eventbrite event
 * @param {string} accessToken
 * @param {number} eventID
 * @param {string} flag
 * @return {[string]}
 */


export async function  getAttendeesForEvent(accessToken: string, eventID: string, flag?: string) : Promise <Attendee[]> {
  debug(`Flag is ${flag}`);
    // if(arguments.length < 2 || (typeof accessToken === 'undefined') || (eventID === 'undefined')) {
    //     throw new Error('INCORRECT_ARGUMENTS');
    //   }
  if (flag && !(['noshow', 'checkedin', 'all'].indexOf(flag.toLowerCase()) > -1)) {
      throw new Error('INCORRECT_FLAG');
  }

  try{
    console.log('URL is ' + `https://www.eventbriteapi.com/v3/events/${eventID}/attendees/`);    
    const response = await got.get(`https://www.eventbriteapi.com/v3/events/${eventID}/attendees/`, {json: true});
    
     return response.body;
      //   .body => {
      //   debug(`Message returned: ${body.attendees}`);
      //   return body.attendees;
      // })
      // .filter(attendee =>{
      //   if(!flag) {
      //     return attendee;
      //   }

      //   else if(flag.toLowerCase() === 'noshow') {
      //     return attendee.checked_in === false && attendee.cancelled === false && attendee.refunded === false;
      //   }
      //   return attendee.checked_in === true && attendee.cancelled === false && attendee.refunded === false;

      // })
      // .map(attendee => {
      //   debug(`The filtered attendee name is ${attendee.profile.name}`);
      //   return {
      //     'name': attendee.profile.name,
      //     'email': attendee.profile.email,
      //     'evenbriteID': attendee.id,
      //   };
      // })
  }
  catch(err){
      console.error('Error in EB API invocation ', err);
      //throw new Error(err);
      return [];
    };

}

export async function hasRegisteredForEvent(accessToken: string, eventID: string, attendeeID?:string): Promise<Attendee> {
  return {'eb_id': 'testID', 'name': 'testname'}
  // return IPromise
  //   .try(() =>{
  //     const options = {
  //       uri: `https://www.eventbriteapi.com/v3/events/${eventID}/attendees/${attendeeID}`,
  //       qs: {
  //         token: accessToken, // -> uri + '?access_token=xxxxx%20xxxxx'
  //       },
  //       json: true,
  //     };
  //     if(arguments.length < 3 || (typeof accessToken === 'undefined')
  //       || (eventID === 'undefined') || (attendeeID === 'undefined')) {
  //       throw new Error('INCORRECT_ARGUMENTS');
  //     }
  //     return rp(options);
  //   })
  //   .then(body =>{
  //     if(body.id === attendeeID) {return true;}
  //     return false;

  //   })
  //   .catch(error => {
  //     console.error(`Error thrown during invocation ${error}`);
  //     throw error;
  //   });
}

// module.exports = {
//   getAttendeesForEvent,
//   hasRegisteredForEvent,
// };
