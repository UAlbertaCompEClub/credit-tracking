import AddTransaction from './AddTransaction'
import {useState} from 'react'
import {Button, FormControl, MenuItem, Input, Select, InputLabel, Container, FormHelperText,Stack, Table, TableBody, TableCell,TableContainer,TableHead,TableRow,Paper,Typography} from '@mui/material'
let path = process.env.REACT_APP_SERVER


function UserProfile(props){
    // Show user information and allows transaction adding if the user is logged in
    const [userName, setName]  = useState("Name")
    const [clubs, setClubs] = useState({
      //default Info, REMOVE LATER
      club1:{
        transactions:  [
          createData('Nov 1 2021', "Payed $5" ),
          createData('Dec 2 2020', "Billed $1"),
          createData('Mar 20 2019', "Payed $5"),
          createData('Jan 1 2001', "Billed $20"),
          createData('Dec 4 1985', "Payed $20"),
        ],
        balance: 50
      }
     ,
      club2:{
        transactions:  [
          createData('Nov 1 2021', "Billed $5" ),
          createData('Dec 2 2020', "Billed $1"),
          createData('Mar 20 2019', "Billed $5"),
          createData('Jan 1 2001', "Billed $20"),
          createData('Dec 4 1985', "Billed $20"),
        ],
        balance: -20
      }})
    const [userTransactions, setTransactions]  = useState("{}")
    const [userBalances, setBalances]  = useState({club1:50,club2:-25})
    const [club, setClub] = useState("club1")
    const [isExecView, setIsExecView] = useState(true)

      //create the combined clubs data
      // function getNetBalance(){
      //   let total = 0
      //   for( club of clubs){
      //     total += clubs[club].balance
      //   }
      //   return total;
      // }
      // setClubs((clubs)=>{
      //   return { ...clubs, "All Clubs":{
      //       transactions:[

      //       ],
      //       balance: getNetBalance()
      //   } }
      // })


    //Get and set user information #TO DO




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

    function getclubs(){
        fetch(`${path}user?token`)
    }

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
            <Typography variant = "h1">{userName}</Typography>
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


            {isExecView && <AddTransaction getclubs = {getclubs}></AddTransaction>}
            {/* Only show the add transaction if current user is an exec */}
        </Stack>
        
        
    )


}

export default UserProfile;