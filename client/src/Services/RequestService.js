let path = process.env.REACT_APP_SERVER || 'http://localhost:8000/api/v1'

function headerCorsSetup(headers) {
  headers['Origin'] = path
  // headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin';
  // headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS, PUT, PATCH, DELETE';
  // headers['Access-Control-Max-Age'] = '8640';
}

//Helper Functions
function wait(time) {
  return new Promise(function(resolve, reject) {
      setTimeout(resolve, time);
  })
}
function printResponse(res){
  res.json()
  .then((body)=>{
    console.log(body)
  })
}
async function getResponse(res){
  let response
  await res.json()
  .then((body)=>{
    response = body
  })
  return response
}


//Exported functions
export const RequestService = {
    template: ()=>{
      //The method...

      //TEST RETURN
    },
    //App.js Requests
    testRequest: ()=>{
        // fetch(path + "/test-json",{method:"POST",body:{
        //     name: 'test-name',
        //     attribute1: 'test-att'
        //   }})
        //   .then((res)=>{
        //     console.log(res)
        //   }).catch(()=>{
        //     console.log("request failed")
        //   })
    },
 
    userRequest:async (ccid,clubid = null)=>{
        //Gets user transactions for the specified club
        //or all clubs if 'clubs' is left empty
        //name is also returned
        //In the form:
          // { name: ,
          //     clubs: {
          //         clubName1:{
          //             transactions:{
          //                 date: ,
          //                 amount:
          //             },
          //             balance:
          //         }
          //     } }
  

        console.log("getting transactions for "+ ccid +"with club id "+clubid)

        let transactions 
        let headers
        if(clubid == null){
          //get all transactions
          headers = {ccid:ccid}
        }else{
          //specific club
          headers = {ccid:ccid, clubid:clubid}
        }
        headerCorsSetup(headers)
        console.log(headers)
        let rawTransactions
        await fetch(path + "/transactions", {
          mode: 'cors',
          headers:headers})
        .then((res)=>{
          console.log("Server request Success.")
          rawTransactions = res
        }).catch(()=>{
          console.log("Server request failed.")
          //TODO throw an error here
        })
       
        transactions = (await getResponse(rawTransactions)).body
        if (Object.keys(transactions.clubs).length === 0){
          //no transaction history
          transactions.clubs = {"No Transactions":{transactions:[{date:"",Amount:""}],balance:0}}
        }
        

        return transactions
    },
    //AddTransaction
    newTransaction: async (ccid, amount, clubid, token,execCcid)=>{
        //add transaction. Return balance for succ, null for fail
        let status
        let headers = { "Content-type": "application/json" };
        headerCorsSetup(headers);
        await fetch(path+"/transaction",
                {mode: 'cors',
                    method:"POST", headers:headers,body:JSON.stringify({
                    ccid:ccid,
                    clubid:clubid,
                    amount:amount,
                    token:token,
                    exec:execCcid
                })})
        .then((res)=>{
          console.log("Transaction Creation for "+amount+" Succ")
          status = res
        }).catch(()=>{
          console.log("Transaction Creation Failure")
            return null
        })

        status = (await getResponse(status)).status;

        return (status)
    },
    //ClubDashboard.js
    clubRequest:async (clubid,token)=>{

      let resp;
      let body;
      let headers = { "Content-type": "application/json" };
      headerCorsSetup(headers);
      await fetch(path+"/club",
      {
        mode: 'cors',
        method:"POST", 
        headers: headers,
        body:JSON.stringify({'clubid':clubid,'token':token})                          
      }).then((res)=>{ 
        console.log("Club request success.")
        resp = res
      }).catch(()=>{
        console.log("Club request Failed.")
        //Dummy Data
        return([{name:'Failed Request', ccid:"adp",transactions:"23, +123, 23 ..."}])
      })

      await resp.json().then((Jres)=>{
        console.log(Jres.body)
        body = Jres.body
      })

      return body;
    },
    //UserProfile.js
    getUserCleaned: async (ccid)=>{
      //Returned a customer
      let response 
      let headers = { "Content-type": "application/json" };
      headerCorsSetup(headers);
      await fetch(path+"/get-user",{
        mode: 'cors',
        method: "POST",
        headers: headers,
        body:JSON.stringify({ccid:ccid})
      })
      .then((res)=>{
        response = res
        console.log("Get user details success")
      }).catch(()=>{
        console.log("Get user details failed")
      })
      response = await getResponse(response)
      return response.body
    },
    setSubscribed: async (ccid, subscribed, token)=>{
      //Returned a customer
      let response
      let headers = { "Content-type": "application/json" };
      headerCorsSetup(headers);
      await fetch(path+"/set-subscribed",{
        mode: 'cors',
        method: "POST",
        headers: headers,
        body:JSON.stringify({
            ccid: ccid,
            subscribed: subscribed,
            token: token
          }),
      })
      .then((res)=>{
        response = res
        console.log("Get user details success")
      }).catch(()=>{
        console.log("Get user details failed")
      })
      response = await getResponse(response)
      return response.body
    },
    allClubRequest:async (token)=>{

      let resp;
      let body;
      let headers = { "Content-type": "application/json" };
      headerCorsSetup(headers);

      await fetch(path+"/club",
      {
        mode: 'cors',
        method:"POST", 
        headers: headers,
        body:JSON.stringify({'clubid':-1,'token':token})                          
      }).then((res)=>{ 
        console.log("Club request success.")
        resp = res
      }).catch(()=>{
        console.log("Club request Failed.")
        //Dummy Data
        return([{name:'Failed Request', ccid:"adp",transactions:"23, +123, 23 ..."}])
      })

      await resp.json().then((Jres)=>{
        console.log(Jres.body)
        body = Jres.body
      })

      return body;
    },
    //Auth.js
    ccidCheckReq: async (ccid)=>{
      //The method returns -1 for no user found
      // 1 for exec and 0 for customer
      let status 
      let headers = {
        "Content-type": "application/json",
        "ccid": ccid
      };
      headerCorsSetup(headers);
      await fetch(path+"/check-ccid", {
        mode: 'cors',
        headers:headers
      })
      .then((res)=>{
        status = res
        console.log("Ccid Check Success")
        
      }).catch(()=>{
        console.log("Ccid Check Failed")
      })
      status = await getResponse(status)
      console.log(status)

      if(status.body == 0){
        //customer
        window.localStorage.setItem('customerCcid',ccid)
      }

      return status.body

    },
    getExecClubs: async (ccid)=>{
      //The method returns clubs an exec is an exec for
      let status 
      let headers = {
        "Content-type": "application/json",
        "ccid": ccid
      };
      headerCorsSetup(headers);

      await fetch(path + "/check-ccid", {
        mode: 'cors',
        headers:headers})
      .then((res)=>{
        status = res
        console.log("Exec club get succ")
        
      }).catch(()=>{
        console.log("Exec club get Failed")
      })
      status = await getResponse(status)
      console.log(status)

      // status.club

      return status.body

    },
    login: async (ccid,pw)=>{
      //The method...

      //Manual wait time to show we received their input
      await wait(1000)
      let headers = {
        "Content-type": "application/json"
      };
      headerCorsSetup(headers);

      let response
      await fetch(path+"/login", {
        mode: 'cors',
        method:'POST',
        headers: headers,
        body:JSON.stringify({ccid:ccid,password:pw})
      }).then((res)=>{
        response = res
        console.log("Ccid Check Success")
      }).catch(()=>{
        console.log("Ccid Check Failed")
      })
      let status = await getResponse(response)
      console.log('response', status)
      if(status.ccid !== -1){
        
        const userData =  {
          ccid:status.ccid,
          club:status.club,
          clubid:status.clubid,
          token:status.token,
          isExec: status.isExec}
        

        //store data locally
        const storage = window.localStorage

        storage.clear() //Logout any customer logged in
        storage.setItem('userCcid',ccid)
        storage.setItem('userClub',userData.club)
        storage.setItem('userClubid',userData.clubid)
        storage.setItem('token',userData.token)
        storage.setItem('userExpiry', Date.now()+2000000000)//30 days expiry

        if(userData.club == null ){
          storage.setItem('isExec', false)
        }else{
          storage.setItem('isExec',true)
        }
        
        return userData
      }else{
        return null
      }
      
    },
    addUser: async (ccid,full_name,password,token)=>{
      //The method returns 0 if succ 1 if fail

      let status
      let headers = {
        "Content-type": "application/json"
      };
      headerCorsSetup(headers);
      await fetch(path+"/user",
              {
                  mode: 'cors',
                  method:"POST", headers:headers,body:JSON.stringify({
                  ccid:ccid,
                  password:password,
                  full_name:full_name,
                  isexec:false,
                  foip:true, //may need to be changed later
                  token:token
              })})
      .then((res)=>{
        console.log("User Creation Succ")
        status = res
      }).catch(()=>{
        console.log("User Creation Failure")
          return null
      })

      status = (await getResponse(status)).status;

      return (status)

      //TEST RETURN
      return 0
    },
    addExec: async (ccid,full_name,password,clubid,token)=>{
      //The method returns 0 if succ -1 if fail

      let status
      let headers = {
        "Content-type": "application/json"
      };
      headerCorsSetup(headers);
      await fetch(path+"/user",
              {
                  mode: 'cors',
                  method:"POST", headers:headers,body:JSON.stringify({
                  ccid:ccid,
                  password:password,
                  clubid:clubid,
                  full_name:full_name,
                  isexec:true,
                  foip:true, //may need to be changed later
                  token:token
              })})
      .then((res)=>{
        console.log("Exec Creation Succ")
        status = res
      }).catch(()=>{
        console.log("Exec Creation Failure")
          return null
      })

      status = (await getResponse(status)).status;
      

      return (status)

    },
    emailResetPassword: async (ccid) => {
      console.log("attempting to send email...")
      let headers = {
        "Content-type": "application/json"
      };
      headerCorsSetup(headers);
      let res = await fetch(path + "/forgot-password",
        {
          mode: 'cors',
          headers:headers,
          method:"POST", 
            body: JSON.stringify({
                  ccid:ccid
                  })
          })
      return await getResponse(res)
    },
    resetPassword: async (code,newPass) =>{
      let headers = {
        "Content-type": "application/json"
      };
      headerCorsSetup(headers);
      let res = await fetch(path + "/email-reset",
          {
            mode: 'cors',
            headers:headers,
            method:"POST", 
            body: JSON.stringify({
                  code:code,
                  password:newPass
                  })
          })
      return await getResponse(res)
    },
    

}


