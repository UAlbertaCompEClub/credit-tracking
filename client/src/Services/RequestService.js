let path = process.env.REACT_APP_SERVER

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
        console.log(headers)
        let rawTransactions
        await fetch(path + "/transactions",{headers:headers})
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
    newTransaction: async (ccid, amount, clubid, token)=>{
        //add transaction. Return balance for succ, null for fail
        let status
        await fetch(path+"/transaction",
                {method:"POST", headers:{"Content-type":"application/json"},body:JSON.stringify({
                    ccid:ccid,
                    clubid:clubid,
                    amount:amount,
                    token:token
                })})
        .then((res)=>{
          console.log("Transaction Creation Succ")
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

      await fetch(path+"/club", {method:"get", headers:{'clubid':clubid,'token':token}})
      .then((res)=>{ 
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
      let status = "Default"
      await fetch(path+"/check-ccid", {headers:{ccid:ccid}})
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
    execLogin: async (ccid,pw)=>{
      //The method...

      //Manual wait time to show we received their input
      await wait(1000)

      let response
      await fetch(path+"/login", {method:'POST',headers:{ccid:ccid,password:pw}})
      .then((res)=>{
        response = res
        console.log("Ccid Check Success")
      }).catch(()=>{
        console.log("Ccid Check Failed")
      })
      let status = await getResponse(response)
      if(status.ccid !== -1){
        const execData =  {
          ccid:status.ccid,
          club:status.club,
          clubid:status.clubid,
          token:status.token}
        console.log(execData)

        //store data locally
        const storage = window.localStorage

        storage.clear() //Logout any customer logged in
        storage.setItem('execCcid',execData.ccid)
        storage.setItem('execClub',execData.club)
        storage.setItem('execClubid',execData.clubid)
        storage.setItem('execToken',execData.token)
        storage.setItem('execExpiry', Date.now()+2592000)//30 days expiry
        
        return execData
      }else{
        return null
      }
      
    },
    addUser: async (ccid,full_name,token)=>{
      //The method returns 0 if succ 1 if fail

      let status
      await fetch(path+"/user",
              {method:"POST", headers:{"Content-type":"application/json"},body:JSON.stringify({
                  ccid:ccid,
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
      await fetch(path+"/user",
              {method:"POST", headers:{"Content-type":"application/json"},body:JSON.stringify({
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

    }

}


