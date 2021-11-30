import AddTransaction from './AddTransaction'
import {useState,useEffect} from 'react'
import {Button, FormControl, MenuItem, LinearProgress, Select, InputLabel, Stack, Table, TableBody, TableCell,TableContainer,TableHead,TableRow,Paper,Typography} from '@mui/material'
import {RequestService} from "./Services/RequestService"


function UserProfile(props){
    // Show user information and allows transaction adding if the user is logged in
    const [user, setUser]  = useState({name:"",clubs:{"No Transactions":{transactions:[{date:"",Amount:""}],balance:0}}})
    const[isLoading,setIsLoading] = useState(false)

    const [club, setClub] = useState((Object.keys(user.clubs))[0])
    const [isExecView, setIsExecView] = useState(props.isExec)
    const [table,setTable] = useState("")
    
    //run on startup only
    useEffect(()=>{
      getUserInfo()
    },[])

    
    async function getUserInfo(){
      //sets user. If they have no transactions add a special row

      setIsLoading(true)

      let info
      await RequestService.userRequest(props.ccid)
      .then((res)=>{
        info = res
      })
      console.log(info.clubs)
      if (Object.keys(info.clubs).length === 0){
      
        //no transaction history
        info.clubs = {"No Transactions":{transactions:[{date:"",Amount:""}],balance:0}}
        
      }else{
        setUser(info)
      }
      setIsLoading(false)
    }


    //Table Logic
    function createData(date, amount) {
        return { date, amount };
    }
    useEffect(()=>{
      

      let keyHelper=0
      setTable(<TableContainer component={Paper}>
        <Table  aria-label="simple table">


            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell >Amount</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {user.clubs[club].transactions.map((row) => (
                <TableRow key={row.date+row.amount+keyHelper++} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                  <TableCell component="th" scope="row"> {row.date} </TableCell>
                  <TableCell >{row.amount}</TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
            
        </Table>
        </TableContainer>)
    },[user])
    
    
    
    

    function balanceMessage(){
        const balance = user.clubs[club].balance

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
            <Typography variant = "h1">{user.name}</Typography>
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
                    {[...(Object.keys(user.clubs))].map( clubName => <MenuItem key = {clubName} value={clubName}>{clubName}</MenuItem>)}
                </Select>
            </FormControl>
            {isLoading && <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
              <LinearProgress color="inherit" />
            </Stack>}
            {table}


            {isExecView && <AddTransaction refresh = {getUserInfo}></AddTransaction>}
            {/* Only show the add transaction if current user is an exec */}
        </Stack>
        
        
    )


}

export default UserProfile;