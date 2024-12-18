import { ReactNode, useEffect, useState } from 'react'
import useGetFavoriteDetail from '~/hooks/Album/useGetFavoriteDetail'
import FavoriteContext from '~/hooks/useFavorite'
import { ITrack } from '~/type/Tracks/ITrack'

type FavoriteContextType = {
  favoriteIds: string | null
  children: ReactNode
}

export const FavoriteProvider = ({ favoriteIds, children }: FavoriteContextType) => {
  const [favIds, setFavIds] = useState<string | null>(favoriteIds)
  const { data } = useGetFavoriteDetail(favIds)
  const [favTracks, setFavTracks] = useState<ITrack[] | []>([])

  useEffect(() => {
    if (data) {
      setFavTracks(data.result.list_of_tracks)
    }
  }, [data])

  const isTrackFavorite = (trackId: string): boolean => {
    return favTracks.some(track => track._id === trackId)
  }

  return <FavoriteContext.Provider value={{ favTracks, setFavTracks, setFavIds, isTrackFavorite }}>{children}</FavoriteContext.Provider>
}
