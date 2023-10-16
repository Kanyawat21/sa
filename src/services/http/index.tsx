import { ReviewInterface } from "../../interfaces/IData";
import {
  ReportInterface,
  UsersInterface,
  ServiceInterface,
} from "../../interfaces/IData";

const apiUrl = "http://localhost:8080";

async function ListReview() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  let res = await fetch(`${apiUrl}/review`, requestOptions)
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

async function CreateReview(data: ReviewInterface) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  let res = await fetch(`${apiUrl}/review`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });
  return res;
}

async function CreateReport(data: ReportInterface) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  let res = await fetch(`${apiUrl}/report`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });
  return res;
}
async function CreateUser(data: UsersInterface) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  let res = await fetch(`${apiUrl}/Member`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });
  return res;
}
async function ListUsers(data: UsersInterface) {
  console.log("Data sent to ListUsers:", data.UserName);
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  let res = await fetch(
    `${apiUrl}/Member/${data.UserName}/${data.Password}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });
  console.log(res);
  return res;
}

<<<<<<< HEAD
async function GetMemberById(id: Number) {
  const requestOptions = {
    method: "GET",
  };
  let res = await fetch(`${apiUrl}/members/${id}`, requestOptions)
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

async function GetIdByPassword(password: string) {
  const requestOptions = {
    method: "GET",
  };
  let res = await fetch(`${apiUrl}/members/${password}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });
  return res;
=======
async function GetMemberShowId(id: Number | undefined) {
    const requestOptions = {
      method: "GET"
    };
  
    let res = await fetch(`${apiUrl}/member/${id}`, requestOptions)
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

async function GetIdByPassword(password: string){
    const requestOptions = {
        method: "GET"
      };
      let res = await fetch(`${apiUrl}/members/${password}`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
          if (res.data) {
            return res.data;
          } else {
            return false;
          }
        });
      return res;
>>>>>>> 62ac8b33f359859ba04279d29d762d0f4f5927af
}
//-------------------praw-------------------------------
async function CreateService(data: ServiceInterface) {
  const requestOptions = {
    method: "POST",

    headers: { "Content-Type": "application/json" },

    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/services`, requestOptions)
    .then((response) => response.json())

    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
}

async function GetAccommodations() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/accomodations`, requestOptions)
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

async function GetHour_of_works() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/hour_of_works`, requestOptions)
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

async function GetService(data: string | null) {
  const requestOptions = {
<<<<<<< HEAD
    method: "GET",

    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/Members/${data}`, requestOptions)
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
=======
  
  method: "GET",
  
  headers: {
  
  "Content-Type": "application/json",
  
  },
  
  };
  
  
  let res = await fetch(`${apiUrl}/service/${data}`, requestOptions)
  
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
>>>>>>> 62ac8b33f359859ba04279d29d762d0f4f5927af

// ==============================export=====================
export {
<<<<<<< HEAD
  ListReview,
  CreateReview,
  CreateReport,
  CreateUser,
  ListUsers,
  GetMemberById,
  GetIdByPassword,
  CreateService,
  GetHour_of_works,
  GetAccommodations,
  GetService,
};
=======
    ListReview,
    CreateReview,
    CreateReport,
    CreateUser,
    ListUsers,
    GetMemberById,
    GetIdByPassword,
    CreateService,
    GetHour_of_works,
    GetAccommodations,
    GetService,
    GetMemberShowId,
};
>>>>>>> 62ac8b33f359859ba04279d29d762d0f4f5927af
