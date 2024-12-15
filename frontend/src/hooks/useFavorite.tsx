/* eslint-disable no-unused-vars */
import { createContext, useContext } from 'react'
import { ITrack } from '~/type/Tracks/ITrack'

interface FavoriteContextProps {
  favTracks: ITrack[] | []
  setFavTracks: (favoriteTracks: ITrack[] | []) => void
  setFavIds: (favoriteIds: string) => void
  isTrackFavorite: (trackId: string) => boolean
}

const FavoriteContext = createContext<FavoriteContextProps | undefined>(undefined)

// eslint-disable-next-line react-refresh/only-export-components
export function useFavorite() {
  const context = useContext(FavoriteContext)
  if (!context) {
    throw new Error('useFavorite must be used within a FavoriteProvider')
  }
  return context
}

export default FavoriteContext