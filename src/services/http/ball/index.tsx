import { PaymentInterface, RealServiceInterface } from "../../../interfaces/ball/IBP3";

const apiUrl = "http://localhost:8080";

async function CreatePayment(data: PaymentInterface) {
    const requestOpions = {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(data),
    };
    let res = await fetch(`${apiUrl}/payments`, requestOpions)
    .then((response) => response.json())
    .then((res) => {
        if (res.data){
            return { status: true, message: res.data};
        }
        else{
            return { status: false, message: res.error};
        }
    });
    return res;    
}

async function GetBPP3Info(id: Number | undefined) {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/payments/${id}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return res.data;
        } else {
          return false;
        }
      });
  
    return res;
}

async function DeletePaymentByID(id: Number | undefined) {
  const requestOptions = {
    method:"DELETE",
   
  };

  let res = await fetch(`${apiUrl}/payments/delete/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetServiceID() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/payments/getSID`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

export{
    CreatePayment,
    GetBPP3Info,
    DeletePaymentByID,
    GetServiceID
};