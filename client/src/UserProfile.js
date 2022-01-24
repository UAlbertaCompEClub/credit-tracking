import AddTransaction from './AddTransaction'
import {useState,useEffect} from 'react'
import {Button, FormControl, MenuItem, LinearProgress, Select, InputLabel, Stack, Table, TableBody, TableCell,TableContainer,TableHead,TableRow,Paper,Typography} from '@mui/material'
import {RequestService} from "./Services/RequestService"


function UserProfile(props){
    // Show user information and allows transaction adding if the user is logged in

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
      }else if( clubExplicit == null){
        club = userState.club
      }else{
        club = clubExplicit
      }


      const table = 
      (<TableContainer component={Paper}>
        <Table  aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell >Amount</TableCell>
                <TableCell >Approved by</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {info.clubs[club].transactions.map((row) => (
                <TableRow key={row.date+row.amount+keyHelper++} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
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
      if(props.isExec){
        await RequestService.userRequest(props.customerCcid,props.user.clubid)
        .then((res)=>{
          info = res
        })
      }else{
        await RequestService.userRequest(props.customerCcid)
        .then((res)=>{
          info = res
        })
      }
      console.log(info)
      const table = getTableElement(isFirstTime,info)


      if(isFirstTime){
        setUserState((prevState)=>{
          return{...prevState,
          user:info,
          table:table,
          club:(Object.keys(info.clubs))[0]
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
          <Stack direction='row' justifyContent="space-evenly">
            <Button onClick = {props.logout} >Logout</Button>
            { props.isExec && <Button onClick = {closeUser} >Close</Button>}
          </Stack>
            {!userState.isLoading && <Stack>
                <Typography variant = "h1">{userState.user.name}</Typography>
                <Typography variant = "h2">{balanceMessage()}</Typography>
                {props.isExec && <Typography variant = "h4">Debt payed back: {getDebtPayed()}</Typography>}
                <Typography variant = "p">For</Typography>
                
                <FormControl>
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
            }
            {userState.isLoading && <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
              <LinearProgress color="inherit" />
            </Stack>}
            {!userState.isLoading && userState.table}


            {props.isExec && <AddTransaction customerCcid = {props.customerCcid} user = {props.user} refresh = {getUserInfo}></AddTransaction>}
            {/* Only show the add transaction if current user is an exec */}
        </Stack>
        
        
    )


}

export default UserProfile;