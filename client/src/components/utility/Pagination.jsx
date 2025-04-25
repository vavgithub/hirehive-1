import React, { useMemo } from 'react'
import IconWrapper from '../Cards/IconWrapper';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function Pagination({currentPage, pageLimit , totalItems ,setCurrentPage}) {
  const numberOfPages = Math.ceil(totalItems/pageLimit);
  const visiblePages = 4;

  const resultValue = useMemo(()=>
    (currentPage === numberOfPages ? totalItems - ((currentPage-1) * pageLimit) : pageLimit)
  ,[pageLimit,currentPage,numberOfPages,totalItems])

  const getVisibilePageNumbers = useMemo(()=>{
    let pages = Array.from({length : numberOfPages}).map((_,i)=>i + 1);
    if(numberOfPages > visiblePages && (numberOfPages - currentPage) >= visiblePages - 1){
      if(currentPage > visiblePages){
        return pages.slice(currentPage - visiblePages,currentPage)
      }
      return pages.slice(0, visiblePages)
    }else if(numberOfPages > visiblePages && (numberOfPages - currentPage) < visiblePages - 1){
      return pages.slice(-visiblePages)
    }
    return pages
  },[numberOfPages,currentPage])

  return totalItems ? (
    <div className=' flex justify-between'>
      <div>
      <p className='typography-body text-font-gray flex gap-2'>Showing <span className='text-white'>{resultValue} {resultValue > 1 ? " results" : " result"}</span> of <span className='text-white'>{totalItems}</span></p>
      </div>
      <div className='flex items-center gap-4'>
          <div onClick={currentPage > 1 ? ()=> setCurrentPage(prev => prev - 1) : null} className={currentPage > 1 ? "text-white cursor-pointer" : "text-font-gray"}>
            <IconWrapper icon={ChevronLeft} size={0} customIconSize={5} customStrokeWidth={5} />
          </div>
            {
              getVisibilePageNumbers?.map(item =>{
                return <p key={item} onClick={()=>setCurrentPage(item)} className={currentPage === item ? "text-white cursor-pointer" : "text-font-gray cursor-pointer"}>{item}</p>
              })
            }
          <div onClick={currentPage !== numberOfPages ? ()=>setCurrentPage(prev => prev + 1) : null} className={currentPage === numberOfPages ? "text-font-gray" : "text-white cursor-pointer"}>
            <IconWrapper icon={ChevronRight} size={0} customIconSize={5} customStrokeWidth={5} />
          </div>
      </div>
    </div>
  ) : null
}

export default Pagination
