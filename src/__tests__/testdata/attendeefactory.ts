import * as factory from 'factory.ts'
import * as faker from 'faker'
import {
  IAttendee,
  IEBEventAttendees,
  IPagination,
  IProfile
} from '../../eventbrite-event-attendee-json'

export const profileMock = factory.Async.makeFactory<IProfile>({
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  // tslint:disable-next-line:object-literal-sort-keys
  cell_phone: faker.phone.phoneNumber()
})

const profileChild = profileMock.build()
export const attendeeMock = factory.Async.makeFactory<IAttendee>({
  cancelled: false,
  checked_in: false,
  profile: profileChild,
  refunded: false
})

export const ebEventAttendeesMock = factory.Async.makeFactory<
  IEBEventAttendees
>({
  attendees: attendeeMock.buildList(1)
})
