const fs = require('fs');
const users = JSON.parse(fs.readFileSync(`${__dirname}/../data/users.json`));



//function users

function getAllUsers(req, res) {
  res.status(200).json({
    message: 'Success',
    users: {
      users,
    },
  });
}

function createUser(req, res) {
  const newId = users[users.length - 1].id + 1;
  const newUser = Object.assign({ id: newId }, req.body);
  users.push(newUser);
  fs.writeFile(`${__dirname}/data/users.json`, JSON.stringify(users), (err) => {
    res.status(201).json({
      status: 'success',
      data: { user: newUser },
    });
  });
}

module.exports={
  getAllUsers,
  createUser
}
