import {Routes,Route,Navigate} from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Homepage  from './pages/Homepage';
import {checkAuth} from './authSlice'
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';
// import {AdminPanel} from './pages/AdminPanel';
function App(){

  //code likhna isAuthenticated

   const {isAuthenticated,user,loading}=useSelector((state)=>state.auth);
   const dispatch=useDispatch();

   useEffect(()=>{
     dispatch(checkAuth());
   },[dispatch]);

   console.log(user?.role);
   console.log(isAuthenticated);
   
   if(loading){
      return <div className='min-h-screen flex items-center justify-center'>
        <span className='loading loading-spinner loading-lg'></span>
      </div>;
   }

   return (
   <>
    <Routes>
      <Route path="/" element={isAuthenticated ?<Homepage></Homepage>:<Navigate to="/signup" />}></Route>
      <Route path="/login" element=  {isAuthenticated ?<Navigate to="/" />:<Login></Login>}></Route>
      <Route path="/signup" element={isAuthenticated ?<Navigate to="/" />:<Signup></Signup>}></Route>
      {/* <Route path="/admin" element ={<AdminPanel/>}></Route> */}
      <Route
         path='/admin'
         element={
            isAuthenticated && user?.role==='admin'?
            <AdminPanel/>:
            <Navigate to="/"/>
         }
         />
    </Routes>
   </>
   )
}

export default App;