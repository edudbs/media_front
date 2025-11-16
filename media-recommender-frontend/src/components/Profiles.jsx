import React from 'react'

export default function Profiles({ profiles, active, onSelect }){
  return (
    <div className="w-64 bg-white border-r p-4 hidden md:block">
      <h3 className="font-semibold mb-3">Perfis</h3>
      <div className="space-y-2">
        {Object.keys(profiles).length===0 && <div className="text-sm text-gray-500">Nenhum perfil salvo.</div>}
        {Object.keys(profiles).map((k)=> (
          <button key={k} onClick={()=>onSelect(profiles[k])} className={`w-full text-left p-2 rounded ${active===profiles[k] ? 'bg-blue-100':''}`}>{k}</button>
        ))}
      </div>
    </div>
  )
}
