import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import NFTDetail from 'components/NFTDetail';
import InfiniteScroll from 'react-infinite-scroll-component';

function Home() {
	const pageSize = 20;
	const [collections, setCollections] = useState([]);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [params] = useSearchParams();

	const fetch = () => {
		axios.get(`https://api.coralcube.io/v1/getCollections?offset=${page * pageSize}&page_size=${pageSize}&name=${params.get('q') || ''}`)
			.then(res => {
				setCollections(collections.concat(res.data));
				setPage(page + 1);
				res.data.length < pageSize && setHasMore(false);
			})
			.catch(console.error);
	}

	useEffect(() => {
		setCollections([]);
		setPage(1);
		setHasMore(true);
		axios.get(`https://api.coralcube.io/v1/getCollections?offset=0&page_size=${pageSize}&name=${params.get('q') || ''}`)
			.then(res => {
				setCollections(res.data);
				res.data.length < pageSize && setHasMore(false);
			})
			.catch(console.error);
	}, [params]);

	return (
		<div className='container min-h-screen pb-5 mx-auto'>
			<InfiniteScroll dataLength={collections.length} next={fetch} hasMore={hasMore} className='grid grid-cols-5 gap-5 mt-5'>
				{
					collections.map((col, key) => <NFTDetail collection={col} key={key} />)
				}
			</InfiniteScroll>
		</div>
	);
}

export default Home;
