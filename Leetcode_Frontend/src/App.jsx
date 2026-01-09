import {Routes,Route,Navigate} from 'react-router-dom';
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
   },[dispatch]);

   return (
   <>
    <Routes>
      <Route path="/" element={isAuthenticated ?<Homepage></Homepage>:<Navigate to="/signup" />}></Route>
      <Route path="/login" element=  {isAuthenticated ?<Navigate to="/" />:<Login></Login>}></Route>
      <Route path="/signup" element={isAuthenticated ?<Navigate to="/" />:<Signup></Signup>}></Route>
    </Routes>
   </>
   )
}

export default App;