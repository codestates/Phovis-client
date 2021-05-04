import { DivWithBgImg } from '@styles/index'
import {
  ThumbnailContainer_square,
  ThumbnailContainer_rect,
  ThumbnailWrap,
} from './thumbnail.style'
import BookmarkBtn from '../Buttons/BookmarkBtn'
import { LikeBtn } from '@components/Buttons'
import UserInfoHor from '@components/UserInfo/UserInfo-hor'
import { useRouter } from 'next/router'

interface IRect {
  id: string
  profileImage?: string
  username: string
  bgImage: string
  likeCount: number
  isBookMark?: boolean
  isLike?: boolean
}

// NOTE : ThumbnailRect, ThumbnailSquare 컴포넌트 하단에 태그를 노출 시키면 좋을것 같아요

export const ThumbnailRect = ({
  id,
  profileImage,
  username,
  bgImage,
  likeCount,
  isBookMark = false,
  isLike = false,
}: IRect) => (
  <ThumbnailContainer_rect>
    <DivWithBgImg bgUrl={bgImage} p={'24px'}>
      <span className='bookmark'>
        <BookmarkBtn id={id} isChecked={isBookMark} />
      </span>
      <UserInfoHor userName={username} profileImage={profileImage} />
      <span className='like'>
        <LikeBtn like={likeCount || 0} isChecked={isLike} />
      </span>
    </DivWithBgImg>
  </ThumbnailContainer_rect>
)

interface ISquare {
  profileImage?: string
  username: string
  bgImage: string
}

export const ThumbnailSquare = ({
  profileImage,
  username,
  bgImage,
}: ISquare) => (
  <ThumbnailContainer_square>
    <DivWithBgImg bgUrl={bgImage} p={'24px'}>
      <UserInfoHor userName={username} profileImage={profileImage} />
    </DivWithBgImg>
  </ThumbnailContainer_square>
)

interface IProps {
  contentid: string
  imageurl: string
  title: string
  username: string
}

export const ContentThumbnail = ({
  contentid,
  imageurl,
  title,
  username,
}: IProps) => {
  const router = useRouter()

  const handleThumbnailClick = () => {
    // console.log(`content/${contentid} 로 이동`)
    router.push(`content/${contentid}`)
  }
  return (
    <ThumbnailWrap className='thumbnail-wrap' onClick={handleThumbnailClick}>
      <div className='thumbnail'>
        <div className='thumbnail-bg'>
          <DivWithBgImg bgUrl={imageurl} />
        </div>
        <div className='thumbnail-info'>
          <h1>{title}</h1>
          <p>{username}</p>
        </div>
      </div>
    </ThumbnailWrap>
  )
}
