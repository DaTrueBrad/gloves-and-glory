import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const ForumScreen = () => {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const {forumId} = useParams()

  const getData = () => {
    axios.get(`/api/getforum/${forumId}`)
    .then((res) => {
      setData(res.data)
      setLoading(false)
      console.log(res)
    })
    .catch((err) => {
      console.error(err)
    })
  }

  useEffect(() => {
    getData()
  },[])
  if(loading) {
    return <h1>Loading...</h1>
  }

  return (
    <div>
      <h1>{data.title}</h1>
      <h5>{data.prompt}</h5>
    </div>
  )
}

export default ForumScreen