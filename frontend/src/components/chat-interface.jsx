/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { Input } from "./Input";
import { Button } from "./Button";
// Custom hook to simulate chat behavior, modify based on your requirements
const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleInputChange = (e) => setInput(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { id: Date.now().toString(), role: "user", content: input }]);
      setInput(""); // Clear input field after submission
    }
  };

  return { messages, input, handleInputChange, handleSubmit, setMessages };
};

export function ChatInterface() {
  const [fileContent, setFileContent] = useState(null);
  const { messages, input, handleInputChange, handleSubmit, setMessages } = useChat();
  const scrollAreaRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleFileAnalysis = async (content) => {
    setFileContent(content);
    setIsUploading(true);
  
    setMessages([
      ...messages,
      {
        id: Date.now().toString(),
        role: "user",
        content: "I uploaded a file for analysis.",
      },
    ]);
  
    try {
      const eventSource = new EventSource(`/api/analyze?content=${encodeURIComponent(content)}`);
  
      eventSource.onmessage = (event) => {
        console.log("Received event data:", event.data);
        try {
          const result = JSON.parse(event.data);
          
          if (result.chartData) {
            setMessages((prev) => [
              ...prev,
              {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: result.analysis || 'Here is the analysis result:',
                visualization: result.chartData,
              },
            ]);
          }
        } catch (error) {
          console.error("Error parsing event data:", error);
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now().toString(),
              role: "assistant",
              content: "Sorry, I encountered an error while processing the analysis data.",
            },
          ]);
        }
      };
  
      eventSource.onerror = (error) => {
        console.error("Error with EventSource:", error);
        setIsUploading(false);
        
        // Enhanced error response
        if (error instanceof ErrorEvent) {
          console.error("EventSource Error details:", error.message);
        } else {
          console.error("Unknown EventSource error:", error);
        }
  
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            role: "assistant",
            content: "Sorry, I encountered an error while analyzing the file.",
          },
        ]);
      };
    } catch (error) {
      console.error("Error analyzing file:", error);
      setIsUploading(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: "Sorry, I encountered an error while analyzing the file.",
        },
      ]);
    }
  };
  

  return (
    <>
        <div className="overflow-y-auto p-4" ref={scrollAreaRef}>
          <div className="space-y-4 max-w-4xl mx-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`p-4 rounded-md ${
                  message.role === "user" ? "bg-blue-100" : "bg-gray-100"
                }`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
            ))}
          </div>
      </div>
      <div className="border-t bg-background p-4">
        <div className="max-w-4xl mx-auto flex flex-col gap-2">
          <div className="flex justify-between items-center border p-4 rounded-md">
            <Input 
                type="file" 
                name="fileUpload"
                onChange={(e) => handleFileAnalysis(e.target.files[0])} 
                disabled={isUploading}
                className="border rounded-md p-2"
            />
          </div>
          <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full">
                <Input
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Type a message..."
                    name="message"
                    required
                    className="w-full rounded-md border border-gray-30 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button 
                    type="submit" 
                    className="p-3 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
                >
                    <Send className="h-5 w-5" />
                    <span className="sr-only">Send</span>
                </Button>
            </form>
        </div>
      </div>
    </>  
  );
}
