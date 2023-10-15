import React from "react";
import "./App.css"
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import { HomePage }       from "./screens/HomePage";
import { LoginPage }      from "./screens/LoginPage";
import { SignUpPage }     from "./screens/SignUpPage";
import { SignUpPage2 }    from "./screens/SignUpPage2";
import { HomePage2 }      from "./screens/HomePage2";
import { BookingPage }    from "./screens/BookingPage";
import { BookingPage2 }   from "./screens/BookingPage2";
import { BookingPage3 }   from "./screens/BookingPage3";
import { BookingPageEnd } from "./screens/BookingPageEnd";
import { HistoryPage }    from "./screens/HistoryPage";
import { ReviewPage }     from "./screens/ReviewPage";
import { ReportPage }     from "./screens/ReportPage";
import { ProfilePage }    from "./screens/ProfilePage";
import { ProfilePage2 }   from "./screens/ProfilePage2";


//HELLO World โปรเจคโง่ๆ

//เมื่อไรจะเสร็จจจจจ

const App: React.FC = () => {
  return (
    <Router>
      <Routes> 
        <Route path="/"               element={<HomePage/>}/>
        <Route path="/LoginPage"      element={<LoginPage />} />
        <Route path="/SignUpPage"     element={<SignUpPage />} />
        <Route path="/SignUpPage2"    element={<SignUpPage2 />} />
        <Route path="/HomePage2"      element={<HomePage2/>}/>
        <Route path="/BookingPage"    element={<BookingPage/>}/>
        <Route path="/BookingPage2"   element={<BookingPage2/>}/>
        <Route path="/BookingPage3"   element={<BookingPage3/>}/>
        <Route path="/BookingPageEnd" element={<BookingPageEnd/>}/>
        <Route path="/HistoryPage"    element={<HistoryPage/>}/>
        <Route path="/ReviewPage"     element={<ReviewPage/>}/>
        <Route path="/ReportPage"     element={<ReportPage/>}/>
        <Route path="/ProfilePage"   element={<ProfilePage/>}/>
        <Route path="/ProfilePage2"   element={<ProfilePage2/>}/>
      </Routes>
    </Router>
    
   
  );
};

export default App;
