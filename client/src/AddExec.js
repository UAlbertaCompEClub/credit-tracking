import {Button, FormControl,Alert, Input, InputLabel,Stack,Typography} from '@mui/material'
import {useState} from 'react'
import {RequestService} from "./Services/RequestService"

export function AddExec(props) {
    const[ccid,setCcid] = useState("")
    const[name,setName] = useState("")
    const[password,setPassword] = useState("")
    const[alertType,setAlertType] = useState("error");
    const[alertText,setAlertText] = useState("You are not registered. Ask an executive to register!");
    const[showAlert,setShowAlert] = useState(false);

    function submitHandler(input){
        input.preventDefault()

        if(ccid === "" || name === ""){
            setShowAlert(true);
            setAlertType("error")
            setAlertText("Please fill all fields")
        }else if(RequestService.ccidCheckReq(ccid) !== -1 ){
            //ccid is registered already
            setShowAlert(true);
            setAlertType("error")
            setAlertText("Exec already exists")
        }else{
            const status = RequestService.addExec(ccid,name)
            if(status === 0){
                //req succeded
                setShowAlert(true);
                setAlertType("success")
                setAlertText("Exec Added")
                props.refresh()
            }else{
                //req failed
                setShowAlert(true);
                setAlertType("error")
                setAlertText("Exec could not be added.")
            }
        }

        
    }

    return (
        <form onSubmit = {submitHandler}>
        <Stack>
            <Typography variant = "p" >Add Exec</Typography>
             {/* show alert if showAlert is true */}
             {showAlert && <Alert severity = {alertType}> {alertText}!</Alert>} 
            <FormControl>
              {/*ccid */}
              <InputLabel htmlFor = "ccid">ccid</InputLabel>
                <Input id = "ccid" value = {ccid} onChange = {(e) => setCcid(e.target.value)} />
            </FormControl>
            <FormControl>
                {/* name */}
                <InputLabel htmlFor = "name">Name</InputLabel>
                <Input id = "name" onChange = {(e) => setName(e.target.value)}/>
            </FormControl>
            <FormControl>
                {/* password */}
                <InputLabel htmlFor = "password">Password</InputLabel>
                <Input id = "password" onChange = {(e) => setPassword(e.target.value)}/>
            </FormControl>

            <Stack direction = 'row' justifyContent="space-evenly">
                <Button type = "submit">Add</Button>
                <Button onClick = {(e)=>{props.setShowAddExec(false)}}>Close</Button>
            </Stack>
            
        </Stack>
        </form>
    )
}