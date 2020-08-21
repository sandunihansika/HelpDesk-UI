export enum TextBoxTypes {
  Text = "text",
  Password = "password",
  Email = "email",
}

export enum StatusCodes {
  Success = 200,
  Unauthorized = 401
}

export enum CustomerType {
  Individual = 1,
  Corporate = 2,
}

export enum UserType {
  AdminUser = 1,
  HelpDeskUser = 5
}

export enum InqueryType {
  Details = 1,
  Quotation = 2,
  Quotation_with_details = 3
}

export enum Alignment {
  Left = 1,
  Center = 2,
  Right = 3
}

export enum ColumnType {
  Text = 1,
  Number = 2,
  Date = 3,
  Custom = 5
}

export enum CompanyType {
  Dimo = 2,
  Ingenii = 3,
}

export enum Status {
  NeedConsent = 1,
  SendQuotation = 2,
  RemindCustomer = 3,
  ApprovedCustomer = 4,
  RejectedCustomer = 5,
  ReSendQuotation = 6,
  ReNeedConsent = 7,
  Pending = 8,
  Completed = 9,
}

export enum ComplaintType {
  SimProblem = 1,
  DevicePromblem = 2,
}

export enum MonthType {
  January = 1,
  February = 2,
  March = 3,
  April = 4,
  May = 5,
  June = 6,
  July = 7,
  August = 8,
  September = 9,
  October = 10,
  November = 11,
  December = 12,
}
