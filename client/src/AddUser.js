import {Button, FormControl,Alert, Input, InputLabel, Container, FormHelperText,Stack, Table, TableBody, TableCell,TableContainer,TableHead,TableRow,Paper,Typography} from '@mui/material'
import {useState} from 'react'
import {RequestService} from "./Services/RequestService"
import "./style.css"
import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/core/ButtonUnstyled';
import { styled } from '@mui/system';

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

    //-------------------Button shinnanigins--------------//
    const CustomButtonRoot = styled('button')`
    background-color: transparent;
    padding: 15px 20px;
    border-radius: 10px;
    color: #fff;
    font-weight: 600;
    font-family: Helvetica, Arial, sans-serif;
    font-size: 14px;
    transition: all 200ms ease;
    cursor: pointer;
    border: 0.5px;
    border-colour: grey;

    &:hover {
        background-color: transparent;
    }

    &.${buttonUnstyledClasses.active} {
        background-color: transparent;
    }

    &.${buttonUnstyledClasses.focusVisible} {
        box-shadow: transparent;
        outline: none;
    }

    &.${buttonUnstyledClasses.disabled} {
        opacity: 0.5;
        cursor: not-allowed;
        box-shadow: 0 0 0 0 rgba(0, 127, 255, 0);
    }
    `;
    function CustomButton(props) {
        return <ButtonUnstyled {...props} component={CustomButtonRoot} />;
    }
    //----------------------------------------------------//



    return (
        <form onSubmit = {submitHandler}>
        <Stack>
            <Typography variant = "p" class = "normalText">Add Customer</Typography>
             {/* show alert if showAlert is true */}
             {showAlert && <Alert severity = {alertType}> {alertText}!</Alert>} 
            <FormControl>
              {/*ccid */}
              <InputLabel htmlFor = "ccid" class = "normalText">ccid</InputLabel>
                <Input id = "ccid" value = {ccid} onChange = {(e) => setCcid(e.target.value)} />
            </FormControl>
            <FormControl>
                {/* name */}
                <InputLabel htmlFor = "name" class = "normalText">Name</InputLabel>
                <Input id = "name" onChange = {(e) => setName(e.target.value)}/>
            </FormControl>

            <Stack direction = 'row' justifyContent="space-evenly">
                <Button className = "redText" type = "submit">Add</Button>
                <CustomButton onClick = {(e)=>{props.setShowAddUser(false)}}>Close</CustomButton>
            </Stack>
            
        </Stack>
        </form>
    )
}