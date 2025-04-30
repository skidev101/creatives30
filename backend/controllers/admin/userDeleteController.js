const deleteUser = async (req, res) => {
	const { email, username } = req.body;
	const query = email ? { email } : { username };
	const value = email || username;
	
	try {
	  const foundUser = await User.findOne(query);
	  if (!foundUser) {
		return res.status(404).json({ 
		  success: false,
		  message: "User not found",
		  error: "USER_NOT_FOUND"
		});
	  }
	  
	  const foundUserUid = foundUser.uid;
	  const [fbDelete, dbDelete] = await Promise.all([
		admin.auth().deleteUser(foundUserUid),
		User.findOneAndDelete({ uid: foundUserUid })
	  ]);
	  
	  if (fbDelete && dbDelete) {
		return res.status(200).json({
		  success: true,
		  message: `User ${value} deleted successfully`,
		  deletedUser: {
			email: foundUser.email,
			username: foundUser.username,
			uid: foundUser.uid
		  }
		});
	  }
	  
	  throw new Error("Partial deletion occurred");
	  
	} catch (err) {
	  console.error('Delete user error:', err);
	  return res.status(500).json({
		success: false,
		message: 'Failed to delete user',
		error: err.message || "INTERNAL_SERVER_ERROR"
	  });
	}
  }