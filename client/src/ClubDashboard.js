import { FormControlLabel, Checkbox, Button, FormControl, Input, Select, LinearProgress, InputLabel, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import { RequestService } from "./Services/RequestService"
import { AddUser } from './AddUser'
import {CyanButton,WhiteButton} from './style'


function ClubDashboard(props) {
  const [ccid, setCcid] = useState("")
  const [allUsers, setAllUsers] = useState(false)
  const [users, setUsers] = useState({allUsers:[],table:"",isLoading:true })
  const [showAddUser, setShowAddUser] = useState(false)


  function getTable(users) {

    return (<TableContainer component={Paper}>
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
              key={row.ccid}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              onClick={(e) => {
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
  async function firstCall() {
    // First API call
    await RequestService.clubRequest(props.user.clubid, props.user.token)
      .then((res) => {
        console.log(res)
        //Set initial users and shown users

        setUsers({
          allUsers: res,
          table: getTable(res),
          isLoading: false
        })
      })

  }

  async function getAllClubs() {
    // First API call
    await RequestService.allClubRequest(props.user.token)
      .then((res) => {
        console.log(res)
        //Set initial users and shown users

        setUsers({
          allUsers: res,
          table: getTable(res),
          isLoading: false
        })
      })

  }

  useEffect(() => {
    firstCall()
  }, [])

  useEffect(() => {
    searchUsers(ccid)
  }, [users.allUsers])

  async function refresh() {
    //get updated list of users
    console.log("allusers: "+ allUsers.toString())
    setTimeout(() => {
      if(!allUsers){
        RequestService.allClubRequest( props.user.token)
        .then((res) => {
          setUsers({
            allUsers: res,
            table: getTable(res),
            isLoading: false
          })
  
        })
      }else{
        RequestService.clubRequest(props.user.clubid, props.user.token)
        .then((res) => {
          setUsers({
            allUsers: res,
            table: getTable(res),
            isLoading: false
          })

        })
      }
      setUsers((prevState) => {
        return { ...prevState, isLoading: true }
      })
      
    },0)
  }

  function searchUsers(ccidName) {

    console.log(ccidName)
    ccidName = ccidName.toLowerCase()
    if (ccidName === "") {
      setUsers((prevState) => {
        return {
          ...prevState,
          table: getTable(users.allUsers)
        }
      })
    } else {
      let newUsers = []
      for (let user of users.allUsers) {
        if (user.ccid.toLowerCase().includes(ccidName) || user.name.toLowerCase().includes(ccidName)) {
          newUsers.push(user)
        }
      }
      console.log(newUsers)
      setUsers((prevState) => {
        return {
          ...prevState,
          table: getTable(newUsers)
        }
      })
    }

  }

  function selectUser(ccid) {
    //Open a user's page
    props.openUser(ccid)
  }
  function toggleAddPerson() {
    //Shows or hides add User
    //only one can display at a time.
    if (showAddUser) {
      //Toggle closed
      setShowAddUser(false)

    } else {
      //toggle open
      setShowAddUser(true)
    }
    
  }
  
  function toggleAllUsers(){
    setAllUsers((prevState)=>{
        return !prevState
    })
    setTimeout(()=>{
      console.log("all users in toggle: "+allUsers.toString())

      refresh()
    },200)
    
  }
  
  return(
      <Stack spacing ={1}>
          <Stack direction = 'row' justifyContent="space-evenly" sx={{pt: 2}} >
            <WhiteButton 
              style={{
                border:"transparent", boxShadow:"none"
              }} 
              onClick = {props.logout}>Logout</WhiteButton>
            <WhiteButton 
             style={{
              border:"transparent", boxShadow:"none"
              }} 
            onClick = {(e)=>{selectUser(props.user.ccid)}} >My Profile</WhiteButton>
          </Stack>
          
          <Typography variant = "h1">{props.user.club}</Typography>
          {/* <FormControl>
                    <InputLabel  id="club">club</InputLabel>
                    <Select 
                        labelId="club"
                        id="clubSelect"
                        value={userState.club}
                        label="club"
                        onChange={changeClub}>
                        {[...(Object.keys(userState.user.clubs))].map( clubName => <MenuItem key = {clubName} value={clubName}>{clubName}</MenuItem>)}
                    </Select>
          </FormControl> */}

          <Stack direction = "row" justifyContent = "space-between" width = "100%">
            <Stack>
            <FormControlLabel sx={{ pb: 2 }} control={<Checkbox onClick = {toggleAllUsers}/>} label="show users from all clubs" />
              <FormControl>
                    <InputLabel  htmlFor = "ccid">ccid or name</InputLabel>
                    <Input autoComplete="off" id = "ccid" value = {ccid} onChange= {(e) => {setCcid(e.target.value); searchUsers(e.target.value)}} />
                </FormControl>
            </Stack>
              
              <CyanButton
                style ={{
                  height: "50px"         
                }}
              onClick = {(e)=>{toggleAddPerson()}} > Add User to Club</CyanButton>
          </Stack>

          {showAddUser && <AddUser  toggleDialog={props.toggleDialog} user = {props.user} setShowAddUser ={setShowAddUser} refresh = {refresh} />}

          {/* Show table when not loading and show text when loading */}
          {users.isLoading && <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
            <LinearProgress color="inherit" />
          </Stack>}
          {!users.isLoading && users.table} 

      </Stack>

  );


}

export default ClubDashboard;