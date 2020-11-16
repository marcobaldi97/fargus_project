const { json } = require('express');
const  {Pool, Client} = require('pg');

class dataBaseMediator{ 
    constructor (){
        let lastSelectDBResponse;
        let lastInsertDBResponse;
        const dbUser = 'postgres';
        const dbPassword = 'basedMaster97';
        const dbIp = 'localhost';
        const dbPort = 5432;
        const dbName = 'fargus_project_db';
        const connectionString = 'postgressql://'+dbUser+':'+dbPassword+'@'+dbIp+':'+dbPort+'/'+dbName;
        this.client = new Client({
            connectionString: connectionString
        });
        this.pool = new Pool({
            user: dbUser,
            password: dbPassword,
            host: dbIp,
            port: dbPort,
            database: dbName
        })
    }

    async executeSelectConsult(select_consult){
        try{
            const queryResponse = await this.pool.query(select_consult);
            this.lastSelectDBResponse = queryResponse.rows;
        }catch(error){
            console.log(error);
        }   
    }

    executeSelectConsultVersion2(select_consult){
        this.client
            .query('SELECT NOW() as now')
            .then(res => {
                console.log(res.rows);
                return res.rows;
            })
            .catch(e => console.error(e.stack)) 
            .finally();
    }

    async executeInsertConsult(insert_consult){
        try{
            const queryResponse = await this.pool.query(insert_consult);
            this.lastInsertDBResponse = queryResponse;
        }catch(error){
            console.log(error);
        }   
    }

    getLastSelectDBResponse(){
        return this.lastSelectDBResponse;
    }    

    getLastInsertDBResponse(){
        return this.lastInsertDBResponse;
    }
}//final clase

/*
let a = new dataBaseMediator();
let b = [];
b = a.executeSelectConsultVersion2;
for (i = 0; i < b.length; i++) {
    console.log('El id es: '+b[i].publication_id+' El contenido es:'+b[i].publication_content);
}
console.log('Wtf?');
*/


/*
try{ 
    (async () => {
        let a = new dataBaseMediator();
        let b = [];
        b = await a.executeSelectConsult('SELECT * FROM publications');
        console.log('↓↓↓↓↓↓ This is your response ↓↓↓↓↓↓');
        var i;
        for (i = 0; i < b.length; i++) {
            console.log('El id es: '+b[i].publication_id+' El contenido es:'+b[i].publication_content);
        }
        console.log('Wtf?');
    })()   
}catch(error){
    console.error(error);
}
*/

/* Attempt #1
try{ 
    (async () => {
        let a = new dataBaseMediator();
        await a.executeSelectConsult('SELECT * FROM publications');
        let b = a.getLastSelectDBResponse();
        console.log('↓↓↓↓↓↓ This is your response ↓↓↓↓↓↓');
        var i;
        for (i = 0; i < b.length; i++) {
            console.log('El id es: '+b[i].publication_id+' El contenido es:'+b[i].publication_content);
        }
    })()   
}catch(error){
    console.error(error);
}
*/
