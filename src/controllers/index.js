import { connectDb } from "../services";

export const logout = (req,res) => {
      async function blacklist () {
        let preparedQuery = "insert into blacklist (expired_tokens) values ($1)";
        let queryParams = [req.token];
        try{
         let outcome = await connectDb(preparedQuery,queryParams,req.action);
            res.status(200).json({
                message: outcome+" successfully"
            });
        }catch(e){
            res.status(400).json({
                error: +e
            });
        }
    }
    blacklist();

}