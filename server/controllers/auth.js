
import bcrypt from 'bcrypt';
import pool from '../connect_db.js';
import { v4 as uuidv4 } from 'uuid';

const signUp = async(req,res) =>{ 
    try{
        console.log(req.body);
        const user = req.body;
        console.log(user);
        if(!user.username || !user.email || !user.password){
            return res.status(400).json({message: 'Please fill in all fields'});
        }
        const existingUser = await pool.query("SELECT email FROM users WHERE email = $1",[user.email]);
        
        if(existingUser.rowCount > 0){
            return res.status(400).json({loggedIn:false,message:"User already exists"});
        }
        else{
            const salt = await bcrypt.genSalt();
            const passwordHashed = await bcrypt.hash(user.password,salt);
            console.log("Password hashed: ",passwordHashed);
            await pool.query("INSERT INTO users (username,email,pass_word,socket_id) VALUES ($1,$2,$3,$4)",[user.username,user.email,passwordHashed,uuidv4()]);
            //Try the same logic with returning clause later
            const insertedRow = await pool.query("SELECT * FROM users WHERE email = $1 ",[user.email]);
            if(insertedRow.rowCount> 0){
                const newUser = insertedRow.rows[0];
                delete newUser.pass_word;
                req.session.user = newUser;
                return res.status(201).json({loggedIn:true,user:{...newUser},message:"User created successfully"});
            }
            else{
                return res.status(500).json({loggedIn:false,message:"User not created successfully"});
            }
         }
    }
    catch(error){
        res.status(500).json({loggedIn:false,message: error.message})
    }
}

const logIn = async(req,res) => {
    try{
        const user = req.body;
        console.log(user);
        if(!user.email || !user.password){
            console.log("Please fill in all fields");
            return res.status(400).json({message: 'Please fill in all fields'});
            
        }
        else{
            console.log("User filled in all fields");
            const existingUser = await pool.query("SELECT * FROM users WHERE email = $1",[user.email]);
            
            console.log(existingUser.rowCount === 0);  
            if(existingUser.rowCount === 0){
                return res.status(404).json({loggedIn:false,message: 'User does not exist'});
                
            }
            console.log(user);
            console.log(existingUser.rows[0]);    
      
            const isPasswordCorrect = await bcrypt.compare(user.password,existingUser.rows[0].pass_word);
            console.log("Password Correct: ");
            console.log(isPasswordCorrect);

            if(!isPasswordCorrect){
                console.log("here");
                return res.status(400).json({loggedIn:false,message: 'Incorrect Password'});
            }
            
            const authenticatedUser = existingUser.rows[0];
            delete authenticatedUser.pass_word;
            req.session.user = authenticatedUser;
            console.log("Authenticated User: ");
            console.log(authenticatedUser);
            return res.status(200).json({loggedIn:true,user:{...authenticatedUser},message: 'Logged in successfully'});

        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({loggedIn:false,message: error.message});
    }
}

export { signUp, logIn };