import {Button, FormControl, Input, InputLabel, Container, FormHelperText,Stack, Table, TableBody, TableCell,TableContainer,TableHead,TableRow,Paper,Typography} from '@mui/material'
import {useState} from 'react'
import {RequestService} from "./Services/RequestService"
import {AddUser} from './AddUser'
import "./style.css"

function ClubDashboard(props){

    const [clubName, setClubName] = useState(props.club)
    const [ccid, setCcid] = useState("")
    const [users, setUsers] = useState(RequestService.clubRequest(props.club,props.token))
    const [shownUsers,setShownUsers] = useState(users)
    const [showAddUser,setShowAddUser] = useState(false)
    

    function refresh(){
      //get updated list of users
      setUsers(RequestService.clubRequest(props.club,props.token))
    }

    function searchUsers(ccidName){
    
      console.log(ccidName)
      ccidName = ccidName.toLowerCase()
      if(ccidName == ""){
        setShownUsers(users)
      }else{
        let newUsers = []
        for(let user of users){
          if (user.ccid.toLowerCase().includes(ccidName) || user.name.toLowerCase().includes(ccidName)){
            newUsers.push(user)
          }
        }
        setShownUsers(newUsers)
      }
      
    }

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
    <Table aria-label="simple table" className = "thead tbody">
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell align="right" >ccid</TableCell>
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
                <FormControl>
                    <InputLabel htmlFor = "ccid">ccid or name</InputLabel>
                    <Input id = "ccid" value = {ccid} onChange= {(e) => {setCcid(e.target.value); searchUsers(e.target.value)}} />
                </FormControl>
                <Button className="btn cyanBtn" onClick = {(e)=>{setShowAddUser(true)}}> Add Customer</Button>
            </Stack>

            {showAddUser && <AddUser setShowAddUser ={setShowAddUser} refresh = {refresh} />}

            {table}

        </Stack>

    );


}

export default ClubDashboard;