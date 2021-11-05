import AddTransaction from './AddTransaction'
import {useState} from 'react'
import {Button, FormControl, MenuItem, Input, Select, InputLabel, Container, FormHelperText,Stack, Table, TableBody, TableCell,TableContainer,TableHead,TableRow,Paper,Typography} from '@mui/material'
let path = process.env.REACT_APP_SERVER


function UserProfile(){
    // Show user information and allows transaction adding if the user is logged in
    const [userName, setName]  = useState("Name")
    const [userTransactions, setTransactions]  = useState("{}")
    const [userBalances, setBalances]  = useState({club1:50,club2:-25})
    const [club, setClub] = useState("club1")

    const clubs = ["club1","club2"] // should be all clubs the user has balances in

    //Table Logic
    function createData(name, calories) {
        return { name, calories };
      }
      
    const rows = [
        createData('Frozen yoghurt', 159 ),
        createData('Ice cream sandwich', 237),
        createData('Eclair', 262),
        createData('Cupcake', 305),
        createData('Gingerbread', 356),
      ];
    const table = <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell align="right">Transactions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow
            key={row.name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row.name}
            </TableCell>
            <TableCell align="right">{row.calories}</TableCell>
            <TableCell align="right">{row.fat}</TableCell>
            <TableCell align="right">{row.carbs}</TableCell>
            <TableCell align="right">{row.protein}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      </Table>
     </TableContainer>


    function setTestData(){

    } 

    function getUserInfo(){
        fetch(`${path}user?token`)
    }

    function balanceMessage(club){
        const balance = Math.abs(userBalances[club])

        if (userBalances[club] < 0){
            //user owes money
            return "You owe: $" + balance
        }else{
            //user has money or owes no money
            return "You have: $" + balance
        }
    }

    function changeClub(event){
        setClub(event.target.value)
    }

    return (
        <Stack >
            <Typography variant = "h1">{userName}</Typography>
            <Typography variant = "h2">{balanceMessage(club)}</Typography>
            <Typography variant = "p">For</Typography>
            <FormControl>
                <InputLabel id="club">club</InputLabel>
                <Select
                    labelId="club"
                    id="clubSelect"
                    value={club}
                    label="club"
                    onChange={changeClub}>
                    {clubs.map( clubName => <MenuItem value={clubName}>{clubName}</MenuItem>)}
                </Select>
            </FormControl>
            {table}


            <AddTransaction></AddTransaction>
        </Stack>
        
        
    )


}

export default UserProfile;