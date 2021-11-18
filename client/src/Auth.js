import {Button, FormControl, Input, InputLabel, FormHelperText,Stack, Typography, Alert} from '@mui/material/'
import {useState} from 'react'
import {RequestService} from './Services/RequestService'

let path = process.env.REACT_APP_SERVER


function Auth(props){

    //state vars
    const[isExec,setIsExec] = useState(false);
    const[ccid,setCcid] = useState("");
    const[password,setPassword] = useState("");
    const[alertType,setAlertType] = useState("error");
    const[alertText,setAlertText] = useState("You are not registered. Ask an executive to register!");
    const[showAlert,setShowAlert] = useState(false);

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

    function Execlogin(){
        //Attemps login
        const response = RequestService.execLogin(ccid,password)
        if(response){
            props.setExecInfo(response)
            setShowAlert(true);
            setAlertType("success")
            setAlertText("Welcome! Logging in...")

            //TODO save token to local storage

            props.setPage('ClubDashboard')
        }else{
            setShowAlert(true);
            setAlertType("error")
            setAlertText("Your password is incorrect")
        }
    }

    function checkUser(){
        // Checks if a user (using ccid only) is an exec or not and whether they have any records if they are a customer
        //if they are valid customers, log in
        //server call returns 1 for EXEC, 0 for customer, -1 if they are not in the system.

        //set this value from the server
        let status = RequestService.ccidCheckReq(ccid)
        // let status = fetch(path + "checkUser"+"?ccid="+ccid)

        //open PW if you are an exec
        if( status == 1){ 
            //ccid is exec
            setIsExec(true);
            setShowAlert(true);
            setAlertType("success")
            setAlertText("Welcome Exec! Please enter your password.")
            
        }else if (status == 0){
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
                <Input id = "ccid" value = {ccid} onChange = {(e) => setCcid(e.target.value)} />
                <FormHelperText id = "ccidHelperText">For customers and Execs</FormHelperText>
            </FormControl>
            
            {isExec && //only show if ccid is exec
             <FormControl >
                {/* Exec Password */}
                <InputLabel htmlFor = "password">Password</InputLabel>
                <Input id = "password" onChange = {(e) => setPassword(e.target.value)}/>
                <FormHelperText id = "passwordHelperText">Please enter your Exec password</FormHelperText>
            </FormControl>
            }

            <Stack direction = 'row' justifyContent="space-evenly">
                <Button type = "submit">Submit</Button>
                {isExec && <Button onClick = {backHandler}>Back</Button>}
            </Stack>
        </Stack>

    </form>
 
  );
    
}



export default Auth