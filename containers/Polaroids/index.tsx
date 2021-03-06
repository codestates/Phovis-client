import { RootReducer } from '@actions/reducer'
import { Modal, Polaroid } from '@components/index'
import PhotoCardInput from '@containers/PhotoCardInput'
import { IPhotoCard, IUser, LocationType } from '@interfaces'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Container } from './polaroids.style'

interface IProps {
  photocards: IPhotoCard[]
  contentId?: string
  locationinfo?: LocationType
  handleModify?: React.MouseEvent<HTMLButtonElement>
  type: 'main' | 'content'
}
const Polaroids = ({ locationinfo, photocards, contentId, type }: IProps) => {
  // ! Modal control
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const [isModify, setModify] = useState<boolean>(false)
  const [targetModifyPhotocardId, settargetModify] = useState<string>('')
  const { user, isLogin } = useSelector((state: RootReducer) => state.user)

  const handleModalOpen = () => {
    if (isLogin) {
      setModify(false)
      setModalIsOpen(true)
    } else {
      alert('로그인이 필요합니다')
    }
  }

  const handleModify = (photocadid: string, userid: string) => {
    if (user && isLogin) {
      const { id } = user as IUser
      if (userid === id) {
        setModify(true)
        settargetModify(photocadid)
        setModalIsOpen(true)
      } else {
        alert('자신의 게시물만 수정할 수 있습니다')
      }
    } else {
      alert('로그인이 필요합니다')
    }
  }

  const handleModalClose = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement
    if (target.localName === 'div' && target.className.includes('overlay')) {
      setModalIsOpen(false)
    }
  }

  return (
    <>
      <Container className='thumbnails'>
        {type === 'content' && (
          <div className='photocardUploadTitle'>
            <h2>이런 사진을 찍을 수 있어요 !</h2>
            <div
              className='photocard-upload-btn-area'
              onClick={handleModalOpen}>
              <span>내가 찍은 사진도 자랑하러가기</span>
              <div className='upload-btn'></div>
            </div>
          </div>
        )}
        {modalIsOpen && (
          <Modal w='400px' h='600px' handleModalClose={handleModalClose}>
            <PhotoCardInput
              isModify={isModify}
              photocardId={targetModifyPhotocardId}
              location={locationinfo}
              contentId={contentId}
              handleModalClose={(e: boolean) => setModalIsOpen(e)}
            />
          </Modal>
        )}
        <div className='photocard-container'>
          {photocards &&
            photocards.length > 0 &&
            photocards.map((photoCard) => {
              const {
                photocardId,
                imageurl,
                description,
                userName,
                like,
                userId,
              } = photoCard
              let isOwner: boolean = false
              if (user) {
                isOwner = userId === user.id
              }
              return (
                <Polaroid
                  type={type}
                  isOwner={isOwner}
                  key={photocardId}
                  handleModify={(e) => {
                    e.stopPropagation()
                    handleModify(photocardId as string, userId as string)
                  }}
                  imageurl={imageurl}
                  description={description}
                  userName={userName}
                  like={like}
                />
              )
            })}
        </div>
      </Container>
    </>
  )
}
export default Polaroids
