import {Button, FormControl, Input, LinearProgress, InputLabel, FormHelperText,Stack, Typography, Alert} from '@mui/material/'
import {useState} from 'react'
import {RequestService} from './Services/RequestService'
import "./style.css"

function Auth(props){

    //state vars
    const[ccid,setCcid] = useState("");
    const[password,setPassword] = useState("");
    const[alertType,setAlertType] = useState("error");
    const[alertText,setAlertText] = useState("You are not registered. Ask an executive to register!");
    const[showAlert,setShowAlert] = useState(false);
    const[isLoading,setIsLoading] = useState(false)

    function submitHandler(input){
        input.preventDefault()
        login()
    }

    function clearFields(){
        //resets form
        setCcid("")
        setPassword("")
    }

    async function login(){
        //Attemps login
        let response 
        setIsLoading(true)
        await RequestService.login(ccid,password).then((res)=>{
            response = res;
        })
        if(response){
            props.setUserInfo(response)
            setShowAlert(true);
            setAlertType("success")
            setAlertText("Welcome! Logging in...")
            props.autoLogout()
            setTimeout(()=>{
                if(window.localStorage.getItem("isExec") === "true"){
                    console.log("test")
                    props.setIsExec(true)
                    props.setPage('ClubDashboard')
                }else{
                    props.openUser(ccid)
                }
                
            },300)
        }else{
            setShowAlert(true);
            setAlertType("error")
            setAlertText("Your password or ccid is incorrect")
        }
        setIsLoading(false)
    }

    function switchToResetPassword()
    {
        props.setPage('ResetPassword')
    }

    return (
    <form onSubmit = {submitHandler}>

        <Stack justifyContent = "center" spacing = {4}  height = "100vh">

            <Typography variant = "h1" className ="whiteText">Login</Typography>

            {/* show alert if showAlert is true */}
            {showAlert && <Alert severity = {alertType}> {alertText}!</Alert>} 

            
            <FormControl >
                {/* ccid */}
                <InputLabel htmlFor = "ccid">ccid</InputLabel>
                <Input autoComplete="off" disabled = {isLoading} id = "ccid" value = {ccid} onChange = {(e) => setCcid(e.target.value)} />
                <FormHelperText id = "ccidHelperText"></FormHelperText>
                <Stack sx={{ pt: 2 }}>
                    <FormControl>
                    {/* Password */}
                    <InputLabel htmlFor = "password" >Password</InputLabel>
                    <Input autoComplete="off" type = "password" disabled = {isLoading} id = "password" onChange = {(e) => setPassword(e.target.value)}/>
                    <FormHelperText id = "passwordHelperText">Please enter your password</FormHelperText>
                    </FormControl>
                </Stack>
            </FormControl>
     

            {isLoading && <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
              <LinearProgress color="inherit" />
            </Stack>}

            <Stack direction = 'row' justifyContent="space-evenly"> 
                <Button className = "btn whiteBtn oval" disabled = {isLoading} type = "submit" >Submit</Button>
                <Button className = "btn cyanBtn oval" onClick={switchToResetPassword}>Forgot password</Button>
            </Stack>
        </Stack>

    </form>
 
  );
    
}



export default Auth