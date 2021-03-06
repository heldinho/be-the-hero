import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'
import 'animate.css'
import api from '../../services/api'
import './styles.css'

import logoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'

function Login() {
  const [id, setId] = useState('')
  const history = useHistory()

  async function handleLogin(e) {
    e.preventDefault()
    try {
      const res = await api.post('/sessions', { id })
      localStorage.setItem('ongId', id)
      localStorage.setItem('ongName', res.data.name)
      history.push('/profile')
    } catch (error) {
      alert('Falha no login, tente novamente.')
    }
  }

  return (
    <>
      <div className="login-container animated fadeIn">
        <section className="form">
          <img src={logoImg} alt="Be The Hero" />
          <form onSubmit={handleLogin}>
            <h1>Faça seu Login</h1>
            <input
              type="text"
              placeholder="Sua ID"
              value={id}
              onChange={e => setId(e.target.value)}
            />
            <button type="submit" className="button">
              Entrar
            </button>
            <Link to="/register" className="back-link">
              <FiLogIn size={16} color="#E02041" />
              Não tenho cadastro
            </Link>
          </form>
        </section>
        <img src={heroesImg} alt="Heroes" />
      </div>
    </>
  )
}

export default Login
