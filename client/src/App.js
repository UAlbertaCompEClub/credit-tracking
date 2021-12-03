
import Auth from './Auth'
import {Stack,Container,ThemeProvider,CssBaseline} from '@mui/material'
import {useState} from 'react'
import ClubDashboard from './ClubDashboard';
import UserProfile from './UserProfile';
import { mainTheme } from './theme';
import { RequestService } from './Services/RequestService'

//TO DO: INPUT VERIFICATION

function App() {

  const [page,setPage] = useState("UserProfile")
  const [ isLoggedIn,setisLoggedIn] = useState(false) 
  const [ExecInfo, setExecInfo] = useState({ccid:'abc1', token : 'token', club:"CompE",clubid:1})
  const [customerCcid,setCustomerCcid] = useState("cstm")
  const [isExec,setIsExec] = useState(true) //TODO Change to false for production
  // RequestService.testRequest()

  function openUser(ccid){
    setCustomerCcid(ccid)
    setPage("UserProfile")
    //Get user info from Backend and set it
  }

  function logout(){
    setPage("Auth")
    setExecInfo({})
    setisLoggedIn(false)
    setCustomerCcid(null)
    //TODO Delete token from local storage
  }

  function setExec(info){
    setIsExec(true)
    setExecInfo(info)
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
               setExecInfo = {setExec}/>}
            {page === "ClubDashboard" && <ClubDashboard theme = {mainTheme}
             exec = {ExecInfo}  
              openUser = {openUser} logout = {logout} />}
            {page === "UserProfile" && <UserProfile  
              exec = {ExecInfo}  isExec = {isExec} customerCcid = {customerCcid}
              setPage = {setPage}/>}
          </Stack>
        </Container>
      </Container>
    </ThemeProvider>

  );
}

export default App;
