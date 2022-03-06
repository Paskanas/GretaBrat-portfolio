import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const SearchBox = () => {
  const navigate = useNavigate()

  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      navigate(`/search/${keyword}`)
    } else {
      navigate('/')
    }
    console.log('submit searchBox')
  }
  return (
    <Form onSubmit={submitHandler} className='d-flex'>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products...'
        className='ms-sm-5 me-sm-2'
        // size='sm'
        // htmlSize='1'
      ></Form.Control>
      <Button type='submit' variant='outline-success' className='p-2' size='sm'>
        Search
      </Button>
    </Form>
  )
}

export default SearchBox
