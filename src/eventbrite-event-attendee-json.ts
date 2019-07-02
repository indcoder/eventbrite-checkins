export interface IEBEventAttendees {
  pagination?: IPagination
  attendees: IAttendee[]
}

export interface IAttendee {
  team?: null
  costs?: ICosts
  resource_uri?: string
  id?: string
  changed?: Date
  created?: Date
  quantity?: number
  variant_id?: null
  profile?: IProfile
  barcodes?: IBarcode[]
  answers?: IAnswer[]
  checked_in?: boolean
  cancelled?: boolean
  refunded?: boolean
  affiliate?: null | string
  guestlist_id?: null
  invited_by?: null
  status?: IAttendeeStatus
  ticket_class_name?: ITicketClassName
  delivery_method?: DeliveryMethod
  event_id?: string
  order_id?: string
  ticket_class_id?: string
}

export interface IAnswer {
  answer?: string
  question?: string
  type?: IType
  question_id?: string
}

export enum IType {
  MultipleChoice = 'multiple_choice',
  Text = 'text'
}

export interface IBarcode {
  status?: IBarcodeStatus
  barcode?: string
  created?: Date
  changed?: Date
  checkin_type?: number
  checkin_method?: ICheckinMethod
  is_printed?: boolean
}

export enum ICheckinMethod {
  Search = 'search'
}

export enum IBarcodeStatus {
  Deleted = 'deleted',
  Refunded = 'refunded',
  Unused = 'unused',
  Used = 'used'
}

export interface ICosts {
  base_price?: IBasePrice
  eventbrite_fee?: IBasePrice
  gross?: IBasePrice
  payment_fee?: IBasePrice
  tax?: IBasePrice
}

export interface IBasePrice {
  display?: Display
  currency?: Currency
  value?: number
  major_value?: string
}

export enum Currency {
  Usd = 'USD'
}

export enum Display {
  The000 = '$0.00'
}

export enum DeliveryMethod {
  Electronic = 'electronic'
}

export interface IProfile {
  first_name?: string
  last_name?: string
  addresses?: IAddresses
  cell_phone?: string
  email?: string
  name?: string
}

// tslint:disable-next-line:no-empty-interface
export interface IAddresses {}

export enum IAttendeeStatus {
  Attending = 'Attending',
  CheckedIn = 'Checked In',
  Deleted = 'Deleted',
  NotAttending = 'Not Attending'
}

export enum ITicketClassName {
  AzureIoTWorkshop = 'Azure IoT workshop'
}

export interface IPagination {
  object_count?: number
  page_number?: number
  page_size?: number
  page_count?: number
  has_more_items?: boolean
}
