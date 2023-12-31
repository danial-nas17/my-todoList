import React, { useContext, useEffect, useState } from 'react'
import { TodoContext } from '../component/context/TodoContext'
import "./todo.css"
import FilterTodos from '../component/todos/FilterTodos';
import CreateTodos from '../component/todos/CreateTodos';
import UpdateTodo from '../component/todos/UpdateTodo';
import RemoveTodo from '../component/todos/RemoveTodo';



function Todo() {
    const [loading , setLoading] = useState(true)
    const {todos , getTodos , error} = useContext(TodoContext)

    useEffect( () =>{

            const fetchData = async () =>{

                await getTodos();
                setLoading(false)
            }

            fetchData();
        
    } ,[])

  return (
    <>
        <div className="container mt-4">
            <div className="row g-3 ">
                <CreateTodos/>
                <hr/>
                <FilterTodos/>
                {loading && <div className="spinner-border  text-center text-primary mt-5 ms-4" role="status">
                    <span className="visually-hidden">Loading...</span>
                    </div>}

                {error && <div className='text-center text-danger fs-5 mt-5'>{error}</div>}
            
                {todos && todos.map(todo => (
                    <div key={todo.id} className="col-md-8 d-flex justify-content-between ali align-items-center  todo-item">
                       <div className='del'>{todo.completed ? <del style={{color: '#c92a2a'}}>{todo.title}</del> : <span>{todo.title}</span>}</div> 
                       <div className="d-flex align-items-center p-2">
                            
                        <UpdateTodo todo={todo}/>
                        <RemoveTodo todoId={todo.id}/>
                            
                       </div>
                    </div>
                ))}

   
        </div>
        </div>  
   
    
    </>

  )
}

export default Todo
