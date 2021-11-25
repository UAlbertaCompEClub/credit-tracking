import {Button, FormControl,Alert, Input, InputLabel, Container, FormHelperText,Stack, Table, TableBody, TableCell,TableContainer,TableHead,TableRow,Paper,Typography} from '@mui/material'
import {useState} from 'react'
import {RequestService} from "./Services/RequestService"

export function AddUser(props) {
    const[ccid,setCcid] = useState("")
    const[name,setName] = useState("")
    const[alertType,setAlertType] = useState("error");
    const[alertText,setAlertText] = useState("You are not registered. Ask an executive to register!");
    const[showAlert,setShowAlert] = useState(false);

    function submitHandler(input){
        input.preventDefault()

        if(ccid == "" || name == ""){
            setShowAlert(true);
            setAlertType("error")
            setAlertText("Please fill all fields")
        }else if(RequestService.ccidCheckReq(ccid) != -1 ){
            //ccid is registered already
            setShowAlert(true);
            setAlertType("error")
            setAlertText("User already exists")
        }else{
            const status = RequestService.addUser(ccid,name)
            if(status == 0){
                //req succeded
                setShowAlert(true);
                setAlertType("success")
                setAlertText("User Added")
                props.refresh()
            }else{
                //req failed
                setShowAlert(true);
                setAlertType("error")
                setAlertText("User could not be added.")
            }
        }

        
    }

    return (
        <form onSubmit = {submitHandler}>
        <Stack>
            <Typography variant = "p" >Add Customer</Typography>
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

            <Stack direction = 'row' justifyContent="space-evenly">
                <Button type = "submit">Add</Button>
                <Button onClick = {(e)=>{props.setShowAddUser(false)}}>Close</Button>
            </Stack>
            
        </Stack>
        </form>
    )
}