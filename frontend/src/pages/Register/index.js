import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import 'animate.css'
import api from '../../services/api'
import './styles.css'

import logoImg from '../../assets/logo.svg'

function Register() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    whatsapp: '',
    city: '',
    uf: ''
  })

  const history = useHistory()

  async function handleRegister(e) {
    e.preventDefault()
    const { name, email, whatsapp, city, uf } = values

    if (name === '') return
    if (email === '') return
    if (whatsapp === '') return
    if (city === '') return
    if (uf === '') return

    const data = {
      name,
      email,
      whatsapp,
      city,
      uf
    }
    try {
      const res = await api.post('/ongs', data)
      alert(`Seu ID de acesso: ${res.data.id}`)
      history.push('/')
    } catch (error) {
      alert('Erro no cadastro, tente novamente.')
    }
  }

  return (
    <>
      <div className="register-container animated fadeIn">
        <div className="content">
          <section>
            <img src={logoImg} alt="Be The Hero" />
            <h1>Cadastro</h1>
            <p>
              Faça seu cadastro, entre na plataforma e ajude pessoas a
              encontrarem os casos da sua ONG.
            </p>
            <Link to="/" className="back-link">
              <FiArrowLeft size={16} color="#E02041" />
              Voltar para o login
            </Link>
          </section>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Nome da ONG"
              value={values.name}
              onChange={e => setValues({ ...values, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="E-mail"
              value={values.email}
              onChange={e => setValues({ ...values, email: e.target.value })}
            />
            <input
              type="text"
              placeholder="Whatsapp"
              value={values.whatsapp}
              onChange={e => setValues({ ...values, whatsapp: e.target.value })}
            />

            <div className="input-group">
              <input
                type="text"
                placeholder="Cidade"
                value={values.city}
                onChange={e => setValues({ ...values, city: e.target.value })}
              />
              <input
                type="text"
                placeholder="UF"
                style={{ width: 80 }}
                value={values.uf}
                onChange={e => setValues({ ...values, uf: e.target.value })}
              />
            </div>

            <button className="button" type="submit">
              Cadastrar
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register
