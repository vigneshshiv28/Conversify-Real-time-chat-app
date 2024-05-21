'use client'
import Navbar from "./components/Navbar";
import ChatList from "./components/ChatList";
import ConversationContainer from "./components/ConversationContainer";

const Index = () => {
  return (
    <div className="flex flex-row h-screen">
      <div > 
        <Navbar />
      </div>
      <div > 
        <ChatList />
      </div>
      <div className=" w-full">
        <ConversationContainer />
      </div>  
    </div>
  );
};

export default Index;
