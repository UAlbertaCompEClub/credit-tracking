import AddTransaction from './AddTransaction'
import {useState,useEffect} from 'react'
import {Button, FormControl, MenuItem,  Select, InputLabel, Stack, Table, TableBody, TableCell,TableContainer,TableHead,TableRow,Paper,Typography} from '@mui/material'
import {RequestService} from "./Services/RequestService"


function UserProfile(props){
    // Show user information and allows transaction adding if the user is logged in
    const [user, setUser]  = useState(getUserInfo())
    const [clubs, setClubs] = useState(user.clubs)
    
    const [club, setClub] = useState((Object.keys(clubs))[0])
    const [isExecView, setIsExecView] = useState(props.isExec)
    
    function getUserInfo(){
      //sets user. If they have no transactions add a special row
      let info = RequestService.userRequest(props.ccid)
      console.log(info.clubs)
      if (Object.keys(info.clubs).length === 0){
      
        //no transaction history
        info.clubs = {"No Transactions":{transactions:[{date:"",Amount:""}],balance:0}}
        
      }
      return info
    }

    useEffect(()=>{
      setClubs(user.clubs)
      createAllClubs()
     
    },[user])

    //create the combined clubs data
    function createAllClubs(){
      console.log("Recomputed totals")
      let trans = []
      let total = 0
      for( let club in clubs){
        total += clubs[club].balance
        trans = trans.concat(clubs[club].transactions)
        console.log(total)
      }
      setClubs({ ...clubs, "All Clubs":{
        transactions: trans,
        balance: total
        }
      }) 
    }
    console.log(clubs)




    function refresh(){
      setUser(RequestService.userRequest(props.ccid,props.club))

    }

    //Table Logic
    function createData(date, amount) {
        return { date, amount };
    }
    let keyHelper=0
    const table = <TableContainer component={Paper}>
      <Table  aria-label="simple table">

          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell >Amount</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {clubs[club].transactions.map((row) => (
              <TableRow key={row.date+row.amount+keyHelper++} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                <TableCell component="th" scope="row"> {row.date} </TableCell>
                <TableCell >{row.amount}</TableCell>
                
              </TableRow>
            ))}
          </TableBody>
          
      </Table>
      </TableContainer>

    function balanceMessage(){
        const balance = clubs[club].balance

        if (balance < 0){
            //user owes money
            return "You owe: $" + Math.abs(balance)
        }else{
            //user has money or owes no money
            return "You have: $" + Math.abs(balance)
        }
    }

    function changeClub(event){
        setClub(event.target.value)
    }
    
    function closeUser(){
      props.setPage("ClubDashboard")
    }

    return (
        <Stack >
            { isExecView && <Button onClick = {closeUser} >Close</Button>}
            <Typography variant = "h1">{user.name}</Typography>
            <Typography variant = "h2">{balanceMessage()}</Typography>
            <Typography variant = "p">For</Typography>
            <FormControl>
                <InputLabel id="club">club</InputLabel>
                <Select
                    labelId="club"
                    id="clubSelect"
                    value={club}
                    label="club"
                    onChange={changeClub}>
                    {[...(Object.keys(clubs))].map( clubName => <MenuItem key = {clubName} value={clubName}>{clubName}</MenuItem>)}
                </Select>
            </FormControl>
            {table}


            {isExecView && <AddTransaction refresh = {refresh}></AddTransaction>}
            {/* Only show the add transaction if current user is an exec */}
        </Stack>
        
        
    )


}

export default UserProfile;