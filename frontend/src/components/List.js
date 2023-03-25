import React from 'react'
import 'boxicons';
import {default as api} from '../store/apiSlice';

import {AiFillDelete} from 'react-icons/ai'

export default function List() {

    const { data, isFetching , isSuccess, isError } = api.useGetLabelsQuery()
    let Transactions;
 
    const handlerClick = (e) => {
        e.preventDefault();
        if(!e.target.dataset.id) return 0;
    
    }

    if(isFetching){
        Transactions = <div>Fetching</div>;
    }else if(isSuccess){
        Transactions = data.map((v, i) => <Transaction key={i} category={v} handler={handlerClick} ></Transaction>);
    }else if(isError){
        Transactions = <div>Error</div>
    }

  return (
    <div className="flex flex-col py-6 gap-3">
        <h1 className='py-4 font-bold text-xl'>History</h1>
        <div className="item flex justify-center bg-gray-50 py-2 rounded-r" style={{ borderRight : "8px solid #e5e5e5"}}>
            
            <span className='twtwo' style={{ color :"#e5e5e5"}}>#</span>
            <span className='block w-full '>Type</span>
           
            <span className='block w-full'>Name</span>
            <span className='block w-full'>Amount</span>
            <span className='block w-full'>Date</span>
          
            <span className='block w-full'>Option</span>   
        </div>
        {Transactions}
        
    </div>
  )
}

function Transaction({ category, handler }){

    const deleteProduct= async(id)=>{
        let result = await fetch(`http://localhost:8080/api/transaction/${id}`,{
            method: 'Delete',
           
        })
        result = await result.json();
        if(result){
            alert("Record is deleted");
        }
    }
    
    if(!category) return null;
    return (
        <>
   
        <div className="item flex justify-center bg-gray-50 py-2 rounded-r" style={{ borderRight : `8px solid ${category.color ??  "#e5e5e5"}`}}>
            
            <span className='twtwo' style={{ color : ` ${category.color ??  "#e5e5e5"}`}}>#</span>
            <span className='block w-full '>{category.type ?? ''}</span>
           
            <span className='block w-full'>{category.name ?? ''}</span>
            <span className='block w-full'>{category.amount ?? ''}</span>
            <span className='block w-full'>{category.date.slice(0,10) ?? ''}</span>
            
            <form  className='block w-full'>
            <button   type='submit' onClick={()=> deleteProduct(category._id)}>
                <AiFillDelete color={category.color ??  "#e5e5e5"} fontSize='20px' /></button>
            </form>
            
        </div>
        </>
    )
}