import {Routes,Route} from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Homepage  from './pages/Homepage';
import {checkAuth} from './authSlice'
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';

function App(){

  //code likhna isAuthenticated

   const {isAuthenticated}=useSelector((state)=>state.auth);
   const dispatch=useDispatch();

   useEffect(()=>{
     dispatch(checkAuth());
   },[isAuthenticated]);

   return (
   <>
    <Routes>
      <Route path="/" element={<Homepage></Homepage>}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/signup" element={<Signup></Signup>}></Route>
    </Routes>
   </>
   )
}

export default App;