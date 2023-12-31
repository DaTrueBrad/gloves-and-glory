import React, {useRef, useEffect, useState, useContext} from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import ForumCard from './ForumCard'
import AuthContext from '../state/AuthContext'

const HomeScreen = () => {
  const [forums, setForums] = useState([])
  const [search, setSearch] = useState('')
  const {state} = useContext(AuthContext)
  const MySwal = withReactContent(Swal)
  const navigate = useNavigate()
  const titleRef = useRef()
  const promptRef = useRef()
  const createForum = () => {
    MySwal.fire({
      title: 'Thingy',
      showCancelButton: true,
      html: <form>
        <input ref={titleRef} placeholder='Title'/>
        <textarea ref={promptRef} rows={5} placeholder='Tell us more...'/>
      </form>
    })
    .then((res) => {
      console.log(res)
      if(!res.isConfirmed) {
        alert("Cancelled")
      } else {
        //! HANDLE SENDING THE FORUM TO THE SERVER. IF POSSIBLE, WHEN IT IS CREATED, NAVIGATE US TO THAT PARTICULAR FORUM PAGE.
        let newForum = {
          title: titleRef.current.value,
          prompt: promptRef.current.value,
          userId: state.id
        }
        axios
          .post('/api/newForum', newForum)
          .then((res) => {
            //! navigate to the forum screen with the new id.
            navigate(`/forum/${res.data.id}`)
            console.log(res)
          })
          .catch((err) => {
            console.error(err)
          })
      }
    })
  }
  const getData = () => {
    axios.get('/api/getForums')
    .then((res) => {
      setForums(res.data)
      console.log(res)
    })
    .catch((err) => {
      console.error(err)
    })
  }

  useEffect(() => {
    getData()
  },[])

  let displayForums = forums
  .filter((forum) => {
    if(forum.title.toLowerCase().includes(search.toLowerCase())){
      return forum
    } else if(forum.prompt.toLowerCase().includes(search.toLowerCase())){
      return forum
    }
  })
  .map((forum) => {
    return <ForumCard forum={forum} />
  })

  return (
    <div>
      <h1>Welcome</h1>
      <div className='search-bar'>
        <input placeholder='search' onChange={(e) => setSearch(e.target.value)}/>
        <h2 onClick={createForum}>+</h2>
      </div>
      <div className='forum-card-container'>
        {displayForums}
      </div>
    </div>
  )
}

export default HomeScreen