import axios, { AxiosResponse } from 'axios'
import { ContentAction } from './actionTypes'
import { IContent, IPhotoCard } from '@interfaces'

type mainContentsState = {
  bannerContentList:IContent[]
  recommendContentList: IContent[]
  trendTagList:string[]
  photocardList:IPhotoCard[]
  error: null | string | AxiosResponse<any>
}

// 초기상태를 선언합니다.
const initialState: mainContentsState = {
  error: null,
  bannerContentList:[],
  recommendContentList:[],
  trendTagList:[],
  photocardList:[],
}

const disfetchGetData = (action: string, data: any) =>({
  type : action,
  payload : data,
});

export const getBannderContentList = () =>{
  return async (dispatch:Function) =>{
    try{
      const result = await axios.get('https://localhost:4000/content',{
        params:{
          maxnum:3,
          tag:'야경,맛집,경복궁',
        },
        withCredentials: true,
      });

      if(result.status === 200){
        dispatch(disfetchGetData(ContentAction.GET_BANNER_SUCCESS, result));
      }
      else{
        dispatch(disfetchGetData(ContentAction.GET_BANNER_ERROR, 'fail load bannder'));
      }
    }
    catch(err){
      dispatch(disfetchGetData(ContentAction.GET_BANNER_ERROR, 'error load banner : ' + err));
    }
  }
}
export const getRecommendContentList = () =>{
  return async (dispatch:Function) =>{
    try{
      const result = await axios.get('https://localhost:4000/content',{
        params:{
          maxnum:6,
          name:'한옥마을',
        },
        withCredentials: true,
      });

      if(result.status === 200){
        dispatch(disfetchGetData(ContentAction.GET_RECOMMEND_SUCCESS, result));
      }
      else{
        dispatch(disfetchGetData(ContentAction.GET_RECOMMEND_ERROR, 'fail load recommend contents'));
      }
    }
    catch(err){
      dispatch(disfetchGetData(ContentAction.GET_RECOMMEND_ERROR, 'error load recommend contents : ' + err));
    }
  }
}

export const getTrendTagList = () =>{
  return async (dispatch:Function) =>{
    try{
      const result = await axios.get('https://localhost:4000/tag',{
        params:{
          maxnum:6,
        },
        withCredentials: true,
      });

      if(result.status === 200){
        dispatch(disfetchGetData(ContentAction.GET_TAG_LIST_SUCCESS, result));
      }
      else{
        dispatch(disfetchGetData(ContentAction.GET_TAG_LIST_ERROR, 'fail load tag'));
      }
    }
    catch(err){
      dispatch(disfetchGetData(ContentAction.GET_TAG_LIST_ERROR, 'error load tag : ' + err));
    }
  }
}

export const getPhotoCardList = () =>{
  return async (dispatch:Function) =>{
    try{
      const result = await axios.get('https://localhost:4000/photocard',{
        params:{
          maxnum:15,
        },
        withCredentials: true,
      });

      if(result.status === 200){
        dispatch(disfetchGetData(ContentAction.GET_PHOTO_CARD_LIST_SUCCESS, result));
      }
      else{
        dispatch(disfetchGetData(ContentAction.GET_PHOTO_CARD_LIST_ERROR, 'fail load photocard'));
      }
    }
    catch(err){
      dispatch(disfetchGetData(ContentAction.GET_PHOTO_CARD_LIST_ERROR, 'error load photocard : ' + err));
    }
  }
}

type mainAction = ReturnType<typeof disfetchGetData>

function main(state:mainContentsState = initialState, action:mainAction): mainContentsState {

  switch (action.type){
    case ContentAction.GET_BANNER_SUCCESS:
      const { data:getBannerList } = action.payload;
      const getBanner = [...state.bannerContentList, ...getBannerList]
      return { ...state, bannerContentList: getBanner }

    case ContentAction.GET_BANNER_ERROR:
      return { ...state, error: action.payload }

    case ContentAction.GET_RECOMMEND_SUCCESS:
      const { data:getRecommendContent } = action.payload;
      const getRecommend = [...state.recommendContentList, ...getRecommendContent]
      return { ...state, recommendContentList: getRecommend} 

    case ContentAction.GET_RECOMMEND_ERROR:
      return { ...state, error: action.payload }

    case ContentAction.GET_TAG_LIST_SUCCESS:
      const { data:getTagList } = action.payload;
      const getTag = [...state.trendTagList, ...getTagList]
      return { ...state, trendTagList: getTag } 

    case ContentAction.GET_TAG_LIST_ERROR:
      return { ...state, error: action.payload }

    case ContentAction.GET_PHOTO_CARD_LIST_SUCCESS:
      const { data:getPhotoCardList } = action.payload;
      const getPhotoCard = [...state.photocardList, ...getPhotoCardList]
      return { ...state, photocardList:getPhotoCard } 

    case ContentAction.GET_PHOTO_CARD_LIST_ERROR:
      return { ...state, error: action.payload }
    default:
      return state
  }
}

export default main;


