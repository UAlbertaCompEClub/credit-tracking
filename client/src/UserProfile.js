import AddTransaction from './AddTransaction'
import { useState, useEffect } from 'react'
import { Button, FormControlLabel, FormControl, MenuItem, LinearProgress, Select, InputLabel, Stack, Table, TableBody, TableCell,TableContainer,TableHead,TableRow,Paper,Typography, Checkbox} from '@mui/material'
import { RequestService } from "./Services/RequestService"
import {CyanButton,WhiteButton} from './style'
import "./style.css"

function UserProfile(props){
    // Show user information and allows transaction adding if the user is logged in
    const [viewMode, setViewMode] = useState(0);
    const [user, setUser] = useState({});
    const [subscribed, setSubscribed] = useState({});

    function baseMode() {
      setViewMode(0)
    }
    function creditMode() {
      setViewMode(1)
    }
    function transactionMode() {
      setViewMode(2)
    }

    function toggleSubscribed() {
      subscribed ? setSubscribed(false) : setSubscribed(true)
    }
    
    function renderBase() {
      return (
              <Stack>
                {!props.isExec && <Typography variant="h4" color ="#c2c7af">{balanceMessage()}</Typography>}
                <Stack mt = "5vh">
                  <FormControl >
                      <InputLabel  id="club">club</InputLabel>
                      <Select 
                          labelId="club"
                          id="clubSelect"
                          value={userState.club}
                          label="club"
                          onChange={changeClub}>
                          {[...(Object.keys(userState.user.clubs))].map( clubName => <MenuItem key = {clubName} value={clubName}>{clubName}</MenuItem>)}
                      </Select>
                      
                  </FormControl>
                </Stack>
               
              </Stack>
        );
      }
      
      function renderCredit() {
        console.log('you are subscribed', subscribed)
        console.log('you are', user)
        return ( <Stack>
          <Typography variant="h2">{balanceMessage()}</Typography>
          { props.isExec && <Typography variant="h4">Debt payed back: ${getDebtPayed()}</Typography> }
          { <FormControlLabel
              control={<Checkbox defaultChecked={subscribed}
                onClick={e => {
                    toggleSubscribed()
                    RequestService.setSubscribed(props.customerCcid, e.target.checked, props.user.token)
                }} />} label="Subscribed to Email Invoices" />}
        </Stack>
        )
      }

      function renderTransaction() {
        return (
          <Stack>
          { props.isExec && <AddTransaction customerCcid={props.customerCcid} user={props.user} refresh={getUserInfo}></AddTransaction> }
          </Stack>      
        );
      }


    // Holds all data dependent on async calls for user data
    const [userState, setUserState] = useState({
      isLoading:true,
      user:{clubs:{"loading Clubs":{transactions:["a"],balance:0}}},
      club:"",
      table:""
    })

    //run on startup only
    useEffect(()=>{
      console.log(props.isExec)
      getUserInfo(true)
    },[])

    function getTableElement(isFirstTime,info,clubExplicit=null){
      let keyHelper=0
      let club
      if(isFirstTime){
        club = Object.keys(info.clubs)[0]
      }
      else if( clubExplicit === null){
        club = userState.club
      }else{
        club = clubExplicit
      }
      console.log("club is :" + club.toString());
      const table = 
      (<TableContainer component={Paper}>
        <Table aria-label="simple table">
            <TableHead>
              <TableRow  style ={{ background : "#1a1a18", borderBottom: "1.5px solid white"}}>
                <TableCell>Date</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Approved by</TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
              {/* This was added here to allow for displaying users with no transactions in any clubs */}
              {!(Object.keys(info.clubs[club]).length === 0) && info.clubs[club].transactions.map((row) => (
                <TableRow key={row.date+row.amount+keyHelper++} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} 
                style ={{ background : "#1a1a18", borderBottom: "1.5px solid #242422", borderTop:"1.5px solid #242422"}}>
                  <TableCell component="th" scope="row"> {row.date} </TableCell>
                  <TableCell >{row.amount}</TableCell>
                  <TableCell >{row.approver}</TableCell>
                </TableRow>
              ))}
            </TableBody>
        </Table>
        </TableContainer>)
        return table
    }

    async function getUserInfo(isFirstTime){
      //sets user. If they have no transactions add a special row
      //If this is the first call, also set the selected club to the first

      setUserState((prevState)=>{
        return{...prevState,
        isLoading:true}
      })

      let info
      await RequestService.userRequest(props.customerCcid)
      .then((res)=>{
        info = res
      })
      
      console.log(info)
      const table = getTableElement(isFirstTime,info)

      const userCleaned = await RequestService.getUserCleaned(props.customerCcid)
      setUser(userCleaned)
      setSubscribed(userCleaned.subscribed)

      if(isFirstTime){
        console.log(props.user.club)
        setUserState((prevState)=>{
          return{...prevState,
          user:info,
          table:table,
          club:(info.clubs.hasOwnProperty(props.user.club)?props.user.club :Object.keys(info.clubs)[0])
          
        }
        })
      }else{
        setUserState((prevState)=>{
          return{...prevState,
          user:info,
          table:table,
          }
        })
      }
        
      
      setUserState((prevState)=>{
        return{...prevState,
        isLoading:false}
      })
    }

    function balanceMessage(){
        const balance = userState.user.clubs[userState.club].balance

        if (balance < 0){
            //user owes money
            return "You owe: $" + Math.abs(balance)
        }else{
            //user has money or owes no money
            return "You have: $" + Math.abs(balance)
        }
    }

    function changeClub(event){
      //update table and selector
        const table = getTableElement(false,userState.user,event.target.value)
        setUserState((prevState)=>{
          return{...prevState,
          club:event.target.value,
          table:table}
        })
        console.log("club changed to "+event.target.value)
        
    }

    function getDebtPayed(){
      let netDebt  = 0
      let netPay = 0
      for (let row of userState.user.clubs[userState.club].transactions){
        if(row.amount <= 0 ){
          netDebt += row.amount
        }else{
          netPay += row.amount
        }
      }
      console.log(netDebt)
      console.log(netPay)


      if(netPay >= Math.abs(netDebt)){
        return  Math.abs(netDebt)
      }else{
        return  Math.abs(netPay)
      }

        
    }

    function closeUser(){
      props.setPage("ClubDashboard")
    }

    return (
        <Stack >
          <Stack direction='row' justifyContent="space-evenly" sx={{pt: 1}}>
            { viewMode !== 0 && <CyanButton style={{
                border:"transparent", boxShadow:"none"
              }}  onClick={baseMode} >History</CyanButton>}
            { viewMode !== 1 && <CyanButton style={{
                border:"transparent", boxShadow:"none"
              }} onClick={creditMode} >Summary</CyanButton>}
            { viewMode !== 2 && props.isExec && <CyanButton style={{
                border:"transparent", boxShadow:"none"
              }} onClick={transactionMode} >New Transaction</CyanButton>}
            { !props.isExec && <WhiteButton style={{
                border:"transparent", boxShadow:"none"
              }} onClick = {props.logout} >Logout</WhiteButton> }
            { props.isExec && <WhiteButton style={{
                border:"transparent", boxShadow:"none"
              }} onClick = {closeUser} >Close</WhiteButton>}
          </Stack>
            <Typography variant = "h1">{userState.user.name}</Typography>
            { !userState.isLoading &&
              <Stack>
                {viewMode === 1 && renderCredit()}
                {(viewMode === 0 ||viewMode === 1 )&&  renderBase()}
                
                {viewMode === 2 && renderTransaction()}
                {/* <Typography variant = "p">For</Typography> */}
              </Stack>
            }
            {userState.isLoading && <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
              <LinearProgress color="inherit" />
            </Stack>}
            {viewMode === 0 && !userState.isLoading && userState.table}
            {/* Only show the add transaction if current user is an exec */}
        </Stack>
        
        
    )


}

export default UserProfile;