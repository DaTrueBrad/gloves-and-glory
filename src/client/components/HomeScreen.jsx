import React, {useRef} from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const HomeScreen = () => {
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
          userId: 1
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
  return (
    <div>
      <h1>Welcome</h1>
      <div>
        <input placeholder='search'/>
        <h2 onClick={createForum}>+</h2>
      </div>
    </div>
  )
}

export default HomeScreen