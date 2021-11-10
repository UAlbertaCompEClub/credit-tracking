import {Button, FormControl, Input, InputLabel, Container, FormHelperText,Stack, Table, TableBody, TableCell,TableContainer,TableHead,TableRow,Paper,Typography} from '@mui/material'
import {useState} from 'react'

function ClubDashboard(props){

    const [clubName, setClubName] = useState("Club Name")
    const [ccid, setCcid] = useState("")

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
      
    const rows = [
        createData('Barry', "bsda", "+1, -20, +5 ..." ),
        createData('Daryl',"bsda","+1, -20, +5 ..."),
        createData('Charlotte',"bsda", "+1, -20, +5 ..."),
        createData('Amelia',"bsda","+1, -20, +5 ..."),
        createData('Bingus', "bsda","+1, -20, +5 ..."),
    ];
    


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
        {rows.map((row) => (
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
            <Button onClick = {props.logout} >Logout</Button>
            <Typography variant = "h1">{clubName}</Typography>

            <Stack direction = "row" justifyContent = "space-between" width = "100%">
                <Stack  direction = "row">
                    <FormControl>
                        <InputLabel htmlFor = "ccid">ccid</InputLabel>
                        <Input id = "ccid" value = {ccid} onChange = {(e) => setCcid(e.target.value)} />
                        <FormHelperText id = "ccidHelperText">For customers and Execs</FormHelperText>
                    
                    </FormControl>
                    <Button>Search</Button>
                </Stack >
                

                <Button> Add Customer</Button>
            </Stack>

            {table}

        </Stack>

    );


}

export default ClubDashboard;