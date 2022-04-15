import Auth from './Auth'
import {Stack,Container,ThemeProvider,CssBaseline} from '@mui/material'
import {useState,useEffect} from 'react'
import ClubDashboard from './ClubDashboard';
import UserProfile from './UserProfile';
import { mainTheme } from './theme';
import ResetPassword from './ResetPassword'
import TermsDialog from './TermsDialog.js'
import './style.css'

function App() {

  const [page,setPage] = useState("ResetPassword")
  const [userInfo, setUserInfo] = useState({ccid:'Default', token : 'Default', club:"Default",clubid:0})
  const [customerCcid,setCustomerCcid] = useState("cstm")
  const [isExec,setIsExec] = useState(false) //TODO Change to false for production
  const [dialogVisible, setDialogVisible] = useState(false);
  // RequestService.testRequest()

  
 
  function checkLoggedIn(){
    // setInterval(()=>{
    //   console.log("Time remaining ="+ (storage.getItem('userExpiry')-Date.now()))
    // },1000)
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
      if(storage.getItem("isExec")==="true"){
        setIsExec(true)
        setTimeout(()=>{
          setPage("ClubDashboard")
        },100)
        
      }
      else{
        //if club id is null user is a customer
        setIsExec(false)
        console.log(storage.getItem('userCcid'))
        openUser(storage.getItem('userCcid'));
      }

    }
    else{
      storage.clear()
      setPage("Auth")
    }

  }

  useEffect(()=>{
    checkLoggedIn()
    console.log('backend at', process.env.REACT_APP_SERVER)
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
    setTimeout(()=>{
      setPage("UserProfile")
    },100)
    
    console.log(isExec)
    //Get user info from Backend and set it
  } 

  function logout(){
    setPage("Auth")
    setUserInfo({})
    setCustomerCcid(null)
    setIsExec(false)
    window.localStorage.clear()
  }


  function toggleDialog() {
    dialogVisible ? setDialogVisible(false) : setDialogVisible(true)
  }

  return (
    <ThemeProvider theme = {mainTheme}>
      <CssBaseline/>
      <Container >
        <Container  maxWidth = "sm" >
          <Stack >
            {/* If page = Auth show auth data */}
            {dialogVisible && <TermsDialog setDialogVisible={setDialogVisible}></TermsDialog> }
            {page === "Auth" && <Auth openUser ={openUser} setPage = {setPage}
               openUser = {openUser}
               setUserInfo = {setUserInfo}
               setIsExec = {setIsExec}
               autoLogout = {autoLogout}/>}
            {page === "ResetPassword" && <ResetPassword openUser ={openUser} setPage = {setPage}
               autoLogout = {autoLogout}/>}
            {page === "ClubDashboard" && <ClubDashboard theme = {mainTheme}
              user={userInfo}
              toggleDialog={toggleDialog}
              openUser = {openUser} logout = {logout} />}
            {page === "UserProfile" && <UserProfile  
             toggleDialog={toggleDialog}
              user = {userInfo}  isExec = {isExec} customerCcid = {customerCcid}
              setPage = {setPage}  logout = {logout} />}
          </Stack>
        </Container>
      </Container>
    </ThemeProvider>

  );
}

export default App;
