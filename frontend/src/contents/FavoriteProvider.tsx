import { ReactNode, useEffect, useState } from 'react'
import useGetFavoriteDetail from '~/hooks/Album/useGetFavoriteDetail'
import FavoriteContext from '~/hooks/useFavorite'
import useGetListFollow from '~/hooks/User/useGetListFollow'
import { IArtist } from '~/type/Artist/IArtist'
import { ITrack } from '~/type/Tracks/ITrack'

type FavoriteContextType = {
  favoriteIds: string | null
  children: ReactNode
}

export const FavoriteProvider = ({ favoriteIds, children }: FavoriteContextType) => {
  const [favIds, setFavIds] = useState<string | null>(favoriteIds)
  const { data } = useGetFavoriteDetail(favIds)
  const { data: followUser } = useGetListFollow(1000, 0)
  const [favTracks, setFavTracks] = useState<ITrack[] | []>([])
  const [followUsers, setFollowUsers] = useState<IArtist[] | []>([])

  useEffect(() => {
    if (data) {
      setFavTracks(data.result.list_of_tracks)
    }
  }, [data])

  useEffect(() => {
    if (followUser) {
      setFollowUsers(followUser.pages[0].result.data)
    }
  }, [followUser])

  const isTrackFavorite = (trackId: string): boolean => {
    return favTracks.some((track) => track._id === trackId)
  }

  const isUserFollow = (userId: string): boolean => {
    return followUsers.some((user) => user._id === userId)
  }

  return <FavoriteContext.Provider value={{ favTracks, setFavTracks, setFavIds, isTrackFavorite, isUserFollow, followUsers, favIds }}>{children}</FavoriteContext.Provider>
}
