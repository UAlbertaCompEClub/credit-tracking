import {Link, Button, FormControl,Checkbox,Alert, Input, InputLabel,Stack,Typography,FormControlLabel,LinearProgress} from '@mui/material'
import {useState} from 'react'
import {RequestService} from "./Services/RequestService"
import {CyanButton,WhiteButton} from './style'

export function AddUser(props) {
    const[ccid,setCcid] = useState("")
    const[name,setName] = useState("")
    const[password,setPassword] = useState("")
    const[isExec,setIsExec] = useState(false);
    const[emailInvoices,setEmailInvoices] = useState(false);
    const[alertType,setAlertType] = useState("error");
    const[alertText,setAlertText] = useState("You are not registered. Ask an executive to register!");
    const[showAlert,setShowAlert] = useState(false);
    const[isLoading,setIsLoading] = useState(false);
    const[acceptFOIP,setAcceptFOIP] = useState(false);

    async function submitHandler(input){
        input.preventDefault()
        var forbiddenChars = /[$^&'()\=\\{}:"\\|<>\/?]+/;
        if (forbiddenChars.test(ccid) || forbiddenChars.test(name) || forbiddenChars.test(password)) {
            setShowAlert(true);
            setAlertType("error")
            setAlertText("You have entered illegal characters")
            setIsLoading(false)
            return
        }

        if(ccid === "" || name === ""){
            setShowAlert(true);
            setAlertType("error")
            setAlertText("Please fill all fields")
            setIsLoading(false)
            return
        }
        if (!acceptFOIP) {
            setShowAlert(true);
            setAlertType("error")
            setAlertText("You have not accepted the terms of service")
            setIsLoading(false)
            return
        }
        
        let status
        if (isExec) {
            status = await RequestService.addExec(ccid, name, password, props.user.clubid, props.user.token)
        }
        else {
            status = await RequestService.addUser(ccid, name, password, props.user.token)
        }

        if (parseInt(status) >= 0) {
            //req succeded
            setShowAlert(true);
            setAlertType("success")
            setAlertText("User Added")
            await RequestService.newTransaction(ccid, 0, props.user.clubid, props.user.token, props.user.ccid)
            props.refresh()
        } else {
            //req failed
            setShowAlert(true);
            setAlertType("error")
            setAlertText("User could not be added.")
        }
        setIsLoading(false)
    }

    function toggleIsExec(){
        setIsExec((prevState)=>{
            return !prevState
        })
    }

    function toggleInvoices(){
        setEmailInvoices((prevState)=>{
            return !prevState
        })
    }

    return (
        <form onSubmit = {submitHandler}>
        <Stack justifyContent={"center"}>
            <Typography variant = "h3" >Add User</Typography>

            <Stack direction="row">
                <FormControlLabel onClick = {toggleIsExec} control={<Checkbox  onClick = {toggleIsExec}/>} label="User is an Executive" />
                <FormControlLabel onClick = {toggleInvoices} control={< Checkbox onClick = {toggleInvoices}/>} label="Enable email invoices" />
            </Stack>
            

             {/* show alert if showAlert is true */}
             {showAlert && <Alert severity = {alertType}> {alertText}!</Alert>} 
            <Stack spacing = {3} sx={{pt:2}}>
                <FormControl>
                {/*ccid */}
                <InputLabel htmlFor = "ccid">ccid</InputLabel>
                    <Input autoComplete="off" id = "ccid" value = {ccid} onChange = {(e) => setCcid(e.target.value)} />
                </FormControl>
                <FormControl>
                    {/* name */}
                    <InputLabel htmlFor = "name">Name</InputLabel>
                    <Input autoComplete="off" disabled = {isLoading} id = "name" onChange = {(e) => setName(e.target.value)}/>
                </FormControl>
                <FormControl>
                    {/* password */}
                    <InputLabel htmlFor = "password">Password</InputLabel>
                    <Input autoComplete="off" disabled = {isLoading} id = "password" onChange = {(e) => setPassword(e.target.value)}/>
                </FormControl>
            </Stack>
            <Stack sx={{pt:3}}>
                <FormControl>
                    <WhiteButton style={{width:"autofit"}} onClick={props.toggleDialog}  sx = {{m:"2vh 0 0 2vw", p:'2px'}}
                        variant="p">
                            View the Terms of Service Here</WhiteButton>
                    <FormControlLabel id = 'foip' control={<Checkbox/>} onChange = {(e) => setAcceptFOIP(e.target.checked)}
                    label="I, the user, accept the terms of service" />        
                </FormControl>
            </Stack>
            {isLoading && <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
              <LinearProgress color="inherit" />
            </Stack>}

            <Stack direction = 'row' justifyContent="space-evenly" sx={{p:1}}>
                <CyanButton  disabled = {isLoading} type = "submit">Add</CyanButton>
                <CyanButton  disabled = {isLoading} onClick = {(e)=>{props.setShowAddUser(false)}}>Close</CyanButton>
            </Stack>

        </Stack>
        </form>
    )
}

export default AddUser