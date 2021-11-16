
import './App.css';
import Auth from './Auth'
import {Stack,Container,ThemeProvider,CssBaseline} from '@mui/material'
import {useState} from 'react'
import ClubDashboard from './ClubDashboard';
import UserProfile from './UserProfile';
import { mainTheme } from './theme';

let path = process.env.REACT_APP_SERVER

function App() {
  console.log(process.env.REACT_APP_TEST)

  const [page,setPage] = useState("ClubDashboard")
  const [token, setToken] = useState("")
  const [ isLoggedIn,setisLoggedIn] = useState(false) 
  const [CustomerCCid, setCustomerCcid] = useState("")
  const [user,setUser] = useState(null)

  fetch(path + "/",{method:"POST",body:{
    name: 'test-name',
    attribute1: 'test-att'
 }})
  .then((res)=>{
    console.log(res)
  }).catch(()=>{
    console.log("request failed")
  })

  function openUser(ccid){
    setPage("UserProfile")

    //Get user info from Backend and set it
    //setUser()
  }

  function logout(){
    setPage("Auth")
  }


  return (
    <ThemeProvider theme = {mainTheme}>
      <CssBaseline/>
      <Container >
        <Container  maxWidth = "sm" >
          <Stack >
            {/* If page = Auth show auth data */}
            {page == "Auth" && <Auth setPage = {setPage}/>}
            {page == "ClubDashboard" && <ClubDashboard theme = {mainTheme} openUser = {openUser} logout = {logout} />}
            {page == "UserProfile" && <UserProfile  user = {user} setPage = {setPage}/>}
          </Stack>
        </Container>
      </Container>
    </ThemeProvider>
    
    
  
    
    
  );
}



export default App;
