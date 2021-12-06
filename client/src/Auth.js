import {Button, FormControl, Input, LinearProgress, InputLabel, FormHelperText,Stack, Typography, Alert} from '@mui/material/'
import {useState} from 'react'
import {RequestService} from './Services/RequestService'


function Auth(props){

    //state vars
    const[isExec,setIsExec] = useState(false);
    const[ccid,setCcid] = useState("");
    const[password,setPassword] = useState("");
    const[alertType,setAlertType] = useState("error");
    const[alertText,setAlertText] = useState("You are not registered. Ask an executive to register!");
    const[showAlert,setShowAlert] = useState(false);
    const[isLoading,setIsLoading] = useState(false)

    function submitHandler(input){
        //checks if ccid is valid and prompts for PW if they are execs
        //if user is identified as an exec already attempt to login exec
        input.preventDefault()

        if(isExec){
            //we have verified they are an exec so try exec login
            Execlogin()
        }else{
            //check if they are execs and try logging in if they are customers
            checkUser()
        }
    }

    function clearFields(){
        //resets form
        setCcid("")
        setPassword("")
    }

    async function Execlogin(){
        //Attemps login
        let response 
        setIsLoading(true)
        await RequestService.execLogin(ccid,password).then((res)=>{
            response = res;
        })
        if(response){
            props.setExecInfo(response)
            setShowAlert(true);
            setAlertType("success")
            setAlertText("Welcome! Logging in...")
            props.autoLogout()
            setTimeout(()=>{
                props.setPage('ClubDashboard')
            },300)
        }else{
            setShowAlert(true);
            setAlertType("error")
            setAlertText("Your password is incorrect")
        }
        setIsLoading(false)
    }

    async function checkUser(){
        // Checks if a user (using ccid only) is an exec or not and whether they have any records if they are a customer
        //if they are valid customers, log in
        //server call returns 1 for EXEC, 0 for customer, -1 if they are not in the system.

        setIsLoading(true)

        //set this value from the server
        let status = await RequestService.ccidCheckReq(ccid)
        // let status = fetch(path + "checkUser"+"?ccid="+ccid)
   
        //open PW if you are an exec
        if( status === 1){ 
            //ccid is exec
            setIsExec(true);
            setShowAlert(true);
            setAlertType("success")
            setAlertText("Welcome Exec! Please enter your password.")
            
        }else if (status === 0){
            //ccid is customer
            setShowAlert(true);
            setAlertType("success")
            setAlertText("Welcome! Logging in...")
            
            //attempt customer login
             props.openUser(ccid)
        }else{
            //ccid is not registered
            setShowAlert(true);
            setAlertType("error")
            setAlertText("You are not registered or the ccid is incorrect. Ask an executive to register")
        }

        setIsLoading(false)
    }

    function backHandler(){
        //go back from exec login
        setShowAlert(false)
        clearFields()
        setIsExec(false)
    }

    return (
    <form onSubmit = {submitHandler}>

        <Stack justifyContent = "center" spacing = {4}  height = "100vh">

            <Typography variant = "h1" >Login</Typography>

            {/* show alert if showAlert is true */}
            {showAlert && <Alert severity = {alertType}> {alertText}!</Alert>} 

            <FormControl  disabled = {isExec}>
                {/* on ccid submit, if ccid is associated with an exec,
                prompt for password. */}

                {/* Exec and customer ccid */}
                <InputLabel htmlFor = "ccid">ccid</InputLabel>
                <Input disabled = {isLoading} id = "ccid" value = {ccid} onChange = {(e) => setCcid(e.target.value)} />
                <FormHelperText id = "ccidHelperText">For customers and Execs</FormHelperText>
            

            
            {isExec && //only show if ccid is exec
             <FormControl >
                {/* Exec Password */}
                <InputLabel htmlFor = "password">Password</InputLabel>
                <Input disabled = {isLoading} id = "password" onChange = {(e) => setPassword(e.target.value)}/>
                <FormHelperText id = "passwordHelperText">Please enter your Exec password</FormHelperText>
            </FormControl>
            }
            </FormControl>
            {isLoading && <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
              <LinearProgress color="inherit" />
            </Stack>}

            <Stack direction = 'row' justifyContent="space-evenly">
                <Button  disabled = {isLoading} type = "submit">Submit</Button>
                {isExec && <Button onClick = {backHandler}>Back</Button>}
            </Stack>
        </Stack>

    </form>
 
  );
    
}



export default Auth