'use client'
import { useState } from 'react';
import userData from './user.json';
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { Conversation,Avatar } from '@chatscope/chat-ui-kit-react';
import 'D:/Web dev/next_js/real_time_chat_app/src/themes/default/main.scss';



export default function ChatList() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchQuery(e.target.value);
    };

    const filteredUsers = userData.friends.filter(friend => 
        friend.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
        <div className='w-80'>    
            <div className="flex items-center justify-between w-full border-b-2 border-gray-400">
                <input
                    
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-full bg-transparent outline-none"
                />
            </div>
            <div>
                <ul>
                    {filteredUsers.map((friend, index) => (
                        
                        <Conversation
                        key={index}
                        active = {selectedUser === friend.id}
                        //className=' mb-1 hover:bg-black'
                        info="Yes, i can do it for you"
                        lastActivityTime={<span style={{color: 'teal'}}>43 min</span>}
                        lastSenderName="Joe"
                        name={friend.name}
                        unreadCnt={4}
                        style={{
                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
                            transition: 'all 300ms',
                            
                          }}
                      >
                        <Avatar
                          name="Joe"
                          src="/images/dp.avif"
                        />
                      </Conversation>
                    
                    ))}
                </ul>
            </div>
        </div>
        </>
    );
}

