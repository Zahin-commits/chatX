import React from 'react'
import { User } from './User'
import { Group } from './Group'
import { useGetUserListQuery } from '../features/user/userQuery'
import { useGetGroupListQuery } from '../features/user/groupQuery';

export const LeftBar = ({setSelectedUser,setSelectedGroup}) => {

  const {data,isLoading} = useGetUserListQuery();
  const {data:groupData,isLoading:isGroupLoading} = useGetGroupListQuery();

  console.log(data);
  console.log(groupData);
  return (
    <div id='leftBar'>

     {isLoading&&<p>Loading...</p>}
     {data?.userList?.map((user,index)=>(
      <User key={index} user={user} setChat={setSelectedUser}/>
     ))}

     {groupData?.groupList?.map((group,index)=>(
      <Group key={index} group={group} setChat={setSelectedGroup}/>
     ))}

       
    </div>
  )
}
