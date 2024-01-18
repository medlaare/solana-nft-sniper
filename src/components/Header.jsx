import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PhantomButton } from 'wallet-connect-buttons';
import logo from 'assets/img/solana-logo.png';

const Header = () => {
    const navigate = useNavigate();
    const inputDom = useRef();
    const [query, setQuery] = useState('');
    const [publicKey, setPublicKey] = useState('');

    const onChange = e => setQuery(e.target.value);
    const onKeyDown = e => {
        e.stopPropagation();
        if (e.keyCode === 13) {
            if (e.target.value.trim()) navigate('/?q=' + e.target.value.trim());
            else navigate('/');
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', (e) => {
            if (e.keyCode === 191) {
                e.preventDefault();
                inputDom.current.focus();
            }
        })
        return () => window.removeEventListener('keydown', null);
    }, []);

    return (
        <div className='container flex items-center justify-between py-2 mx-auto'>
            <Link to='/'>
                <img src={logo} className='w-10 h-10' alt='' />
            </Link>
            <div className='flex items-center gap-3'>
                <div className='relative flex items-center gap-3'>
                    <div>Search:</div>
                    <input value={query} onChange={onChange} onKeyDown={onKeyDown} ref={inputDom} type='text' placeholder='Search collections..' className='px-3 py-1 bg-transparent border rounded-md outline-none w-96 focus:border-green-600 caret-green-600' />
                    <span className='absolute px-2 font-bold bg-green-700 border rounded right-1'>/</span>
                </div>
                {
                    publicKey ?
                        <div className='text-lg font-bold text-green-500'>{publicKey.slice(0, 4)}...{publicKey.slice(-4)}</div>:
                        <PhantomButton backgroundColor='#262626' setPublicKey={setPublicKey} />
                }
            </div>
        </div>
    )
}

export default Header;