import {IRepo, IUserInfo} from "../models/models";
import React, {useState} from "react";


export const UserInfo = ({userInfo, repoInfo}: { userInfo: IUserInfo, repoInfo: any }) => {
    const [search, setSearch] = useState('')

    const filtered = !search
        ? repoInfo
        : repoInfo.filter((rep: IRepo) =>
            rep.name.toLowerCase().includes(search.toLowerCase())
        );

    console.log(repoInfo, ' {rep.name}')

    return (
        <div className='border  justify-around py-3 px-5 rounded hover:shadow-md hover:bg-gray-100 transition-all'>
            <div className='flex'>
                <div>
                    <img className='w-[70px] mr-2' src={userInfo.avatar_url} alt={userInfo.login}/>
                </div>
                <div>
                    <h2 className='text-lg font-bold'>{userInfo.name}</h2>
                    <h2 className='text-lg font-bold'>{userInfo.location}</h2>
                    <h2 className='text-lg font-bold'>folowers: {userInfo.followers}</h2>
                    <h2 className='text-lg font-bold'>following: {userInfo.following}</h2>
                    <h2 className='text-lg font-bold'>{userInfo.bio}</h2>
                </div>
            </div>

            <input
                type="text"
                className='border py-2 px-4 w-full h-[42px] mb-2'
                placeholder="Search for User's Repositoreis"
                value={search}
                onChange={event => setSearch(event.target.value)}
            />
            <ul className='list-none  top-[52px] left-0 right-0 max-h-[200px] overflow-y-scroll shadow-md bg-white'>
                {filtered && filtered.map((rep: IRepo) => (
                    <li key={rep.id} className='flex justify-between m-1 p-1 bg-gray-100'>
                        <p> {rep.name}</p>
                        <div>
                            <div> Forks: {rep.forks_count}</div>
                            <div> Starts: {rep.stargazers_count}</div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
