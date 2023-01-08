const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const {Web3Storage} = require('web3.storage')
const {getFilesFromPath} = require('web3.storage')
const fs = require('fs')

const cors_white_list = ["http://localhost:3000/", "http://localhost:3000","http://localhost:3001/","http://localhost:3001","http://localhost:3002/","http://localhost:3002","http://localhost:3003/","http://localhost:3003",,"http://localhost:3004/","http://localhost:3004"];

function getAccessToken (user) {

    if(user ==='u1'){
        return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDJmMzZiOTVGZTY3YzI2QTZEY0ExMzZkNTQ0Mjk2OWJEOWVlZkE5ODEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjY4MDcwMzAxNDAsIm5hbWUiOiJtZW1lIn0.pYkvLTLy6YiZwVeovTWYQZodui2kjiT2LZr44Tjmkd8'
    }

    else if(user === 'u2'){

        return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDJmMzZiOTVGZTY3YzI2QTZEY0ExMzZkNTQ0Mjk2OWJEOWVlZkE5ODEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzEyMTQxOTczNDIsIm5hbWUiOiJ0b2tlbjIifQ.9hHaQYQvmTqDMlLUbwvgyAwFqC2-IVLky6AkqzFbhx8'

    }

    else if (user==='u3'){

        return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDJmMzZiOTVGZTY3YzI2QTZEY0ExMzZkNTQ0Mjk2OWJEOWVlZkE5ODEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzEyMTQzMzcwMjUsIm5hbWUiOiJ0b2tlbjMifQ.jDBBlIO5Z82DPgHjVf5Hq0ADh-UxdFtKZ-FGjet66eU'

    }

    else {
        return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDJmMzZiOTVGZTY3YzI2QTZEY0ExMzZkNTQ0Mjk2OWJEOWVlZkE5ODEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzEyMTQ0OTY0MzgsIm5hbWUiOiJ0b2tlbjQifQ.xerlcg5weL71Tt9EA9kqjBtWeRMZtCC0rfmOsH0RcHM'
    }
    
  
}

function makeStorageClient (user) {
    return new Web3Storage({ token: getAccessToken(user) })
}

async function storeFiles (files,user) {
    const client = makeStorageClient(user)


    try {

        const cid = await client.put(files)

        console.log('stored files with :', cid)

        if (typeof localStorage === "undefined" || localStorage === null) {
            var LocalStorage = require('node-localstorage').LocalStorage;
            localStorage = new LocalStorage('./scratch');
          }
    
        const id = user
        
        localStorage.setItem(id, cid);


    } catch(error){
        console.log(error)
    }

}

async function getFiles (path,user) {

    const files = await getFilesFromPath(path)
    console.log(`read ${files.length} file(s) from ${path}`)
    const cid = await storeFiles(files,user)
    return cid
}

app.use(cors({
    origin:cors_white_list,
    credentials:false,
  }))

  app.use(express.urlencoded({ extended: true }))
  app.use(bodyParser.json());

// app.get("/api",(req,res)=>{ 
//     res.json({"users" : ["user1","user2","user3"]})

// })

app.post("/do",(req,res)=>{


    // if (typeof localStorage === "undefined" || localStorage === null) {
    //     var LocalStorage = require('node-localstorage').LocalStorage;
    //     localStorage = new LocalStorage('./scratch');
    //   }

    //   var data = []

    //   data.push(req.body.name);
    //   data.push(req.body.date)
    //   data.push(req.body.id)
    //   data.push(req.body.status)
      
    //   localStorage.setItem(req.body.link, data);
    console.log(req.body)

      // id-> transaction hash
      // link -> aadhar number
    
})

app.get("/gethashu1",(req,res) =>{


    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');

    const hash = localStorage.getItem('u1')

    res.json({"hash":hash})


})

app.get("/gethashu2",(req,res) =>{


    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');

    const hash = localStorage.getItem('u2')

    res.json({"hash":hash})


})

app.get("/gethashu3",(req,res) =>{

    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');

    const hash = localStorage.getItem('u3')

    res.json({"hash":hash})

})

app.get("/gethashu4",(req,res) =>{


    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');

    const hash = localStorage.getItem('u4')

    res.json({"hash":hash})


})



app.get("/getRequests",(req,res) =>{

    const arr = {};

    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');

    for(var i = 0; i<localStorage.length;i++){

        k = localStorage.key(i)
        if(k.length>2){
            arr[k] = localStorage.getItem(k)
        }
        
    }

    res.json(arr)


})




app.post("/verifyStatus",(req,res)=>{




    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
    }

    const id = req.body.id

    var data = localStorage.getItem(id)

    const arr = data.split(",")

    arr[3]=req.body.status
    localStorage.setItem(req.body.id, arr);

})

app.post("/addipfs",(req,res)=>{



    const user = req.body.user;


    const path  = 'files/' + user;

    const cid = getFiles(path,user)
    


      
    
})

//https://bafybeiav5m7543cxuiebrdwqidlhfpgl7azixrhllm5sl7p467w265v654.ipfs.w3s.link/

app.listen(5000, ()=>{
    console.log("server is running")
})
