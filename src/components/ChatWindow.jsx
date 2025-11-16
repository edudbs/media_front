import React, { useState, useRef, useEffect } from 'react'

export default function ChatWindow({ messages, onSend }){
  const [text, setText] = useState('')
  const bottomRef = useRef()
  useEffect(()=>{ bottomRef.current?.scrollIntoView({behavior:'smooth'}) }, [messages])
  function submit(e){ e.preventDefault(); if(!text.trim()) return; onSend(text.trim()); setText('') }

  return (
    <div className="flex-1 p-6 flex flex-col">
      <div className="flex-1 overflow-auto mb-4">
        {messages.map((m, idx)=> (
          <div key={idx} className={m.from==='me'? 'text-right my-2':'text-left my-2'}>
            <div className={`inline-block p-3 rounded ${m.from==='me' ? 'bg-blue-600 text-white' : 'bg-white text-gray-900'} max-w-xl`}> 
              {m.text.split('\n').map((line,i)=> <div key={i}>{line}</div>)}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={submit} className="flex gap-2">
        <input className="flex-1 p-3 rounded border" value={text} onChange={e=>setText(e.target.value)} placeholder="Peça uma recomendação, ex: comédia leve, filmes ação" />
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Enviar</button>
      </form>
    </div>
  )
}
