import Auth from './Auth'
import {Stack,Container,ThemeProvider,CssBaseline} from '@mui/material'
import {useState,useEffect} from 'react'
import ClubDashboard from './ClubDashboard';
import UserProfile from './UserProfile';
import { mainTheme } from './theme';
import TermsDialog from './TermsDialog.js'


//TO DO: INPUT VERIFICATION

function App() {

  const [page,setPage] = useState("Auth")
  const [ExecInfo, setExecInfo] = useState({ccid:'Default', token : 'Default', club:"Default",clubid:0})
  const [customerCcid,setCustomerCcid] = useState("cstm")
  const [isExec,setIsExec] = useState(false) //TODO Change to false for production
  const [dialogVisible, setDialogVisible] = useState(false);
  // RequestService.testRequest()

 
  function checkLoggedIn(){
    console.log("checking login...")
    const storage = window.localStorage 
    const expiry = storage.getItem('execExpiry')
    const customerCcid = storage.getItem('customerCcid')
    if( expiry && parseInt(expiry) > Date.now()+30000){
      //If exec token will be valid for at least 30 more seconds
      //Show exec club dashboard
      console.log("exec is logged in")
      autoLogout()
      setExecInfo({
        ccid:storage.getItem('execCcid'),
        club:storage.getItem('execClub'),
        clubid:storage.getItem('execClubid'),
        token:storage.getItem('execToken')
      })
      setIsExec(true)
      setPage("ClubDashboard")
    }else if(customerCcid){
      //if customerCcid exists show their profile
      console.log("customer is logged in")
      setCustomerCcid(customerCcid)
      setPage('UserProfile')
      setIsExec(false)
    }
    else{
      storage.clear()
      setPage("Auth")
    }

  }

  useEffect(()=>{
    checkLoggedIn()
  },[])


  async function autoLogout(){
    const timeRemaining = parseInt(window.localStorage.getItem('execExpiry'))-Date.now()
      
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
    setExecInfo({})
    setCustomerCcid(null)
    setIsExec(false)
    window.localStorage.clear()
  }

  function setExec(info){
    setIsExec(true)
    setExecInfo(info)
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
              customerCcid = {setCustomerCcid}
              setExecInfo = {setExec}
              autoLogout = {autoLogout}
              toggleDialog = {toggleDialog}
               />}
            {page === "ClubDashboard" && <ClubDashboard theme = {mainTheme}
              exec={ExecInfo} 
              openUser={openUser} logout={logout} toggleDialog={toggleDialog}/>}
            {page === "UserProfile" && <UserProfile  
              exec = {ExecInfo}  isExec = {isExec} customerCcid = {customerCcid}
              setPage = {setPage}  logout = {logout}
              toggleDialog={toggleDialog}/>}
          </Stack>
        </Container>
      </Container>
    </ThemeProvider>

  );
}

export default App;
