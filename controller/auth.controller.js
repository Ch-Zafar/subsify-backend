import pool from "../db/connection.js";
import { createUserQuery } from "../models/userCreate.model.js";
import bcrypt from "bcryptjs";
import generatetoken from "../utils/jwt.token.js";

export const createUser = async (req, res) => {
    try {
        const { name, password, gmail, walletId } = req.body;
        const hashPassword = await bcrypt.hash(password, 10)
        const emailCheck = await pool.query('SELECT * FROM userinfo WHERE gmail = $1',[gmail])
        if(emailCheck.rows.length >0){
          return  res.status(400).json({message:'Email already in use!!'})
        }
        const result = await pool.query(createUserQuery, [name, hashPassword, gmail, walletId]);
        res.json({ message: "User created" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const userLogin = async (req, res) => {
    const { gmail, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM userInfo WHERE gmail=$1', [gmail]);
        if (result.rows.length === 0) {
            res.status(400).json({ message: "User not found!!" })
        }
        else {

            const user = result.rows[0];
            const isMatch = bcrypt.compare(password, user.password);
            if (!isMatch) {
                res.status(400).json({ message: "Password is incorrect" });
            }
            else {



                const token = generatetoken({ user })

                res.cookie("token", token, {
                    httpOnly: true,
                    secure: true,        // change to true in production with https
                    sameSite: "lax",
                    maxAge: 24 * 60 * 60 * 1000  // 1 day
                });

                 res.status(200).json({ message: "User found Login Successful!!" })

                // console.log("Login Sucessfull!!")

                // localStorage.setItem('token', token);


            }
        }


    }
    catch (error) {
        res.status(500).json({ error: error.message })

    }
}

export const profile = (req, res, ) => {
    res.status(200).json({user:req.user,isAuthenticated:true});


}


export const logout = (req, res) => {

    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,      // true in production (HTTPS)
            sameSite: "none",
            path: "/"   // or "lax" depending on setup
        });

        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    } catch (err) {
        return res.status(500).json({ message: "Logout failed" });
    }

}