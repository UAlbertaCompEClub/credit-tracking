import {Button, FormControl, LinearProgress, InputAdornment, Input,Alert, InputLabel, FormHelperText,Stack,Typography} from '@mui/material'
import {useState} from 'react'
import {RequestService} from './Services/RequestService'
function AddTransaction(props){
    const [amount,setAmount] = useState(0)

    //Alert Vars
    const[alertType,setAlertType] = useState("success");
    const[alertText,setAlertText] = useState("You are not registered. Ask an executive to register!");
    const[showAlert,setShowAlert] = useState(false);
    const[isLoading,setIsLoading] = useState(false)

    function quickAddHandler(add){
        setAmount((amount)=>{
            return amount + add
        })
    }
    async function submitTransactionHandler(type){
        //Make a call to submit the transaction. 
        setIsLoading(true)
        let realAmount
        if(type === "charge"){
            realAmount = amount*-1
        }else{
            realAmount = amount
        }

        let confirmation 
        await RequestService.newTransaction(props.user, realAmount, props.token)
        .then((res)=>{
            confirmation = res
        }) //holds the new user balance if successful

        if(confirmation){
            //transaction succeded
            setAlertType("success")
            setAlertText("Transaction Success: for this club user now has a balance of: "+confirmation )
            setShowAlert(true)
            props.refresh(false) // refresh the transaction list and balance
        }else{
            //transaction failed
            setAlertType("error")
            setAlertText("Transaction Failed.")
            setShowAlert(true)
        }

        setIsLoading(false)

    }


    return(
        <Stack>
            <Typography variant = "h2">Add a Transaction</Typography>
            <Stack direction = "row" justifyContent = "space-between">
                <Button disabled = {isLoading} onClick = {(e)=>{ quickAddHandler(0.25)}}>+$0.25</Button>
                <Button disabled = {isLoading} onClick = {(e)=>{ quickAddHandler(0.50)}}>+$0.50</Button>
                <Button disabled = {isLoading} onClick = {(e)=>{ quickAddHandler(1)}}>+$1.00</Button>
            </Stack>
            <FormControl>
                <InputLabel htmlFor = "amount">Amount</InputLabel>
                <Input disabled = {isLoading} type = "number" startAdornment={<InputAdornment position="start">$</InputAdornment>} id = "amount" value = {amount} onChange = {(e) => setAmount(e.target.value)} />
                <FormHelperText id = "amountHelperText">Enter Amount</FormHelperText>
            </FormControl>

            {showAlert && <Alert severity = {alertType}> {alertText}!</Alert>}
            {isLoading && <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
              <LinearProgress color="inherit" />
            </Stack>}

            <Button disabled = {isLoading} onClick = {(e)=>{ submitTransactionHandler("charge")}}>Charge</Button>
            <Button disabled = {isLoading}  onClick = {(e)=>{ submitTransactionHandler("deposit")}}>Deposit</Button>
        </Stack>
        
        
    )
}

export default AddTransaction;