import React from 'react'
import { User } from './User'
import { Group } from './Group'
import { useGetUserListQuery } from '../features/user/userQuery'
import { useGetGroupListQuery } from '../features/user/groupQuery';
import useToggleBtn from '../hooks/UseToggleBtn';

export const LeftBar = ({setSelectedUser,setSelectedGroup}) => {

  const {data,isLoading} = useGetUserListQuery();
  const {data:groupData,isLoading:isGroupLoading} = useGetGroupListQuery();
  
  const {toggleOn,toggleOff} = useToggleBtn('#chatContainer');
  const {toggleOn:showLeftbar,toggleOff:hideLeftbar} = useToggleBtn('#leftBar');

  console.log(data);
  console.log(groupData);
  return (
    <div id='leftBar' className='active'>

     {isLoading&&<p>Loading...</p>}
     {data?.userList?.map((user,index)=>(
      <User key={index} user={user} setChat={setSelectedUser}
      toggleOn={toggleOn} hideLeftbar={hideLeftbar}
      />
     ))}
     {groupData?.groupList?.map((group,index)=>(
      <Group key={index} group={group} setChat={setSelectedGroup}
      toggleOn={toggleOn} hideLeftbar={hideLeftbar}
      />
     ))}

       
    </div>
  )
}
