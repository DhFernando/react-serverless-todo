const connection = require("./common/connection");
const response = require("./common/api_response");
const { ObjectId } = require("mongodb");

'use strict';

module.exports.createTodo = async (event) => {
  let conn;
  try{
    conn = await connection.createConnection();
    const db = await connection.getDbConnection(conn);

    const obj = JSON.parse(event.body)
    db.collection("todos").insert({
      creatorId : obj.creatorId,
      creatorEmail : obj.creatorEmail,
      todo: obj.todo,
      isCompleted:false,
      time: new Date()
    })
    
    return response._200({message : "your todo has been successfully insert to mongodb....! :)"});
  }catch(e){
    return response._400({message : "Something went wrong....! :("})
  }
};

module.exports.getTodosByUser = async (event) => {
  let conn;
  try{
    conn = await connection.createConnection();
    const db = await connection.getDbConnection(conn);

    const creatorId = event.pathParameters.creatorId

    const res = await db.collection("todos").find({creatorId}).toArray()
    
    return response._200({todos : res});
  }catch(e){
    return response._400({message : "Something went wrong....! :("})
  }
};

module.exports.removeTodo = async (event) => {
  let conn;
  try{
    conn = await connection.createConnection();
    const db = await connection.getDbConnection(conn);

    const _id = event.pathParameters._id

    await db.collection("todos").remove({_id : new ObjectId(_id)})
    
    return response._200({message : "Removed....! :)"});
  }catch(e){
    return response._400({message : "Something went wrong....! :("})
  }
};
