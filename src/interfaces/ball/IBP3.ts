
export interface PaymentInterface{
    ID?:    number;
    Receipt?: string;
    Date?: Date;
    ServiceID?: number;
    MemberID?: number;
    MemberFirstName?: string;
    MemberLastName?: string;
}

export interface BookingPage3Interface{
	ServiceID?: number;
    ServicePrice?: number;
	MemberID?: number;
    MemberFirstName?: string;
    MemberLastName?: string;
}

export interface RealMemberInterface {
    ID?: number;
    Username?: string;
    Password?: string;
    FirstName?: string;
    LastName?: string;
    Email?: string;
    Tel?:   string;
    Address?: string;
}

export interface RealAccomodation{
    ID?:    number;
    NameType?:  string;
    Price?: number;
}

export interface RealHourOfWorkInterface{
    ID?:    number;
    Hour?:  string;
    Price?: number
}

export interface RealMaidInterface{
    ID?:    number;
    FirstName?: string;
    LastName?:  string;
    Tel?:   string;
    Dob?:   string;
    Exp?:   string;
    Address?:   string;
    status?:    string;
}

export interface RealServiceInterface{
    ID?: number;
    Has_pet?: string;
    pet_detail?: string;
    PickDate?: string;
    PickTime?: string;
    price?: Float32Array;

    MemberID?:  number;
    Member?:    RealMemberInterface

    AccomodationID?: number;
    Accomodation?: RealAccomodation

    HourOfWorkID?:  number;
    HourOfWork?: RealHourOfWorkInterface;

    MaidID?:    number;
    Maid?:  RealMaidInterface;
}