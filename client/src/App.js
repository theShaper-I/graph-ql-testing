import './App.css';
import {useEffect, useState} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {GET_ALL_USERS, GET_ONE_USER} from "./query/user";
import {CREATE_USER} from "./mutation/user";

function App() {
  const { data, loading, error, refetch} = useQuery(GET_ALL_USERS)
  const { data: oneUser, loading: loadingOneUser} = useQuery(GET_ONE_USER, {
    variables: {
      id: 1
    }
  })
  const [newUser] = useMutation(CREATE_USER)
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('')
  const [age, setAge] = useState(0);

  console.log(oneUser)

  useEffect(() => {
    if (!loading) {
      setUsers(data.getAllUsers)
    }
  }
  , [data]);

  const addUser = (e) => {
    e.preventDefault()
    newUser({
      variables: {
        input: {
          username, age
        }
      }
    }).then(({data}) => {
      console.log(data)
      setUsername('')
      setAge(0)
    })
  }
  const getAll = e => {
    e.preventDefault()
    refetch()
  }

  if (loading) {
    return <h1 className='text-center text-6xl'>Loading...</h1>
  }

  return (
    <div className='mx-auto w-fit'>
      <form className='w-[500px] bg-gray-600 mt-6 p-6'>
        <input value={username} onChange={e => setUsername(e.target.value)} className="bg-gray-50 w-[300px] mx-auto border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text"/>
        <input value={age} onChange={e => setAge(e.target.value)} className="bg-gray-50 w-[300px] mt-2 mx-auto border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" type="number"/>
        <div className="buttons flex flex-col">
          <button onClick={(e) => addUser(e)} className='mx-auto mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"'>Create</button>
          <button onClick={(e) => getAll(e)} className='mx-auto mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"'>Get</button>
        </div>
        <div className='text-center text-black mt-4 '>
          {users.map(user =>
            <div className="user mt-2 bg-white rounded w-[250px] p-2 mx-auto" key={user.id}> ID: {user.id} Name: {user.username} Age: {user.age}</div>
          )}
        </div>
      </form>
    </div>
  );
}

export default App;
