import {Button, FormControl,Alert, Input, InputLabel, Container, FormHelperText,Stack, Table, TableBody, TableCell,TableContainer,TableHead,TableRow,Paper,Typography} from '@mui/material'
import {useState} from 'react'
import {RequestService} from "./Services/RequestService"
import "./style.css"

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
        <Stack spacing = {1} sx = {{mt:1}} direction = "column">
            <Typography variant = "p" class = "whiteText">Add Customer</Typography>
             {/* show alert if showAlert is true */}
             {showAlert && <Alert severity = {alertType}> {alertText}!</Alert>} 
             <Stack spacing = {2}>
                <FormControl >
                {/*ccid */}
                <InputLabel htmlFor = "ccid" class = "whiteText">ccid</InputLabel>
                    <Input id = "ccid" value = {ccid} onChange = {(e) => setCcid(e.target.value)} />
                </FormControl>
                <FormControl>
                    {/* name */}
                    <InputLabel htmlFor = "name" className = "whiteText">Name</InputLabel>
                    <Input id = "name" onChange = {(e) => setName(e.target.value)}/>
                </FormControl>
            </Stack>
            <Stack direction = 'row' justifyContent="space-evenly">
                <Button className = "btn cyanBtn oval" type = "submit">Add</Button>
                <Button className = "btn cyanBtn oval" onClick = {(e)=>{props.setShowAddUser(false)}}>Close</Button>
            </Stack>
            
        </Stack>
        </form>
    )
}