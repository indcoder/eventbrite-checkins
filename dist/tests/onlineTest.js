"use strict";
const eventbriteCheckinsOnline = require('../src/index.js');
/*
eventbriteCheckinsOnline.getAttendeesForEvent('<EVENTBRITE TOKEN>', '<EVENT ID>')
  .then(data => {
    console.log(data);
  });

*/
eventbriteCheckinsOnline.hasRegisteredForEvent('<EVENTBRITE TOKEN>', '<EVENT ID>', 'ATTENDEE ID')
    .then(data => {
    console.log(data);
})
    .catch(error => {
    console.log(error);
});
//# sourceMappingURL=onlineTest.js.map