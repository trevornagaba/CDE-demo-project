const express = require('express');
const app = express();
const serverless = require('serverless-http');

const users = [
    { id: 1, name: 'John', company: "ABC Company" },
    { id: 2, name: 'Frank', company: "XYZ Inc." },
    { id: 3, name: 'Ashley', company: "123 Company" },
];

app.get('/users', (req, res) => {
    res.json(users);
});

app.get('/users/:id', (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id));
    if (!user) res.status(404).json({ message: 'User not found' });
    res.json(user);
});

app.post('/users', (req, res) => {
    const user = {
        id: users.length + 1,
        name: req.body.name,
        company: req.body.company,
    };
    users.push(user);
    res.json(user);
});

app.delete('/users/:id', (req, res) => {
    const userIndex = users.findIndex(user => user.id === parseInt(req.params.id));
    if (userIndex === -1) res.status(404).json({ message: 'User not found' });
    users.splice(userIndex, 1);
    res.json({ message: 'User deleted' });
});

app.put('/users/:id', (req, res) => {
    let user = users.find(user => user.id === parseInt(req.params.id));
    if (!user) res.status(404).json({ message: 'User not found' });
    user.name = req.body.name;
    user.company = req.body.company;
    res.json(user);
});


const handler = serverless(app);

const startServer = async () => {
    app.listen(3000, () => {
      console.log("listening on port 3000!");
    });
}

startServer();

module.exports.handler = (event, context, callback) => {
    const response = handler(event, context, callback);
    return response;
};