
import './App.css';
import Auth from './Auth'
import {Stack,Container} from '@mui/material'
import {useState} from 'react'
import ClubDashboard from './ClubDashboard';
import UserProfile from './UserProfile';

function App() {
  
  const [page,setPage] = useState("ClubDashboard")
  const [token, setToken] = useState("")
  const [ isLoggedIn,setisLoggedIn] = useState(false) 
  const [CustomerCCid, setCustomerCcid] = useState("")

  return (
    <Container maxWidth = "sm">
      <Stack>
        {/* If page = Auth show auth data */}
        {page == "Auth" && <Auth setPage = {setPage}/>}
        {page == "ClubDashboard" && <ClubDashboard setPage = {setPage}/>}
        {page == "UserProfile" && <UserProfile setPage = {setPage}/>}
      </Stack>
    </Container>
    
  );
}



export default App;
