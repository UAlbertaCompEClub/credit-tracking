import {Button, FormControl, Input, InputLabel, Container, FormHelperText,Stack, Table, TableBody, TableCell,TableContainer,TableHead,TableRow,Paper,Typography} from '@mui/material'
import {useState} from 'react'

function ClubDashboard(){

    const [clubName, setClubName] = useState("PlaceHolder Club")
    const [ccid, setCcid] = useState("")

    //Table Logic
    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
      }
      
    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0,),
      ];
    const table = <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell align="right">Transactions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow
            key={row.name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row.name}
            </TableCell>
            <TableCell align="right">{row.calories}</TableCell>
            <TableCell align="right">{row.fat}</TableCell>
            <TableCell align="right">{row.carbs}</TableCell>
            <TableCell align="right">{row.protein}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      </Table>
     </TableContainer>






    return(
        <Stack onCellClick = {handleCellClick}>
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

    function handleCellClick(row,col,event){
        console.log(row)
    }
}

export default ClubDashboard;