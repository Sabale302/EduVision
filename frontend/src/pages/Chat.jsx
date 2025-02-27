import React from "react";

const Chat = () => {
  return (
    <div
      style={{
        marginLeft: "250px", // Adds space on the left
        width: "calc(100% - 250px)", // Ensures it fits the remaining width
        height: "100vh", // Makes it full-screen height
      }}
      dangerouslySetInnerHTML={{
        __html: `
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/RA1DCg3ReDnD-ED0rjpU-"
            width="100%"
            style="height: 100%; min-height: 700px; border: none;"
            frameborder="0"
          ></iframe>
        `,
      }}
    />
  );
};

export default Chat;
