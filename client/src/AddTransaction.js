import {Button, FormControl, LinearProgress, InputAdornment, Input,Alert, InputLabel, FormHelperText,Stack,Typography} from '@mui/material'
import {useState} from 'react'
import {RequestService} from './Services/RequestService'
import './style.css'

function AddTransaction(props){
    const [amount,setAmount] = useState("")

    //Alert Vars
    const[alertType,setAlertType] = useState("success");
    const[alertText,setAlertText] = useState("You are not registered. Ask an executive to register!");
    const[showAlert,setShowAlert] = useState(false);
    const[isLoading,setIsLoading] = useState(false)

    function quickAddHandler(add){
  
        setAmount((amount)=>{
            if(amount ===""){
                return 0 + add
            }else{
                return amount + add
            }
           
        })
    }
    async function submitTransactionHandler(type){
        //Make a call to submit the transaction. 
        setIsLoading(true)

        if(amount === ""){
            setAlertType("error")
            setAlertText("Please Enter a Value")
            setShowAlert(true)
            setIsLoading(false)
            return
        }


        let realAmount
        if(type === "charge"){
            realAmount = amount*-1
        }else{
            realAmount = amount
        }

        let confirmation 
        await RequestService.newTransaction(props.customerCcid, realAmount,props.user.clubid, props.user.token,props.user.ccid)
        .then((res )=>{
            confirmation = res
        }) //holds the new user balance if successful

        if(confirmation !== null ){
            //transaction succeded
            setAlertType("success")
            setAlertText("Transaction Success")
            setShowAlert(true)
            props.refresh(true) // refresh the transaction list and balance
        }else{
            //transaction failed
            setAlertType("error")
            setAlertText("Transaction Failed.")
            setShowAlert(true)
        }
        setAmount("")
        setIsLoading(false)

    }


    return(
        <Stack spacing = {1.7} direction = "column">
            <Typography variant = "h2">Add a Transaction</Typography>
            <Stack direction = "row" justifyContent = "space-between">
                <Button className ="btn whiteBtn" disabled = {isLoading} onClick = {(e)=>{ quickAddHandler(0.25)}}>+$0.25</Button>
                <Button className ="btn whiteBtn" disabled = {isLoading} onClick = {(e)=>{ quickAddHandler(0.50)}}>+$0.50</Button>
                <Button className ="btn whiteBtn" disabled = {isLoading} onClick = {(e)=>{ quickAddHandler(1)}}>+$1.00</Button>
            </Stack>
            <FormControl>
                <InputLabel htmlFor = "amount">Amount</InputLabel>
                <Input autoComplete="off" disabled = {isLoading} type = "number" startAdornment={<InputAdornment position="start">$</InputAdornment>} id = "amount" value = {amount} onChange = {(e) => setAmount(e.target.value)} />
                <FormHelperText id = "amountHelperText">Enter Amount</FormHelperText>
            </FormControl>

            {showAlert && <Alert severity = {alertType}> {alertText}!</Alert>}
            {isLoading && <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
              <LinearProgress color="inherit" />
            </Stack>}
            <Stack sx = {{my:2}} direction = 'row' justifyContent="space-evenly">
            <Button className = "btn cyanBtn oval" disabled = {isLoading} onClick = {(e)=>{ submitTransactionHandler("charge")}}>Charge</Button>
            <Button className = "btn cyanBtn oval" disabled = {isLoading}  onClick = {(e)=>{ submitTransactionHandler("deposit")}}>Deposit</Button>
            </Stack>
        </Stack>
        
        
    )
}

export default AddTransaction;