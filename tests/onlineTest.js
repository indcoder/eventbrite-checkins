const eventbriteCheckinsOnline = require('../dist/dist/src/index');

eventbriteCheckinsOnline.getAttendeesForEvent('<EVENTBRITE TOKEN>', 1234, 'flag')
  .then(data => {
    console.log(data);
  })
  .catch(err => {console.error(err)});

// eventbriteCheckinsOnline.hasRegisteredForEvent('<EVENTBRITE TOKEN>', '<EVENT ID>', 'ATTENDEE ID')
//   .then(data => {
//     console.log(data);
//   })
//   .catch(error => {
//     console.log(error);
//   });

