import User from '../models/user';
import { hashPassword, comparePassword } from '../helpers/auth';
import jwt from 'jsonwebtoken';

export const register = async function(req, res) {
	const { firstname, lastname, email, password } = req.body;

	if(!firstname) return res.status(400).send("First Name is required.");
	if(!lastname) return res.status(400).send("Last Name is required.");
	if(!password || password.length < 6) return res.status(400).send("Password is required and should be at least 6 characters long.");	
	if(!email) return res.status(400).send("Email is required.");
	const exist = await User.findOne({ email });
	if(exist) return res.status(400).send("Email is already in use.");
	const hashedPassword = await hashPassword(password);
	const user = new User({ firstname, lastname, email, password: hashedPassword });
	try {
		await user.save();
		console.log("User saved successfully.");
		return res.json({ ok: true });
	} catch (err) {
		console.log("Registration failed. Error => ", err);
		return res.status(400).send("Error saving. Please try again.");
	}
};

export const login = async function(req, res) {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if(!user) return res.status(400).send("User not found.");
		// check password
		const match = await comparePassword(password, user.password);
		if(!match) return res.status(400).send("Wrong password.");
		const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
		user.password = undefined;
		res.json({ token, user });
	} catch (err) {
		console.log("Login error => ", err);
		return res.status(400).send("Error logging in. Please try again.");
	}
}