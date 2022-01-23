import { Button, FormControl, Input, Select, LinearProgress, InputLabel, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import { RequestService } from "./Services/RequestService"
import { AddUser } from './AddUser'


function request() {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ccid: 'mfiaz',
      password: 'password'
    }),
    token: JSON.stringify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjY2lkIjoibWZpYXoiLCJpYXQiOjE2Mzg5MTQ2NDgsImV4cCI6MTY0MTUwNjY0OH0.Ikbba9WSkiryA9nMrtovniQYlcmSc1TWBjFNw89VXjA')
  };
  fetch('http://localhost:8000/api/v1/user', requestOptions)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(data => console.log(data));
}

function ClubDashboard(props) {
  const [ccid, setCcid] = useState("")
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
           {/*
              fiaz here, I changed the key of the table to be
              ccid instead of name. Names can be repeated. When this happens
              it causes errors in your table.
             */}
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

  useEffect(() => {
    firstCall()
  }, [])

  useEffect(() => {
    searchUsers(ccid)
  }, [users.allUsers])

  async function refresh() {
    //get updated list of users


    setUsers((prevState) => {
      return { ...prevState, isLoading: true }
    })

    setTimeout(() => {
      RequestService.clubRequest(props.user.clubid, props.user.token)
        .then((res) => {
          setUsers({
            allUsers: res,
            table: getTable(res),
            isLoading: false
          })

        })
    }, 1000)
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
  
  return(
      <Stack>
          <Stack direction = 'row' justifyContent="space-evenly">
            <Button onClick = {props.logout} >Logout</Button>
            <Button onClick = {(e)=>{selectUser(props.user.ccid)}} >My Profile</Button>
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
              <FormControl>
                  <InputLabel htmlFor = "ccid">ccid or name</InputLabel>
                  <Input autoComplete="off" id = "ccid" value = {ccid} onChange= {(e) => {setCcid(e.target.value); searchUsers(e.target.value)}} />
              </FormControl>
              <Button onClick = {(e)=>{toggleAddPerson()}}> Add User</Button>
          </Stack>

          {showAddUser && <AddUser   user = {props.user} setShowAddUser ={setShowAddUser} refresh = {refresh} />}

          {/* Show table when not loading and show text when loading */}
          {users.isLoading && <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
            <LinearProgress color="inherit" />
          </Stack>}
          {!users.isLoading && users.table} 

      </Stack>

  );


}

export default ClubDashboard;