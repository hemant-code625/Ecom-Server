import User from "../models/Users.js";

export async function fetchUserById(req, res) {
    const { id } = req.params;
    console.log(id)
    try {
      const user = await User.findById(id);
      res.status(200).json(user);
    } catch (err) {
        console.error(err);  // Log the error for debugging
        res.status(400).json({ error: 'Error fetching user' });
    }
  }

  export async function updateUser(req, res) {
    const { id } = req.params;
    try {
      const user = await User.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  }