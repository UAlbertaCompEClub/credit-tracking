import {FormControl, Input, InputLabel, FormHelperText} from '@mui/material/

function AuthComponent(){
    return 
     <FormControl onSubmit = {authenticate}>
        {/* on ccid submit, if ccid is associated with an exec,
        prompt for password. */}

        {/* Exec and customer ccid */}
        <InputLabel htmlFor = "ccid">ccid</InputLabel>
        <Input id = "ccid" />
        <FormHelperText id = "ccidHelperText">For customers and execs</FormHelperText>
    
        {/* Exec Password */}
        <InputLabel htmlFor = "password">Password</InputLabel>
        <Input id = "password" />
        <FormHelperText id = "passwordHelperText">Please enter your password</FormHelperText>
    </FormControl>
    
}

function authenticate()

export default AuthComponent