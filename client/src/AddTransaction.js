import {Button, FormControl, InputAdornment, Input,Alert, InputLabel, FormHelperText,Stack,Typography} from '@mui/material'
import {useState} from 'react'

function AddTransaction(props){
    const [amount,setAmount] = useState(0)

    //Alert Vars
    const[alertType,setAlertType] = useState("success");
    const[alertText,setAlertText] = useState("You are not registered. Ask an executive to register!");
    const[showAlert,setShowAlert] = useState(false);

    function quickAddHandler(add){
        setAmount((amount)=>{
            return amount + add
        })
    }
    function submitTransactionHandler(type){
        //Make a call to submit the transaction. 
        //Should receive some sort of confirmation and the new balance

        const confirmation = "Test Value" //holds the new user balance if successful

        if(confirmation){
            //transaction succeded
            setAlertType("success")
            setAlertText("Transaction Success: for this club user now has a balance of: "+confirmation )
            setShowAlert(true)
            props.getUserInfo() // refresh the transaction list and balance
        }else{
            //transaction failed
            setAlertType("error")
            setAlertText("Transaction Failed.")
            setShowAlert(true)
        }

    }


    return(
        <Stack>
            <Typography variant = "h2">Add a Transaction</Typography>
            <Stack direction = "row" justifyContent = "space-between">
                <Button onClick = {(e)=>{ quickAddHandler(0.25)}}>+$0.25</Button>
                <Button onClick = {(e)=>{ quickAddHandler(0.50)}}>+$0.50</Button>
                <Button onClick = {(e)=>{ quickAddHandler(1)}}>+$1.00</Button>
            </Stack>
            <FormControl>
                <InputLabel htmlFor = "amount">Amount</InputLabel>
                <Input type = "number" startAdornment={<InputAdornment position="start">$</InputAdornment>} id = "amount" value = {amount} onChange = {(e) => setAmount(e.target.value)} />
                <FormHelperText id = "amountHelperText">Enter Amount</FormHelperText>
            </FormControl>

            {showAlert && <Alert severity = {alertType}> {alertText}!</Alert>}

            <Button onClick = {(e)=>{ submitTransactionHandler("charge")}}>Charge</Button>
            <Button onClick = {(e)=>{ submitTransactionHandler("deposit")}}>Deposit</Button>
        </Stack>
        
        
    )
}

export default AddTransaction;