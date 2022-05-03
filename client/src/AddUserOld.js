import {Button, FormControl,Alert,LinearProgress, Input, InputLabel,Stack,Typography} from '@mui/material'
import { Button, FormControl, Alert, Input, InputLabel, Stack, Typography, Checkbox, FormControlLabel } from '@mui/material'
import {useState} from 'react'
import { AddUser } from './AddUser'
import {RequestService} from "./Services/RequestService"
import {CyanButton,WhiteButton} from './style'
import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/core/ButtonUnstyled';
import { styled } from '@mui/system';

export function AddUser(props) {
    const[ccid,setCcid] = useState("")
    const[name,setName] = useState("")
    const[alertType,setAlertType] = useState("error");
    const[alertText,setAlertText] = useState("You are not registered. Ask an executive to register!");
    const[showAlert,setShowAlert] = useState(false);
    const[isLoading,setIsLoading] = useState(false);
    const[acceptFOIP,setAcceptFOIP] = useState(false);

    async function submitHandler(input){
        setIsLoading(true)
        input.preventDefault()
        var forbiddenChars = /[$^&'()\=\\{}:"\\|<>\/?]+/;
        if (forbiddenChars.test(ccid) || forbiddenChars.test(name)) {
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
        if(!acceptFOIP) {
            setShowAlert(true);
            setAlertType("error")
            setAlertText("You have not accepted the terms of service")
            setIsLoading(false)
            return
        }
        
        let ccidStatus
        await RequestService.ccidCheckReq(ccid).then((res)=>{
            ccidStatus = res
        })

        if(ccidStatus !== -1 ){
            //ccid is registered already
            setShowAlert(true);
            setAlertType("error")
            setAlertText("User already exists")
        }else{
            const status = await RequestService.addUser(ccid,name,props.user.token)
            if(status === 0){
                //req succeded
                await RequestService.newTransaction(ccid,0,props.user.clubid,props.user.token)
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

        setIsLoading(false)
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
                <Input autoComplete="off" disabled = {isLoading} id = "ccid" value = {ccid} onChange = {(e) => setCcid(e.target.value)} />
            </FormControl>
            <FormControl>
                {/* name */}
                <InputLabel htmlFor = "name" class = "normalText">Name</InputLabel>
                <Input autoComplete="off" disabled = {isLoading} id = "name" onChange = {(e) => setName(e.target.value)}/>
            </FormControl>

            {isLoading && <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
              <LinearProgress color="inherit" />
            </Stack>}
            <FormControl>
                {/* password */}
                <InputLabel htmlFor = "password">Password</InputLabel>
                <Input autoComplete="off" disabled = {isLoading} id = "password" onChange = {(e) => setPassword(e.target.value)}/>
            </FormControl>
            <FormControl>
            <Button onClick={props.toggleDialog} sx = {{'margin': '2vh 0 0 2vw'}}
                variant="p" >View the Terms of Service Here</Button>
            <FormControlLabel id = 'foip' control={<Checkbox/>} onChange = {(e) => setAcceptFOIP(e.target.checked)}
            label="I, the user, accept the terms of service" />        
            </FormControl>

            {props.showAddUser && <AddUser exec={props.exec} setShowAddUser={props.setShowAddUser} refresh={props.refresh} />}
            <Stack direction = 'row' justifyContent="space-evenly">
                <Button disabled = {isLoading} class = "redText" type = "submit">Add</Button>
                <CustomButton disabled = {isLoading} onClick = {(e)=>{props.setShowAddUser(false)}}>Close</CustomButton>
            </Stack>
            
        </Stack>
        </form>
    )
}