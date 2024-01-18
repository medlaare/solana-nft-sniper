import React from 'react';
import { Link } from 'react-router-dom';
import ReactImageAppear from 'react-image-appear';

const style = {
    display: '-webkit-box',
    overflow: 'hidden',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 1
}

const NFTDetail = ({ collection }) => {
    if(!collection) return null;
    return (
        <Link to={'/collection/' + collection.symbol} className='px-5 py-3 transition-all duration-200 rounded-md shadow-md hover:shadow-lg hover:-translate-y-1 bg-neutral-800'>
            <div className='flex items-center flex-1'>
                <ReactImageAppear src={'https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/' + collection.image} placeholderStyle={{ backgroundColor: '#262626' }} className='w-full rounded-md min-h-[100px]' alt='' />
            </div>
            <div className='flex flex-col pt-3'>
                <div className='font-bold text-green-400' style={style}>{collection.name}</div>
                <div className='pt-2 text-sm text-gray-300'>Floor price: @{collection.floor_price / 1000000000}</div>
                <div className='text-sm text-gray-300'>Volume: @{collection.volume.toLocaleString()}</div>
                <div className='text-sm text-gray-300'>Listed: {collection.listed_count}</div>
            </div>
        </Link>
    )
}

export default NFTDetail;
