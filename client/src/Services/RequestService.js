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

        console.log("getting transactions for "+ ccid +"with club id "+clubid)

        let headers
        if(clubid == null){
          //get all transactions
          headers = {ccid:ccid}
        }else{
          //specific club
          headers = {ccid:ccid, clubid:clubid}

          fetch(path + "/transactions",{headers:headers})
          .then((res)=>{
            console.log("Server request Success.")
            printResponse(res)
          }).catch(()=>{
            console.log("Server request failed.")
          })

        }
        
        fetch(path + "/clubBalance")
          .then((res)=>{
            console.log("Server request Success.")
            printResponse(res)
          }).catch(()=>{
            console.log("Server request failed.")
          })

        // create all club data
        // function createAllClubs(){
        //   console.log("Recomputed totals")
        //   let trans = []
        //   let total = 0
        //   for( let club in user.clubs){
        //     total += user.clubs[club].balance
        //     trans = trans.concat(user.clubs[club].transactions)
        //     console.log(total)
        //   }
        //   setUser((prev)=>{
        //     return{
        //       ...prev,
        //       clubs:
        //       { ...prev.clubs, "All Clubs":{
        //         transactions: trans,
        //         balance: total
        //         }
        //       }
        //     }
        //   })
             
        
      
        //TEST RETURN
        await wait(1000)
        return {
            name:'Bobby',
            clubs: {"CompE":{transactions:[{date:"Today",amount:20}],balance:20}}
        }
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

      //TEST RETURN
      if(ccid =='exec'){
        return 1
      }else if(ccid == 'customer'){
        return 0
      }else{
        return -1
      }
    },
    execLogin: async (ccid,pw)=>{
      //The method...

      //TEST RETURN
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


