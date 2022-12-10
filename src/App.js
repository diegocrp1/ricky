import { useState,useEffect } from 'react'
import { Route, Routes,useLocation,useNavigate } from 'react-router-dom';
import './App.css'
import About from './components/about/About';
import Cards from './components/cards/Cards.jsx';
import Nav from './components/nav/Nav'
import Detail from './components/detail/Detail.jsx'
import Form from './components/form/Form';

function App () {
  const location=useLocation()
  const navigate=useNavigate()
  const [characters, setCharacters]=
  useState([])
  const [access, setAccess] = useState(false)
  const username= 'diego@henry.com'
  const password='diego1234'

  function login(userData){
    if(userData.username===username && userData.password===password){
      setAccess(true)
      navigate('/home')
    }else{
      alert('usuario o contraseña incorrecta')
    }
  }

  // const onSearch= ()=>{
  //   const example={
  //     name: 'Morty Smith',
  //     species: 'Human',
  //     gender: 'Male',
  //     image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
  //   };
  //   setCharacters([...characters,example]);
  // }
  function onSearch(character) {
    fetch(`https://rickandmortyapi.com/api/character/${character}`)
       .then((response) => response.json())
       .then((data) => {
          if (data.name) {
             setCharacters((oldChars) => [...oldChars, data]);
          } else {
             window.alert('No hay personajes con ese ID');
          }
       });
 }
 const onClose =(id)=>{
  setCharacters(characters.filter((char)=>char.id!==id))
 }
  useEffect(()=>{
    !access&&navigate('/')
  },[access]);

  return (
    <div className='App' style={{ padding: '25px' }}>
        <div>
          {location.pathname!=='/' && <Nav onSearch={onSearch}/>}
        </div>
        <Routes>
          <Route path='/' element={<Form login={login}/>}/>
          <Route path='/home' element={<Cards
          characters={characters}
          onClose={onClose}
        />}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/detail/:detailId' element={<Detail/>}/>
        </Routes>
    </div>
  )
}

export default App
