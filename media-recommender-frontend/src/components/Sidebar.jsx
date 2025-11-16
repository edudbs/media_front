import React from 'react'

export default function Sidebar(){
  return (
    <div className="w-72 bg-gradient-to-b from-indigo-600 to-indigo-500 text-white p-6 hidden lg:block">
      <h1 className="text-2xl font-bold">Media Recommender</h1>
      <p className="mt-3 text-sm opacity-90">Receba recomendações de vídeos e séries baseadas no seu gosto.</p>
      <div className="mt-6 text-sm opacity-90">
        <div className="font-semibold">Atalhos</div>
        <ul className="mt-2 list-disc list-inside">
          <li>Peça por gênero: "comédia"</li>
          <li>Peça por humor: "sarcástico"</li>
          <li>Gerar playlist: "playlist 60min comédia"</li>
        </ul>
      </div>
    </div>
  )
}
