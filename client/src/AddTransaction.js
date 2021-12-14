import {Button, FormControl, InputAdornment, Input,Alert, InputLabel, FormHelperText,Stack,Typography} from '@mui/material'
import {useState} from 'react'
import {RequestService} from './Services/RequestService'
import "./style.css"

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
        let realAmount
        if(type == "charge"){
            realAmount = amount*-1
        }else{
            realAmount = amount
        }

        const confirmation = RequestService.newTransaction(props.user, realAmount, props.token) //holds the new user balance if successful

        if(confirmation){
            //transaction succeded
            setAlertType("success")
            setAlertText("Transaction Success: for this club user now has a balance of: "+confirmation )
            setShowAlert(true)
            props.refresh() // refresh the transaction list and balance
        }else{
            //transaction failed
            setAlertType("error")
            setAlertText("Transaction Failed.")
            setShowAlert(true)
        }

    }


    return(
        <Stack spacing = {1.7} direction = "column">
            <Typography variant = "h2">Add a Transaction</Typography>
            <Stack direction = "row" justifyContent = "space-between">
                <Button className ="btn whiteBtn" onClick = {(e)=>{ quickAddHandler(0.25)}}>+$0.25</Button>
                <Button className ="btn whiteBtn" onClick = {(e)=>{ quickAddHandler(0.50)}}>+$0.50</Button>
                <Button className ="btn whiteBtn" onClick = {(e)=>{ quickAddHandler(1)}}>+$1.00</Button>
            </Stack>
            <Stack direction = 'column'>
                <FormControl>
                    <InputLabel  htmlFor = "amount">Amount</InputLabel>
                    <Input type = "number" startAdornment={<InputAdornment position="start">$</InputAdornment>} id = "amount" value = {amount} onChange = {(e) => setAmount(e.target.value)} />
                    <FormHelperText id = "amountHelperText">Enter Amount</FormHelperText>
                </FormControl>
                {showAlert && <Alert severity = {alertType}> {alertText}!</Alert>}
                <Stack sx = {{my:2}} direction = 'row' justifyContent="space-evenly">
                    <Button className = "btn cyanBtn oval" onClick = {(e)=>{ submitTransactionHandler("charge")}}>Charge</Button>
                    <Button className = "btn cyanBtn oval" onClick = {(e)=>{ submitTransactionHandler("deposit")}}>Deposit</Button>
                </Stack>
            </Stack>
        </Stack>
        
        
    )
}

export default AddTransaction;