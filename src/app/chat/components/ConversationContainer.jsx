'user client'
import { Message,MessageSeparator,ConversationHeader,MessageInput,MessageList,Avatar,StarButton,VoiceCallButton,VideoCallButton,InfoButton,TypingIndicator} from '@chatscope/chat-ui-kit-react';
import 'D:/Web dev/next_js/real_time_chat_app/src/themes/default/main.scss';
import messages from './messages.json';

export default function ConversationContainer() {
    return (
        //ConversationHeader component
        <>
            <ConversationHeader>
            <ConversationHeader.Back />
            <Avatar
                name="Emily"
                src="/images/dp.avif"
            />
            <ConversationHeader.Content
                info="Active 10 mins ago"
                userName="Emily"
            />
            <ConversationHeader.Actions>
                
            </ConversationHeader.Actions>
            </ConversationHeader>
            
            {//MessageList component
            }
             <MessageList style={{height: "500px"}}
                 typingIndicator={<TypingIndicator content="Eliot is typing" />}>
                {messages.map((m,i) => m.type === "separator" ? <MessageSeparator key={i} {...m.props} /> : <Message key={i} {...m.props} />)}
            </MessageList>
            {//MessageInput component
            }
            <MessageInput
                autoFocus
                placeholder="Type message here..."
            />
            
        </>

        
        
    )
}