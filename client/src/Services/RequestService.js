let path = process.env.REACT_APP_SERVER

function createData(date, amount) {
  return { date, amount };
}
function wait(time) {
  return new Promise(function(resolve, reject) {

      // Setting 2000 ms time
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
// function getBody(res){
//   res.json((body)=>{
//     return body
//   })
// }

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
    newTransaction: async (ccid, amount, token)=>{
        //add transaction. Return balance for succ, null for fail
        // fetch(path+"/transaction",
        //         {method:"post",body:{
        //             ccid:ccid,amount:amount,token:token
        //         }})
        // .then((res)=>{
        //     let response
        //     res.json().then((body)=>[
        //         response = body
        //     ])
        //     if(body){ //TODO place condition
        //         return body
        //     }else{
        //         return null
        //     }
        // }).catch(()=>{
        //     return null
        // })

        //Test return
        return (amount)
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
      //The method...
      // let status = "Default"
      // await fetch(path+"/checkCcid", {headers:{ccid:ccid}})
      // .then((res)=>{
      //   status = res
      //   console.log("Ccid Check Success")
      // }).catch(()=>{
      //   console.log("Ccid Check Failed")
      // })
      // status = await getResponse(status)
      // console.log(status)
      // return status

      return 1

    },
    execLogin: async (ccid,pw)=>{
      //The method...


      let response
      await fetch(path+"/login", {method:'POST',headers:{ccid:ccid,password:pw}})
      .then((res)=>{
        response = res
        console.log("Ccid Check Success")
      }).catch(()=>{
        console.log("Ccid Check Failed")
      })
      let status = await getResponse(response)
      console.log(status.ccid)
      if(status.ccid !== -1){
        return {
          ccid:status.ccid,
          club:status.club,
          clubid:status.club,
          token:status.token}
      }else{
        return null
      }
      

      if(ccid =='exec' && pw == 'password'){
        return {ccid:ccid,token:"loggedInToken", club:"Computer Engineering"}
      }else{
        return null
      }
      
    },
    addUser: async (ccid,name)=>{
      //The method returns 0 if succ 1 if fail

      //TEST RETURN
      return 0
    },
    addExec: async (ccid,name,password)=>{
      //The method returns 0 if succ 1 if fail

      //TEST RETURN
      return 0
    }

}


