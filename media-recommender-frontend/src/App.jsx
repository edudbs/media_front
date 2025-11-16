import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ChatWindow from './components/ChatWindow'
import Profiles from './components/Profiles'
import Sidebar from './components/Sidebar'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export default function App(){
  const [messages, setMessages] = useState([])
  const [userId] = useState(() => 'user-'+Math.random().toString(36).slice(2,9))
  const [profiles, setProfiles] = useState({})
  const [activeProfile, setActiveProfile] = useState(null)

  useEffect(()=>{ fetchProfiles() }, [])

  async function fetchProfiles(){
    try{
      const res = await axios.get(`${API_BASE}/profile/${userId}`)
      setProfiles(res.data || {})
    }catch(e){ }
  }

  async function sendMessage(text){
    const m = {from:'me', text}
    setMessages(prev=>[...prev, m])
    const body = { preferences: { genres: [text] }, limit: 6 }
    try{
      const res = await axios.post(`${API_BASE}/recommend?user_id=${userId}&strategy=hybrid`, body)
      const recs = res.data || []
      const replyText = formatRecs(recs)
      setMessages(prev=>[...prev, {from:'assistant', text: replyText}])
      sessionStorage.setItem('last_recs', JSON.stringify(recs))
    }catch(err){
      console.error(err)
      setMessages(prev=>[...prev, {from:'assistant', text: 'Erro ao chamar a API.'}])
    }
  }

  function formatRecs(recs){
    if(!recs.length) return 'Nenhuma recomendação encontrada.'
    let out = 'Aqui estão algumas recomendações:\n\n'
    recs.forEach((r,i)=>{ out += `${i+1}) ${r.item.title} - ${r.item.url || 'link não disponível'}\n` })
    return out
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      <Profiles profiles={profiles} active={activeProfile} onSelect={setActiveProfile} />
      <ChatWindow messages={messages} onSend={sendMessage} />
    </div>
  )
}
