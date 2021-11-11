NOTE THAT NPM START WILL START THE SERVER ON PORT 3001 NOT 3000

API calls:

Auth Component

    check user
        Type: GET
        Inputs: querystring with ccid=ccidValue
        Return: 1 for if ccid is EXEC, 0 if customer, -1 if not registered
        Endpoint: domain.com/checkUser

    loginCustomer
        Type: GET
        Inputs: query string with ccid=ccidValue
        Return: Transaction history of user, user name, user balances
        (Format currently unkown,needs to be seperated by club)
        Endpoint: domain.com/loginCustomer

    loginExec
        Type: GET
        Inputs: object in body with {ccid:value, password:value}
        Return: Token and expiration time milliseconds
        Endpoint: domain.com/loginExec

ClubDashboard component

    USER (GET)
        //For returning customer Data
        Type: GET
        Inputs: querystring with club=clubName, token=ExecToken, search=ccidToSearchBY
        Return: Transaction history of user (per club), user name, user balances (per club) of searched ccid. (Format currently unkown,needs to be seperated by club)
        If ccid = "" return all names of customers paired with a string containing the first three transactions followed by ...(ex: "+1.75 -10 +5.5 ...")
        Endpoint: domain.com/user
        NOTE: The Exec token should be used to ensure the EXEC has access to this club's records.

    USER (post) 
        //For creating a customer 
        Type: POST
        Inputs: object with {ccid:ccid, name:name, token:execToken}
        Return: -1 if failed, 0 if succesful
        Endpoint: domain.com/user
        NOTE: use the exec token to verify that the EXEC has permission to add users

Transaction Component

    USER (Put)
        //for adding a transaction
        Type:Put
        Inputs: object with{amount:transactionAmount,ccid:customerccid,token:ExecToken}
        Return: -1 if failed, 0 if success
        Endpoint: domain.com/user
        NOTE: use the exec token to verify that the EXEC has permission to add
        transactions to that specific CLUB AND USER.

