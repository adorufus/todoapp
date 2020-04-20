const express = require("express");
const app = express();
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');

const { List, Task } = require('./db/models');

function responseTemplate(status, statusCode, message, data, isError = false) {
    if (isError == false) {
        return {
            status: status,
            with_status_code: statusCode,
            message: message,
            data: data
        }
    } else {
        return {
            status: status,
            with_status_code: statusCode,
            message: message,
        }
    }
}

//load middleware
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

/**
 * GET /list/all
 * Purpose: Get all list
 */
app.get('/list/all', (req, res) => {
    List.find({}).then((lists) => {
        res.send(lists);
    });
})

/**
 * GET /list?:id
 * Purpose: Get single list based on id
 */
app.get('/list/:id', (req, res) => {
    List.findOne({ _id: req.params.id }).then((data) => {
        res.send(data);
        res.sendStatus(200);
    });
})

/**
 * POST /list/create
 * Purpose: Create new list
 */
app.post('/list/create', (req, res) => {
    let title = req.body.title;

    let newList = new List({
        title
    });

    newList.save().then((listDoc) => {
        res.send(listDoc);
    })
})

/**
 * PATCH /list/update/:id
 * Purpose: Update list based on id
 */
app.patch('/list/update/:id', (req, res) => {
    List.findOneAndUpdate({ _id: req.params.id }, {
        $set: req.body
    }).then((data) => {
        res.status(200).json(req.body);
    })
})

/**
 * DELETE /list/delete/:id
 * Purpose: Delete list based on id
 */
app.delete('/list/delete', (req, res) => {
    List.findOneAndRemove({
        _id: req.body.id
    }, {
        $set: req.body
    }).then((removedListDoc) => {
        res.status(200).send(
            responseTemplate('OK', res.statusCode, 'Deleted', removedListDoc, false)
        );
    });
})

/**
 * GET /task/all?listId=:listId
 * Purpose: Get all task based on listId
 */
app.get('/task/all', (req, res) => {
    if (req.query.listId != "") {
        Task.find({
            _listId: req.query.listId
        }).then((tasks) => {
            const data = tasks;
            res.status(200).send(
                responseTemplate('OK', res.statusCode, 'Success get all task', data, false)
            );
        }).catch((e) => {
            console.log(e);
        });
    } else {
        res.status(400).send(
            responseTemplate('NOK', res.statusCode, 'the paramater listId could not be empty', undefined, true)
        );
    }
})

/**
 * GET /task?taskId=:taskId
 * Purpose: Get task based on taskId
 */
app.get('/task', (req, res) => {
    if (req.query.taskId != "") {
        Task.findById(req.query.id).then((task) => {
            res.status(200).send(responseTemplate('OK', res.statusCode, 'Succes get task', task, false));
        })
    } else {
        res.status(400).send(
            responseTemplate('NOK', res.statusCode, 'the paramater listId could not be empty', undefined, true)
        );
    }
})

app.post('/task/create', (req, res) => {
    let listId = req.body.listId;
    let newTask = new Task({
        title: req.body.title,
        _listId: listId
    });

    newTask.save().then((data) => {
        res.send(data);
    }).catch((e) => {
        res.send(e['message']);
    });
})

app.patch('/task/update', (req, res) => {
    Task.findOneAndUpdate({
        _id: req.body.taskId,
        _listId: req.body.listId
    }, {
        $set: req.body
    }).then(() => {
        res.status(200).send(req.body);
    });
})

app.delete('/task/delete', (req, res) => {
    Task.findOneAndRemove({
        _id: req.body.taskId,
        _listId: req.body.listId
    }, {
        $set: req.body
    }).then(() => {
        res.status(200).send('deleted');
    });
})

app.listen(3000, () => {
    console.log("server is listening on port 3000");
})