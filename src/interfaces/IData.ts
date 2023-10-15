export interface ReviewInterface {
    
    Rate: number;
    Detail: string;
    MemberID: number;
}

export interface ReportInterface {
    Detail: string;
    Picture: string;
    MemberID: number;
}
export interface UsersInterface {
    ID: number;
    UserName:  string;
    FirstName: string;
    LastName:  string;
    Email:     string;
    Password:  string;
    Tel :      string;
    Address:   string;
}
export interface ServiceInterface {

    ID?: number;
    // Member?:number;
    Has_pet?: string;
    
    Pet_detail?: string;
    
    PickDate?: string;
    
    PickTime?: string;

    AccomodationID?: number
    Accomodation?: AccommodationInterface

    Hour_of_workID?:number
    Hour_of_work?: Hour_of_workInterface
   
    Price?: Float32Array
    }

 export interface MemberInterface{
    ID?:number;
	Tel?: string;
	Address?:string;
 }


export interface AccommodationInterface{

    ID?: number;
    Name_type?: string
    Price?: Float32Array
}

export interface Hour_of_workInterface{
    ID?: number;
    Hour?: string
    Price?: Float32Array
}

export interface Service1Interface {
    ID?: number;

    M_firstname?: string

    M_lastname?: string
    
    
    M_Tel?: string;
    
    Accom_type?:     string;

    Accom_charge?:    string;

  HHour?:  string;

  Location ?:      string;
    
    Have_pet?:   string;

    Date?:    string;
    }