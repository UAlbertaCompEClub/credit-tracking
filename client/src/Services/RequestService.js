let path = process.env.REACT_APP_SERVER

function createData(date, amount) {
  return { date, amount };
}

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
    userRequest: (ccid,clubs)=>{
        //Gets user transactions for the specified clubs 
        //or all clubs if 'clubs' is left empty

      
        //fetch(path + "/test-json?ccid="+ccid)
        //.then(()=>{

        // })

        //TEST RETURN
        return {
            name:'Bobby',
            clubs: {
                club1:{
                  transactions:  [
                    createData('Nov 1 2021', "Payed $5" ),
                    createData('Dec 2 2020', "Billed $1"),
                    createData('Mar 20 2019', "Payed $5"),
                    createData('Jan 1 2001', "Billed $20"),
                    createData('Dec 4 1985', "Payed $20"),
                  ],
                  balance: 50
                }
               ,
                club2:{
                  transactions:  [
                    createData('Nov 1 2021', "Billed $5" ),
                    createData('Dec 2 2020', "Billed $1"),
                    createData('Mar 20 2019', "Billed $5"),
                    createData('Jan 1 2001', "Billed $20"),
                    createData('Dec 4 1985', "Billed $20"),
                  ],
                  balance: -20
                }}
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
    clubRequest: ()=>{
      //The method...
      function createData(name, ccid, transactions) {
        return { name, ccid, transactions };
      }

      //TEST RETURN
      return[
          createData('Barry', "bsda", "+1, -20, +5 ..." ),
          createData('Daryl',"bsda","+1, -20, +5 ..."),
          createData('Charlotte',"bsda", "+1, -20, +5 ..."),
          createData('Amelia',"bsda","+1, -20, +5 ..."),
          createData('Bingus', "bsda","+1, -20, +5 ..."),
      ]
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

}


