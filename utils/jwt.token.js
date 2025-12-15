import jwt from "jsonwebtoken";


const generatetoken = (payload)=>{
            return jwt.sign(payload,process.env.JWT_SECRET_KEY,{expiresIn:process.env.JWT_EXPIRES});
             
            
}


export default generatetoken