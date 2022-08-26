import React, {useEffect, useState} from 'react';
import {useLazyGetReposQuery, useLazyGetUserInfoQuery, useSearchUsersQuery} from "../store/github/github.api";
import {useDebounce} from "../hooks/debonce";
import {UserInfo} from "../components/UserInfo";


function HomePage() {
    const [search, setSearch] = useState('')
    const [dropdown, setDropdown] = useState(false)
    const debounced = useDebounce(search)
    const {isLoading, isError, data: users} = useSearchUsersQuery(debounced, {
        skip: debounced.length < 2,
        refetchOnFocus: true
    })


    useEffect(() => {
        setDropdown(debounced.length > 3 && users?.length! > 3)
    }, [debounced, users])


    const [fetchInfo, {isLoading: loadingUser, data: userInfo}] = useLazyGetUserInfoQuery()
    const [fetchRepo, {isLoading: loadingRepo, data: repoInfo}] = useLazyGetReposQuery()


    const handlerUser = (username: string) => {
        fetchInfo(username)
        fetchRepo(username)
        setDropdown(false)
        console.log(repoInfo)
    }


    return (
        <div className='flex justify-center pt-10 mx-auto'>
            {isError && <p className='text-center text-red-500'>Something went wrong</p>}
            <div className='relative w-[500px]'>
                <input
                    type="text"
                    className='border py-2 px-4 w-full h-[42px] mb-2'
                    placeholder='Search for Users'
                    value={search}
                    onChange={event => setSearch(event.target.value)}
                />
                {dropdown &&
                    <ul className='list-none absolute top-[52px] left-0 right-0 max-h-[200px] overflow-y-scroll shadow-md bg-white'>
                        {isLoading && <p className='text-center'>Loading..</p>}
                        {users?.map((user) => (
                            <li
                                key={user.id}
                                onClick={() => handlerUser(user.login)}
                                className='flex py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer'>
                                <img className='w-[30px] mr-2' src={user.avatar_url} alt={user.login}/>
                                <p>{user.login}</p>
                            </li>
                        ))}
                    </ul>
                }
                <div className="container">
                    {loadingUser && <p className='text-center'>loading info...</p>}
                    { userInfo &&
                        <UserInfo
                            userInfo={userInfo}
                            repoInfo={repoInfo}
                        />}
                </div>
            </div>
        </div>
    );
}

export default HomePage;
