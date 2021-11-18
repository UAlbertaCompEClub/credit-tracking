import {Button, FormControl, Input, InputLabel, Container, FormHelperText,Stack, Table, TableBody, TableCell,TableContainer,TableHead,TableRow,Paper,Typography} from '@mui/material'
import {useState} from 'react'
import {RequestService} from "./Services/RequestService"
import {AddUser} from './AddUser'
function ClubDashboard(props){

    const [clubName, setClubName] = useState(props.club)
    const [ccid, setCcid] = useState("")
    const [users, setUsers] = useState(RequestService.clubRequest(props.club,props.token))
    const [shownUsers,setShownUsers] = useState(users)
    const [showAddUser,setShowAddUser] = useState(true)

    let userSearchTerms = new Set()
    for (let user of users){
      userSearchTerms.add(user.ccid);
      userSearchTerms.add(user.name);
    }
    console.log(userSearchTerms)

    function refresh(){
      //get updated list of users
      setUsers(RequestService.clubRequest(props.club,props.token))
    }

    //get users based on Exec's club(s)

    //Table Logic
    function createData(name, ccid, transactions) {
        return { name, ccid, transactions };
      }

    function fetchUsers(){
      //Get list of users from backend

    }
    function selectUser(ccid){
      //Open a user's page
      props.openUser(ccid)
    }

    function search(){
      //Search users and return matches to show users
      shownUsers = []
      
    }
    
    const table = <TableContainer component={Paper}>
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell align="right">ccid</TableCell>
          <TableCell align="right">Transactions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {shownUsers.map((row) => (
          <TableRow
            key={row.name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            onClick = {(e)=>{
              selectUser(row.ccid)
            }}
          >
            <TableCell component="th" scope="row" >
              {row.name}
            </TableCell>
            <TableCell align="right">{row.ccid}</TableCell>
            <TableCell align="right">{row.transactions}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      </Table>
     </TableContainer>

    return(
        <Stack>
            <Stack direction = 'row' justifyContent="space-evenly">
              <Button onClick = {props.logout} >Logout</Button>
              <Button onClick = {(e)=>{selectUser(props.exec)}} >My Profile</Button>
            </Stack>
            
            <Typography variant = "h1">{clubName}</Typography>

            <Stack direction = "row" justifyContent = "space-between" width = "100%">
                <Stack  direction = "row">
                    <FormControl>
                        <InputLabel htmlFor = "ccid">ccid</InputLabel>
                        <Input id = "ccid" value = {ccid} onChange = {(e) => setCcid(e.target.value)} />
                    
                    </FormControl>
                    <Button>Search</Button>
                </Stack >
                

                <Button onClick = {(e)=>{setShowAddUser(true)}}> Add Customer</Button>
            </Stack>

            {showAddUser && <AddUser setShowAddUser ={setShowAddUser} refresh = {refresh} />}

            {table}

        </Stack>

    );


}

export default ClubDashboard;