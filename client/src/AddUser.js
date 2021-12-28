import {Button, FormControl,Alert,LinearProgress, Input, InputLabel,Stack,Typography} from '@mui/material'
import {useState} from 'react'
import {RequestService} from "./Services/RequestService"
import "./style.css"

export function AddUser(props) {
    const[ccid,setCcid] = useState("")
    const[name,setName] = useState("")
    const[alertType,setAlertType] = useState("error");
    const[alertText,setAlertText] = useState("You are not registered. Ask an executive to register!");
    const[showAlert,setShowAlert] = useState(false);
    const[isLoading,setIsLoading] = useState(false)

    async function submitHandler(input){
        setIsLoading(true)

        input.preventDefault()
        
        if(ccid === "" || name === ""){
            setShowAlert(true);
            setAlertType("error")
            setAlertText("Please fill all fields")
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
            const status = await RequestService.addUser(ccid,name,props.exec.token)
            if(status === 0){
                //req succeded
                await RequestService.newTransaction(ccid,0,props.exec.clubid,props.exec.token)
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

    return (
        <form onSubmit = {submitHandler}>
        <Stack spacing = {1} sx = {{mt:1}} direction = "column">
            <Typography variant = "p" class = "whiteText">Add Customer</Typography>
             {/* show alert if showAlert is true */}
             {showAlert && <Alert severity = {alertType}> {alertText}!</Alert>} 
            <Stack spacing = {2}>
                <FormControl>
                {/*ccid */}
                <InputLabel htmlFor = "ccid" class = "whiteText">ccid</InputLabel>
                    <Input autoComplete="off" disabled = {isLoading} id = "ccid" value = {ccid} onChange = {(e) => setCcid(e.target.value)} />
                </FormControl>
                <FormControl>
                    {/* name */}
                    <InputLabel htmlFor = "name" class = "whiteText">Name</InputLabel>
                    <Input autoComplete="off" disabled = {isLoading} id = "name" onChange = {(e) => setName(e.target.value)}/>
                </FormControl>
            </Stack>

            {isLoading && <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
              <LinearProgress color="inherit" />
            </Stack>}

            <Stack direction = 'row' justifyContent="space-evenly">
                <Button disabled = {isLoading}  className = "btn cyanBtn oval" type = "submit">Add</Button>
<<<<<<< Updated upstream
                <CustomButton disabled = {isLoading}  className = "btn cyanBtn oval" onClick = {(e)=>{props.setShowAddUser(false)}}>Close</CustomButton>
=======
                <Button disabled = {isLoading}  className = "btn cyanBtn oval" onClick = {(e)=>{props.setShowAddUser(false)}}>Close</Button>
>>>>>>> Stashed changes
            </Stack>
            
        </Stack>
        </form>
    )
}