import { IUser, IImage, LocationType } from './index'
import { IPhotoCard } from './photocard'

export interface IContent {
  id?: string
  imageid?: number
  mainimageUrl: string | null // mainImgUrl
  tag?: string[]
  description: string | null
  location: LocationType
  user: IUser
  like: number
  images: IImage[]
  title: string | null
  isLike: boolean
  isBookmark: boolean
}

export interface IContentBanner {
  id: string
  title: string | null
  mainImgUrl: string | null
  username?: string | null
  userProfileUrl?: string
  userId?: string
  like: number
  isLike: boolean
  isBookmark: boolean
}

export interface IContentMain {
  owner: string
  userId?: string
  handlemodify: () => void
  contentId: string
  id?: string
  description: string | null
  location: LocationType
  images: IImage[]
  tags?: string[]
  related: IContent[]
  photocards: IPhotoCard[]
}
