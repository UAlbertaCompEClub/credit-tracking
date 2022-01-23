
import Auth from './Auth'
import {Stack,Container,ThemeProvider,CssBaseline} from '@mui/material'
import {useState,useEffect} from 'react'
import ClubDashboard from './ClubDashboard';
import UserProfile from './UserProfile';
import { mainTheme } from './theme';
import ResetPassword from './ResetPassword'


//TO DO: INPUT VERIFICATION

function App() {

  const [page,setPage] = useState("ResetPassword")
  const [userInfo, setUserInfo] = useState({ccid:'Default', token : 'Default', club:"Default",clubid:0})
  const [customerCcid,setCustomerCcid] = useState("cstm")
  const [isExec,setIsExec] = useState(false) //TODO Change to false for production

 
  function checkLoggedIn(){
    console.log("checking login...")
    const storage = window.localStorage 
    const expiry = storage.getItem('userExpiry')
    const clubId = storage.getItem('userClubId')
    if( expiry && parseInt(expiry) > Date.now()+30000){
      //If exec token will be valid for at least 30 more seconds
      //Show exec club dashboard
      console.log("User is logged in")
      autoLogout()
      setUserInfo({
        ccid:storage.getItem('userCcid'),
        club:storage.getItem('userClub'),
        clubid:storage.getItem('userClubid'),
        token:storage.getItem('token')
      })

      //is user an exec?
      if(clubId){
        setIsExec(true)
        setPage("ClubDashboard")
      }
      else{
        //if club id is null user is a customer
        setCustomerCcid(storage.getItem('userCcid'))
        setIsExec(false)
        setPage('UserProfile') 
      }
    }
    else{
      storage.clear()
      setPage("Auth")
    }

  }

  useEffect(()=>{
    checkLoggedIn()
  },[]) //[] means run one time only on startup


  async function autoLogout(){
    const timeRemaining = parseInt(window.localStorage.getItem('userExpiry'))-Date.now()
      
    if(timeRemaining < 2147483647){
      console.log("set Auto logout in "+timeRemaining+" milliseconds" )
      setTimeout(()=>{
        logout()
      },timeRemaining)
    }
    
  } 

  function openUser(ccid){
    setCustomerCcid(ccid)
    setPage("UserProfile")
    //Get user info from Backend and set it
  } 

  function logout(){
    setPage("Auth")
    setUserInfo({})
    setCustomerCcid(null)
    setIsExec(false)
    window.localStorage.clear()
  }

  function setExec(info){
    setIsExec(true)
    setUserInfo(info)
  }


  return (
    <ThemeProvider theme = {mainTheme}>
      <CssBaseline/>
      <Container >
        <Container  maxWidth = "sm" >
          <Stack >
            {/* If page = Auth show auth data */}
            {page === "Auth" && <Auth openUser ={openUser} setPage = {setPage}
               customerCcid = {setCustomerCcid}
               setUserInfo = {setUserInfo}
               autoLogout = {autoLogout}/>}
            {page === "ResetPassword" && <ResetPassword openUser ={openUser} setPage = {setPage}
               autoLogout = {autoLogout}/>}
            {page === "ClubDashboard" && <ClubDashboard theme = {mainTheme}
             user = {userInfo}  
              openUser = {openUser} logout = {logout} />}
            {page === "UserProfile" && <UserProfile  
              user = {userInfo}  isExec = {isExec} customerCcid = {customerCcid}
              setPage = {setPage}  logout = {logout} />}
          </Stack>
        </Container>
      </Container>
    </ThemeProvider>

  );
}

export default App;
