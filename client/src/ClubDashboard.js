import {Button, FormControl, Box,Input,Grid, LinearProgress, InputLabel,Stack, Table, TableBody, TableCell,TableContainer,TableHead,TableRow,Paper,Typography, CircularProgress} from '@mui/material'
import {useState,useEffect} from 'react'
import {RequestService} from "./Services/RequestService"
import {AddUser} from './AddUser'
import {AddExec} from './AddExec'

function ClubDashboard(props){
    const [clubName, setClubName] = useState(props.exec.club)
    const [ccid, setCcid] = useState("")
    
    const [showAddUser,setShowAddUser] = useState(false)
    const [showAddExec,setShowAddExec] = useState(false)

    
    const [users, setUsers] = useState({allUsers:[],shownUsers:[],table:"",isLoading:true })
    
    
    function getTable(users){

      return(<TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">ccid</TableCell>
              <TableCell align="right">Transactions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => (
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
        </TableContainer>)
      
    }
    async function firstCall(){ 
      // First API call
      await RequestService.clubRequest(props.exec.clubid)
      .then((res)=>{
        console.log(res)
        //Set initial users and shown users

        setUsers({
          allUsers:res,
          shownUsers:res,
          table:getTable(res),
          isLoading:false
        })
      })

    }

    useEffect( ()=>{
      firstCall()},[])

    async function refresh(){
      //get updated list of users
      setUsers((prevState)=>{
        return{...prevState,isLoading:true}
      })

      RequestService.clubRequest(props.clubid,props.token)
      .then((res)=>{
        setUsers({
          allUsers:res,
          shownUsers:res,
          table:getTable(res),
          isLoading:false
        })
        searchUsers(ccid)
      })
    }

    function searchUsers(ccidName){
    
      console.log(ccidName)
      ccidName = ccidName.toLowerCase()
      if(ccidName === ""){
        setUsers((prevState)=>{
          return{
            ...prevState,
            shownUsers:prevState.allUsers
          }
        }) 
      }else{
        let newUsers = []
        for(let user of users){
          if (user.ccid.toLowerCase().includes(ccidName) || user.name.toLowerCase().includes(ccidName)){
            newUsers.push(user)
          }
        }
        setUsers((prevState)=>{
          return{
            ...prevState,
            shownUsers:newUsers
          }
        }) 
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
      users.shownUsers = []
      
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
    
    return(
        <Stack>
            <Stack direction = 'row' justifyContent="space-evenly">
              <Button onClick = {props.logout} >Logout</Button>
              <Button onClick = {(e)=>{selectUser(props.exec.ccid)}} >My Profile</Button>
            </Stack>
            
            <Typography variant = "h1">{clubName}</Typography>

            <Stack direction = "row" justifyContent = "space-between" width = "100%">
                <FormControl>
                    <InputLabel htmlFor = "ccid">ccid or name</InputLabel>
                    <Input id = "ccid" value = {ccid} onChange= {(e) => {setCcid(e.target.value); searchUsers(e.target.value)}} />
                </FormControl>
                <Button onClick = {(e)=>{toggleAddPerson("customer")}}> Add Customer</Button>
                <Button onClick = {(e)=>{toggleAddPerson("Exec")}}> Add Exec</Button>
            </Stack>

            {showAddUser && <AddUser  setShowAddUser ={setShowAddUser} refresh = {refresh} />}
            {showAddExec && <AddExec setShowAddExec ={setShowAddExec} refresh = {refresh} />}

            {/* Show table when not loading and show text when loading */}
            {users.isLoading && <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
              <LinearProgress color="inherit" />
            </Stack>}
            {!users.isLoading && users.table} 
        </Stack>

    );


}

export default ClubDashboard;