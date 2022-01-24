import {Button, FormControl, Input, LinearProgress, InputLabel, FormHelperText,Stack, Typography, Alert} from '@mui/material/'
import {useState} from 'react'
import {RequestService} from './Services/RequestService'


function ResetPassword(props){

    //state vars
    const[resetMode, setResetMode] = useState(false);
    const[ccid,setCcid] = useState("");
    const[password,setPassword] = useState("");
    const[code,setCode] = useState("")
    const[alertType,setAlertType] = useState("error");
    const[alertText,setAlertText] = useState("");
    const[showAlert,setShowAlert] = useState(false);
    const[isLoading,setIsLoading] = useState(false)

    function toggleResetMode() {
        resetMode? setResetMode(false) : setResetMode(true)
    }

    function submitHandler(input){
        input.preventDefault()
        if(resetMode){
            resetPassword()
        }else{
            sendEmail()
        }
            
       
    }

    function clearFields(){
        //resets form
        setCcid("")
        setPassword("")
        setCode("")
    }
    async function resetPassword(){
        let response 
        setIsLoading(true)
        await RequestService.resetPassword(code,password).then((res)=>{
            response = res.body;
        })
        if(response == 1){
            setShowAlert(true);
            setAlertType("success")
            setAlertText("Password changed, redirecting to login...")
            props.autoLogout()
            setTimeout(()=>{
                props.setPage('Auth')
            },300)
        }else{
            setShowAlert(true);
            setAlertType("error")
            setAlertText("Verification code incorrect")
        }
        setIsLoading(false)
    }

    async function sendEmail(){
        //Attemps login
        let response 
        setIsLoading(true)
        await RequestService.emailResetPassword(ccid).then((res)=>{
            response = res.body;
        })
        if (response === 0) {
            setShowAlert(true);
            setAlertType("error")
            setAlertText("Password Reset Code already sent. Please wait 24hrs or check your inbox for the code")
        }
        else if(response === 1){
            setShowAlert(true);
            setAlertType("success")
            setAlertText("Check your ualberta email to continue...")
            props.autoLogout()
        }else{
            setShowAlert(true);
            setAlertType("error")
            setAlertText("Please enter a valid ccid")
        }
        setIsLoading(false)
    }

    function backHandler(){
        //go back from exec login
        props.setPage("Auth")
    }

    return (
    <form onSubmit = {submitHandler}>

        <Stack justifyContent = "center" spacing = {4}  height = "100vh">

            <Typography variant = "h1" >Reset Password</Typography>

            {/* show alert if showAlert is true */}
            {showAlert && <Alert severity = {alertType}> {alertText}!</Alert>} 

            {!resetMode &&<FormControl >
                {/* ccid */}
                <InputLabel htmlFor = "ccid">ccid</InputLabel>
                <Input autoComplete="off" disabled = {isLoading} id = "ccid" value = {ccid} onChange = {(e) => setCcid(e.target.value)} />
                <FormHelperText id = "ccidHelperText">Please enter your ccid</FormHelperText>
            </FormControl>}
            {resetMode && <FormControl >
                {/* code */}
                <InputLabel htmlFor = "code">Verification code</InputLabel>
                <Input autoComplete="off" type = "text" disabled = {isLoading} id = "code" onChange = {(e) => setCode(e.target.value)}/>
                <FormHelperText id = "codeHelperText">Please enter the code sent to your email</FormHelperText>
            </FormControl>}
            {resetMode &&<FormControl >
                {/* Password */}
                <InputLabel htmlFor = "password">Password</InputLabel>
                <Input autoComplete="off" type = "password" disabled = {isLoading} id = "password" onChange = {(e) => setPassword(e.target.value)}/>
                <FormHelperText id = "passwordHelperText">Please enter your new password</FormHelperText>
            </FormControl>}
            {isLoading && <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
              <LinearProgress color="inherit" />
            </Stack>}

            <Stack direction = 'row' justifyContent="space-evenly">
                <Button onClick={toggleResetMode} type="submit">I've got my Code</Button>
                <Button  disabled = {isLoading} type = "submit">Submit</Button>
                <Button onClick = {backHandler}>Back</Button>
            </Stack>
        </Stack>

    </form>
 
  );
    
}



export default ResetPassword