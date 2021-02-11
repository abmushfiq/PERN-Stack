const express = require('express');
const app = express ();
const cors = require('cors');
const pool = require('./db');

//middleware
app.use(cors());
app.use(express.json()); //req.body



// Routes//

//Create todo
app.post('/todos', async (req,res)=>{
 try{
     const { description } = req.body;
     const NewTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description]);
     
     res.json(NewTodo.rows[0]);

   
 }catch(err){
     console.error(err);
 }
})
//get all todo

app.get ('/todos',async (req,res)=>{

    try{ 
        const allTodo = await pool.query("SELECT * FROM todo")

    res.json(allTodo.rows);
}catch(err){
    console.error(err)
}
   
   
})

//get a todo

app.get("/todos/:id", async(req,res) => {
     try{

        const {id} = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1",[id])
        res.json(todo.rows[0]);
     }catch(err){
        console.error(err.message);
     }
})
//update todo

app.put("/todos/:id",async(req,res)=>{
    try{
        const {id} =  req.params;
        const {description} = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description =$1 WHERE todo_id=$2",[description, id]);

        res.json("Todo was update!")
    }catch(err){
        console.error(err)
    }
})

//delete todo

app.delete("/todos/:id", async(req,res) =>{
    try{
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id =$1",[id]);

        res.json("Toda was deleted!")
    }catch(err){
        consoel.error(err)
    }
})


app.listen(
    5000,() => {console.log('server running on port 5000')}
);