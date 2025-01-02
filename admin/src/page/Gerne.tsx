import React, { useState } from 'react'
import './Gerne.css'

interface Genre {
  id: number
  name: string
  description: string
}

const initialGenres: Genre[] = [
  { id: 1, name: 'Sad Songs', description: 'Sad songs are a genre of music that conveys feelings of sadness or melancholy.' },
  { id: 2, name: 'Romantic Songs', description: 'Romantic songs are a genre of music that focuses on love and emotions.' },
  { id: 3, name: 'Travel Songs', description: 'Travel songs evoke the sense of adventure and journey.' },
  { id: 4, name: 'Relax Songs', description: 'Relax songs promote calmness and relaxation.' },
  { id: 5, name: 'Retro Songs', description: 'Retro songs refer to music from past decades.' }
]

const Genre: React.FC = () => {
  const [genres, setGenres] = useState<Genre[]>(initialGenres)
  const [searchTerm, setSearchTerm] = useState('')

  const handleDelete = (id: number) => {
    const updatedGenres = genres.filter((genre) => genre.id !== id)
    setGenres(updatedGenres)
  }

  const filteredGenres = genres.filter((genre) => genre.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="loading">
      <div className='genre-list'>
        <h2>Genre List</h2>
        <div className='controls'>
          <label>Search: </label>
          <input type='text' placeholder='Search...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <div className='right'>
            <button onClick={() => alert('Add new genre functionality!')}>+ Add New Genre</button>
          </div>
        </div>

        <table className='tableAdmin'>
          <thead>
            <tr>
              <th>No.</th>
              <th>Song Genre</th>
              <th>Genre Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredGenres.map((genre, index) => (
              <tr key={genre.id}>
                <td>{index + 1}</td>
                <td>{genre.name}</td>
                <td>{genre.description}</td>
                <td>
                  <button onClick={() => alert('Edit genre!')}>✏️</button>
                  <button onClick={() => handleDelete(genre.id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div>
          Showing {filteredGenres.length} of {genres.length} entries
        </div>
      </div>
    </div>
  )
}

export default Genre
