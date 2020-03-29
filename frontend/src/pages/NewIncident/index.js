import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import 'animate.css'
import './styles.css'
import api from '../../services/api'

import logoImg from '../../assets/logo.svg'

function NewIncident() {
  const [values, setValues] = useState({
    title: '',
    description: '',
    value: ''
  })
  const history = useHistory()

  const ongId = localStorage.getItem('ongId')

  async function handleNewIncident(e) {
    e.preventDefault()
    const { title, description, value } = values
    const data = {
      title,
      description,
      value
    }
    try {
      await api.post('/incidents', data, {
        headers: {
          Authorization: ongId
        }
      })
      history.push('/profile')
    } catch (error) {
      alert('Erro ao cadastrar caso, tente novamente.')
    }
  }
  return (
    <>
      <div className="new-incident-container animated fadeIn">
        <div className="content">
          <section>
            <img src={logoImg} alt="Be The Hero" />
            <h1>Cadastrar novo caso</h1>
            <p>
              Descreva o caso detalhadamente para encontrar um herói para
              resolver isso.
            </p>
            <Link to="/profile" className="back-link">
              <FiArrowLeft size={16} color="#E02041" />
              Voltar para o home
            </Link>
          </section>
          <form onSubmit={handleNewIncident}>
            <input
              type="text"
              placeholder="Título do caso"
              value={values.title}
              onChange={e => setValues({ ...values, title: e.target.value })}
            />
            <textarea
              placeholder="Descrição"
              value={values.description}
              onChange={e =>
                setValues({ ...values, description: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Valor em reais"
              value={values.value}
              onChange={e => setValues({ ...values, value: e.target.value })}
            />
            <button type="submit" className="button">
              Cadastrar
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default NewIncident
