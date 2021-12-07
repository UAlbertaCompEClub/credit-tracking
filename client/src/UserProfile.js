import AddTransaction from './AddTransaction'
import {useState} from 'react'
import {Button, FormControl, MenuItem, Input, Select, InputLabel, Container, FormHelperText,Stack, Table, TableBody, TableCell,TableContainer,TableHead,TableRow,Paper,Typography} from '@mui/material'
import {RequestService} from "./Services/RequestService"


function UserProfile(props){
    // Show user information and allows transaction adding if the user is logged in
    const [user, setUser]  = useState(RequestService.userRequest(props.ccid,props.club))
    let clubs =(user.clubs)
    
    const [club, setClub] = useState((Object.keys(clubs))[0])
    const [isExecView, setIsExecView] = useState(props.isExec)
    
   
    

      // TODO create the combined clubs data
      // function getNetBalance(){
      //   let total = 0
      //   for( club of clubs){
      //     total += clubs[club].balance
      //   }
      //   return total;
      // }
      // clubs = { ...clubs, "All Clubs":{
      //       transactions:[

      //       ],
      //       balance: getNetBalance()
      //   } 



    function refresh(){
      setUser(RequestService.userRequest(props.ccid,props.club))
    }

    //Table Logic
    function createData(date, amount) {
        return { date, amount };
    }
      
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
              <TableRow key={row.date+row.amount} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

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
                    {[...(Object.keys(clubs))].map( clubName => <MenuItem value={clubName}>{clubName}</MenuItem>)}
                </Select>
            </FormControl>
            {table}


            {isExecView && <AddTransaction refresh = {refresh}></AddTransaction>}
            {/* Only show the add transaction if current user is an exec */}
        </Stack>
        
        
    )


}

export default UserProfile;