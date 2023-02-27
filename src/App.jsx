import './App.css'
import './normalize.css'

import { BiSearchAlt } from 'react-icons/bi'
import { useState } from 'react';

import Loading from './components/Loading/loading.jsx';

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState(false)

  async function mostraCEP() {
    try {
      setErro(false)
      setCep({})
      setLoading(true)
      const response = await fetch(`https://viacep.com.br/ws/${input}/json`)
      const APIConv = await response.json()
      setCep(APIConv)
      setLoading(false)
      setInput('')
    }
    catch {
      setErro(true)
      setLoading(false)
      setInput('')
    }
  }

  if (!navigator.onLine) {
    return <h1>Verifique sua conexão</h1>;
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      mostraCEP()
    }
  }


  return (

    <div className='container'>

      <h2 className='title'>Puxa Endereço - BRASIL</h2>

      <div className='containerInput'>
        <input required type='text' placeholder='Digite o CEP' onKeyDown={handleKeyDown} className='input' value={input} onChange={(e) => {
          setInput(e.target.value)
        }
        } />
        <button className='button' onClick={mostraCEP}><BiSearchAlt /></button>

      </div>

      {loading && <Loading />}

      {erro && <h3 className='erro'>Digite um CEP válido.</h3>}

      {Object.keys(cep).length > 0 && (

        <div className='infos'>
          <span className='cep'>CEP: {cep.cep}</span>
          <span className='rua'><b>Rua:</b> {cep.logradouro}</span>
          <span className='bairro'><b>Bairro:</b> {cep.bairro}</span>
          <span className='cidade'><b>Cidade:</b> {cep.localidade}</span>
          <span className='estado'><b>Estado:</b> {cep.uf}</span>
        </div>
      )}

    </div >


  )
}

export default App
