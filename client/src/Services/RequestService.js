let path = process.env.REACT_APP_SERVER

function createData(date, amount) {
  return { date, amount };
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
        fetch(path + "/test-json",{method:"POST",body:{
            name: 'test-name',
            attribute1: 'test-att'
          }})
          .then((res)=>{
            console.log(res)
          }).catch(()=>{
            console.log("request failed")
          })
    },
    userRequest: (ccid,club = null)=>{
        //Gets user transactions for the specified club
        //or all clubs if 'clubs' is left empty

        let headers
        if(club){
          //get all transactions
          headers = {ccid:ccid}
        }else{
          //specific club
          headers = {ccid:ccid, club:club}
        }

        fetch(path + "/transactions")
        .then((res)=>{
          console.log("Server request Success.")
          printResponse(res)
        }).catch(()=>{
          console.log("Server request failed.")
        })

        //TEST RETURN
        return {
            name:'Bobby',
            clubs: {}
        }
    },
    //AddTransaction
    newTransaction: (ccid, amount, token)=>{
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
    clubRequest:(club,token)=>{
      console.log(club)

      fetch(path+"/club", {method:"get", headers:{'club':club,'token':token}})
      .then((res)=>{ 
        console.log("Club request success.")
        res.json().then((res)=>{
          console.log(res)
        })
      }).catch(()=>{
        console.log("Club request Failed.")
      })

      return([{name:'bobby', ccid:"adp",transactions:"23, +123, 23 ..."}])
    },
    //Auth.js
    ccidCheckReq: (ccid)=>{
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
    execLogin: (ccid,pw)=>{
      //The method...

      //TEST RETURN
      if(ccid =='exec' && pw == 'password'){
        return {ccid:ccid,token:"loggedInToken", club:"Computer Engineering"}
      }else{
        return null
      }
      
    },
    addUser: (ccid,name)=>{
      //The method returns 0 if succ 1 if fail

      //TEST RETURN
      return 0
    },
    addExec: (ccid,name,password)=>{
      //The method returns 0 if succ 1 if fail

      //TEST RETURN
      return 0
    }

}


