import { db } from "./index"
import {migrate} from "drizzle-orm/neon-http/migrator"

const main = async()=>{
    try{
        // const hour= new Date().getHours();
        // if(hour >=9 && hour <=18)
        // {
        //     throw new Error('Cannot migrate during business hours');
        // }
        await migrate(db,{
            migrationsFolder:"app/drizzle/migrations"
        })
        console.log("migration successful");
    }
    catch(error)
    {
        console.log(error);
    }
}
main();