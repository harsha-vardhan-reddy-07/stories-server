import Users from "../models/Users.js";
import bcrypt from 'bcrypt';




export const login = async (req, res) =>{
    const { email, password } = req.body;
    try {

        const user = await Users.findOne({ email });

        if (!user) {
            return res.json({status: false, message: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({status: false, message: 'Invalid email or password' });
        } else{
            
            return res.json({status: true, data:user});
        }
        
    } catch (error) {
        console.log(error);
        return res.json({status: false, message: 'Server Error' });
    }
} 

export const register = async (req, res) =>{
    const { username, password } = req.body;
    try {
        
        const existingUser = await Users.findOne({ username });
        if (existingUser) {
            return res.json({status: false, message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Users({
            username,
            password: hashedPassword
        });
        const userCreated = await newUser.save();
        return res.json({status: true, data: userCreated});

    } catch (error) {
        return res.json({status: false, message: 'Server Error' });
    }
} 