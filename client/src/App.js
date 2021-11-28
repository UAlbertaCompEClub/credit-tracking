
import Auth from './Auth'
import {Stack,Container,ThemeProvider,CssBaseline} from '@mui/material'
import {useState} from 'react'
import ClubDashboard from './ClubDashboard';
import UserProfile from './UserProfile';
import { mainTheme } from './theme';
import { RequestService } from './Services/RequestService'
import { StyledEngineProvider } from '@mui/material/styles';

//TO DO: INPUT VERIFICATION

function App() {
  console.log(process.env.REACT_APP_TEST)

  const [page,setPage] = useState("ClubDashboard")
  const [ isLoggedIn,setisLoggedIn] = useState(false) 
  const [ExecInfo, setExecInfo] = useState({ccid:'abc1', token : 'token', club:"Club Name"})
  const [customerCcid,setCustomerCcid] = useState(null)

  RequestService.testRequest()

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


  return (

    <ThemeProvider theme = {mainTheme}>
      <CssBaseline/>

      <StyledEngineProvider injectFirst>
      <Container >
        <Container  maxWidth = "sm" >
          <Stack >
            {/* If page = Auth show auth data */}
            {page == "Auth" && <Auth openUser ={openUser} setPage = {setPage}
               customerCcid = {setCustomerCcid}
               setExecInfo = {setExecInfo}/>}
            {page == "ClubDashboard" && <ClubDashboard theme = {mainTheme}
              club = {ExecInfo.club} token = {ExecInfo.token} exec = {ExecInfo.ccid} 
              openUser = {openUser} logout = {logout} />}
            {page == "UserProfile" && <UserProfile  token = {ExecInfo.token}
              club = {ExecInfo.club} user = {customerCcid}
              setPage = {setPage}/>}
          </Stack>
        </Container>
      </Container>
      </StyledEngineProvider>
    </ThemeProvider>

  );
}

export default App;
