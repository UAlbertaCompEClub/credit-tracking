
import './App.css';
import Auth from './Auth'
import {Stack,Container} from '@mui/material'
import {useState} from 'react'
import ClubDashboard from './ClubDashboard';
import UserProfile from './UserProfile';

function App() {
  console.log(process.env.REACT_APP_TEST)

  const [page,setPage] = useState("UserProfile")
  const [token, setToken] = useState("")
  const [ isLoggedIn,setisLoggedIn] = useState(false) 
  const [CustomerCCid, setCustomerCcid] = useState("")
  const [user,setUser] = useState(null)

  function openUser(ccid){
    setPage("UserProfile")

    //Get user info from Backend and set it
    //setUser()
  }

  function logout(){
    setPage("Auth")
  }


  return (
    <Container maxWidth = "sm">
      <Stack>
        {/* If page = Auth show auth data */}
        {page == "Auth" && <Auth setPage = {setPage}/>}
        {page == "ClubDashboard" && <ClubDashboard openUser = {openUser} logout = {logout} />}
        {page == "UserProfile" && <UserProfile  user = {user} setPage = {setPage}/>}
      </Stack>
    </Container>
    
  );
}



export default App;
