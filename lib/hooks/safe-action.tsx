import { createSafeActionClient, DEFAULT_SERVER_ERROR_MESSAGE } from "next-safe-action";
import { z } from "zod";
export const actionClient = createSafeActionClient({
    // Metadata is validated against this schema
    defineMetadataSchema(){
        return z.object(
          {  actionName:z.string()  }
        )
    },
    handleServerError(e,utils){
        const {clientInput,metadata}= utils;
        console.error("Action error: ",e);
        console.error("Metadata: ",{actionName: metadata?.actionName});
        console.error("Client Input: ",{clientInput});
        if(e.constructor.name==='DatabaseError')
            return 'Database Error: Your data did not save. Support will be notified';
        return DEFAULT_SERVER_ERROR_MESSAGE;
    }
});