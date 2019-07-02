export interface IEBEventAttendee {
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
  affiliate?: string
  guestlist_id?: null
  invited_by?: null
  status?: string
  ticket_class_name?: string
  delivery_method?: string
  event_id?: string
  order_id?: string
  ticket_class_id?: string
}

export interface IAnswer {
  answer?: string
  question?: string
  type?: string
  question_id?: string
}

export interface IBarcode {
  status?: string
  barcode?: string
  created?: Date
  changed?: Date
  checkin_type?: number
  is_printed?: boolean
}

export interface ICosts {
  base_price?: IBasePrice
  eventbrite_fee?: IBasePrice
  gross?: IBasePrice
  payment_fee?: IBasePrice
  tax?: IBasePrice
}

export interface IBasePrice {
  display?: string
  currency?: string
  value?: number
  major_value?: string
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
