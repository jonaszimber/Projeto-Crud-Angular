// importar modulos
const express = require('express'); 
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app =express();

app.use(cors()); 
app.use(bodyparser.json());


// Conexão com banco de dados
const db = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'simpledb',
        port:3306
});

// Verificando conexão com banco de dados

db.connect(err=>{
    if(err) {console.log('dberro');}
    console.log('databse connected...');
     
})


// GET - Pegar todas informações

app.get('/user',(req,res)=>{

    let qr = `select * from user`;
    db.query(qr,(err,result)=>{
        if(err)
        {
            console.log(err,'errs');
        }
        if(result.length>0)
        {
            res.send({
                message:'all user data',
                data:result
            })
        }
    });

});

// GET - Pegar informação por chave primária

app.get('/user/:id',(req,res)=>{

    let gID = req.params.id;

    let qr = `select * from user where id = ${gID}`; 

    db.query(qr, (err,result)=> {

        if(err) {console.log(err);}

        if(result.length>0)
        {
            res.send({
                message:'get single data ',
                data:result
            })
        }
        else
        {
            res.send({
                message:'Dados não encontrados!'
            });
        }
    });
    



});


// POST - Criar dados

app.post('/user',(req,res)=>{

        console.log(req.body,'createdata');

        let fullName = req.body.fullname;
        let eMail = req.body.email;
        let mb = req.body.mobile;
        let databorn = req.body.databorn;
        let adress = req.body.adress;
        let city = req.body.city;
        let state = req.body.state;
        let cep = req.body.cep;
        let marital = req.body.marital;
        let car = req.body.car;


        let qr = `insert into user(fullname,email,mobile,databorn,adress,city,state,cep,marital,car)
                    values('${fullName}','${eMail}','${mb}','${databorn}','${adress}','${city}','${state}','${cep}','${marital}','${car}')`;
    console.log(qr,'qr')
        db.query(qr,(err,result)=>{
            
                if(err){console.log(err);}
                console.log(result,'result')
                res.send({
                    message:'Dados Criados'
                });
        });
});





// PUT - Atualizar dados 

app.put('/user/:id',(req,res)=>{

    console.log(req.body,'updatedata');


    let gID = req.params.id;
    let fullName = req.body.fullname;
    let eMail = req.body.email;
    let mb = req.body.mobile;
    let databorn = req.body.databorn;
    let adress = req.body.adress;
    let city = req.body.city;
    let state = req.body.state;
    let cep = req.body.cep;
    let marital = req.body.marital;
    let car = req.body.car; 

    let qr = `update user set fullname = '${fullName}', email = '${eMail}', mobile = '${mb}', databorn = '${databorn}', adress = '${adress}', city = '${city}', state = '${state}', cep = '${cep}', marital = '${marital}', car = '${car}' 
                where id = ${gID}`;

    db.query(qr,(err,result)=>{
            
            if(err) {console.log(err);}

             res.send({
                message:'Dados Atualizados!'
            });    
    });

});


// DELETE - Apagar dados

app.delete('/user/:id',(req,res)=>{

        let qID = req.params.id;

        let qr = `delete from user where id = '${qID}' `;
        db.query(qr,(err,result)=>{
                if(err) {console.log(err);}
                
                res.send(
                    {
                        message:'Dados apagados!'
                    }
                )
        });

});

//Porta que a aplicação irá responder
app.listen(3000,()=>{
    console.log('server running');
});