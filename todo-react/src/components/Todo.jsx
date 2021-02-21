import React , { useEffect , useState } from 'react'
import { Auth } from 'aws-amplify';
import axios from 'axios'

function Todo() {

    useEffect( ()=>{
        (async ()=>{
            const res = await Auth.currentAuthenticatedUser()
            setCreatorEmail(res.attributes.email)
            setCreatorId( res.attributes.sub )
            const todos = await axios.get(`https://lhy4zpwo4k.execute-api.us-east-2.amazonaws.com/dev/todo/get/${res.attributes.sub}`)
            setTodos([...todos.data.todos])
        })()
    },[])

    const [creatorId , setCreatorId] = useState(null)
    const [creatorEmail , setCreatorEmail] = useState(null)
    const [newTodo , setTodo] = useState('')
    const [Todos , setTodos] = useState([])
    const [inprogress , setInprogress] = useState(false)

    const submit = async() =>{
        setInprogress(true)
        if( newTodo.length !== 0) {
            const dataObj ={
                creatorId: creatorId,
                creatorEmail:creatorEmail ,
                todo: newTodo
            }

            setTodo('')

            try{
                const res = await axios.post("https://lhy4zpwo4k.execute-api.us-east-2.amazonaws.com/dev/todo/create",dataObj)
                const todos = await axios.get(`https://lhy4zpwo4k.execute-api.us-east-2.amazonaws.com/dev/todo/get/${creatorId}`)
                setTodos([...todos.data.todos])
                alert(res.data.message)

                setInprogress(false)
                
            }catch(e){
                setInprogress(false)
                console.log(e)
            }


        }
        else {
            setInprogress(false)
            alert("insert todo")
        }
    }

    const deleteTodo = async (_id) =>{
        try{
            const res = await axios.delete(`https://lhy4zpwo4k.execute-api.us-east-2.amazonaws.com/dev/todo/remove/${_id}`)
            const todos = await axios.get(`https://lhy4zpwo4k.execute-api.us-east-2.amazonaws.com/dev/todo/get/${creatorId}`)
            setTodos([...todos.data.todos])
            alert(res.data.message)
        }catch(e){
            console.log(e)
        }
    }

    return (
        <div>
            Todo Page
            <br />
               {
                   inprogress === false ? (
                    <div>
                        <input type="text" value={newTodo} onChange={ e => setTodo( e.target.value ) } />
                        <button onClick={()=>submit()} > Add Todo </button>
                    </div>
                   ) : (
                       <div> <h3>Please wait ..... :)</h3> </div>
                   )
               }
            <br/>
            {
                Todos.map(el =>{
                return(<li key={el._id}> {el.todo} <button onClick={()=>deleteTodo( el._id )} >Delete</button><button>Update</button> </li>)
                })
            }
        </div>
    )
}

export default Todo