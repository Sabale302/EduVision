import { Helmet } from "react-helmet-async";
import { ChatInterface } from "../components/chat-interface";

const ChatPage = () => {
  return (
    <div className="border-black w-auto">
      <div className="p-5 rounded shadow-lg">
        {/* Metadata Setup */}
        <Helmet>
            <title>AI Chat Analysis</title>
            <meta name="description" content="Upload and analyze files with AI" />
        </Helmet>

        {/* Chat Interface */}
        <ChatInterface />
      </div>
    </div>
  );
};

export default ChatPage;
