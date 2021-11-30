<<<<<<< HEAD
import {Button, FormControl, Input, InputLabel,Stack, Table, TableBody, TableCell,TableContainer,TableHead,TableRow,Paper,Typography} from '@mui/material'
import {useState} from 'react'
=======
import {Button, FormControl, Input, InputLabel, Container, FormHelperText,Stack, Table, TableBody, TableCell,TableContainer,TableHead,TableRow,Paper,Typography} from '@mui/material'
import {useState, useEffect} from 'react'
>>>>>>> api_auth
import {RequestService} from "./Services/RequestService"
import {AddUser} from './AddUser'
import {AddExec} from './AddExec'

function ClubDashboard(props){

    const [clubName, setClubName] = useState(props.club)
    const [ccid, setCcid] = useState("")
    const [users, setUsers] = useState(RequestService.clubRequest(props.club,props.token))
    const [shownUsers,setShownUsers] = useState(users)
    const [showAddUser,setShowAddUser] = useState(false)
    const [showAddExec,setShowAddExec] = useState(false)

    function refresh(){
      //get updated list of users
      setUsers(RequestService.clubRequest(props.club,props.token))
    }

    function searchUsers(ccidName){
    
      console.log(ccidName)
      ccidName = ccidName.toLowerCase()
      if(ccidName === ""){
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
    function toggleAddPerson(personType){
      //Shows or hides add Exec and add User
      //only one can display at a time.

      if(personType === "Exec"){
        if(showAddExec){
          //toggle closed
          setShowAddExec(false)
          
        }else{
          //toggle open
          setShowAddExec(true)
          if(setShowAddUser){
            //hide add user when we open add exec
            setShowAddUser(false)
          }
        }
      }else if (personType === "customer"){
        if(showAddUser){
          //Toggle closed
          setShowAddUser(false)
        
        }else{
          //toggle open
          setShowAddUser(true)
          if(setShowAddExec){
            //hide add user when we open add exec
            setShowAddExec(false)
          }
        }
      }





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
<<<<<<< HEAD
                <FormControl>
                    <InputLabel htmlFor = "ccid">ccid or name</InputLabel>
                    <Input id = "ccid" value = {ccid} onChange= {(e) => {setCcid(e.target.value); searchUsers(e.target.value)}} />
                </FormControl>
                <Button onClick = {(e)=>{toggleAddPerson("customer")}}> Add Customer</Button>
                <Button onClick = {(e)=>{toggleAddPerson("Exec")}}> Add Exec</Button>
=======
                <Stack  direction = "row">
                    <FormControl>
                        <InputLabel htmlFor = "ccid">ccid or name</InputLabel>
                        <Input id = "ccid" value = {ccid} onChange= {(e) => {setCcid(e.target.value); searchUsers(e.target.value)}} />
                    
                    </FormControl>
                    <Button>Search</Button>
                </Stack >
                

                <Button onClick = {(e)=>{setShowAddUser(true)}}> Add Customer</Button>
>>>>>>> api_auth
            </Stack>

            {showAddUser && <AddUser setShowAddUser ={setShowAddUser} refresh = {refresh} />}
            {showAddExec && <AddExec setShowAddExec ={setShowAddExec} refresh = {refresh} />}

            {table}

        </Stack>

    );


}

export default ClubDashboard;