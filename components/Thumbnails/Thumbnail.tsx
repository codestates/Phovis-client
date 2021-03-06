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
import React from 'react'

interface IRect {
  id: string
  profileImage?: string
  username: string
  bgImage: string
  like: number
  isBookmark?: boolean
  isLike?: boolean
  onClickContents: (contentId: string) => void
  onClickBookmark: (contentId: string) => void
  onClickLike: (cotentId: string) => void
}

// NOTE : ThumbnailRect, ThumbnailSquare 컴포넌트 하단에 태그를 노출 시키면 좋을것 같아요

export const ThumbnailRect = ({
  id,
  profileImage,
  username,
  bgImage,
  like,
  isBookmark = false,
  isLike = false,
  onClickContents,
  onClickBookmark,
  onClickLike,
}: IRect) => {
  const onClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement
    if (target.className && target.className.includes('ThumbnailRect')) {
      // console.log('conetnt ID : ', id)
      onClickContents(id)
    }
  }

  return (
    <ThumbnailContainer_rect>
      <DivWithBgImg
        className='ThumbnailRect'
        bgUrl={bgImage}
        p={'24px'}
        onClick={onClickHandler}>
        <span className='bookmark'>
          <BookmarkBtn
            id={id}
            isChecked={isBookmark}
            onClick={onClickBookmark}
          />
        </span>
        <UserInfoHor userName={username} profileImage={profileImage} />
        <span className='like'>
          <LikeBtn
            id={id}
            like={like}
            isChecked={isLike}
            onClick={onClickLike}
          />
        </span>
      </DivWithBgImg>
    </ThumbnailContainer_rect>
  )
}

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

  const handleThumbnailClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // console.log(`content/${contentid} 로 이동`)
    e.preventDefault()
    router.push(`/content/[content_id]`, `/content/${contentid}`)
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
