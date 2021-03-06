import { EditButton, LocationInfo, Photo, TagSmall } from '@components/index'
import Polaroids from '@containers/Polaroids'
import RelatedContents from '@containers/RelatedContents'
import { IContentMain } from '@interfaces'
import { useRouter } from 'next/router'
import { MainContainer } from './contentmain.style'

/**
 * description
 * location {name, lat, lng}
 * images [{id, uri, description}]
 */

const ContentMain = ({
  owner,
  userId,
  handlemodify,
  contentId,
  description,
  location,
  images,
  tags,
  related,
  photocards,
}: IContentMain) => {
  const router = useRouter()
  const handleTagClick = (tagName: string) => {
    router.push(`/search?keyword=${tagName}`, `/search`)
  }

  return (
    <MainContainer>
      {owner === userId && (
        <div className='edit-button-area'>
          <EditButton owner={owner as string} handlemodify={handlemodify} />
        </div>
      )}
      <section className='description'>{description}</section>
      <section className='photo'>
        {images.map((el) => (
          <Photo
            key={el.id}
            id={el.id}
            imageurl={el.imageurl}
            description={el.description}
            type={el.type}
          />
        ))}
      </section>
      <section className='location'>
        <LocationInfo locationInfo={location} />
      </section>
      <section className='tags'>
        {tags?.map((el) => (
          <TagSmall key={el} tagname={el} onClick={() => handleTagClick(el)} />
        ))}
      </section>
      <section className='related-contents'>
        <RelatedContents related={related} />
      </section>
      <section className='photocards'>
        <Polaroids
          type={'content'}
          locationinfo={location}
          photocards={photocards}
          contentId={contentId}
        />
      </section>
    </MainContainer>
  )
}

export default ContentMain
