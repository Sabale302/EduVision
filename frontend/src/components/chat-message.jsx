import { Bot, User } from "lucide-react";
import { DataVisualization } from "./data-visualization";
import PropTypes from 'prop-types';

export function ChatMessage({ message }) {
  const isAssistant = message.role === "assistant";

  // Check if the message contains visualization data
  const hasVisualization = message.content.includes('{"chartData":');
  let visualizationData = null;

  if (hasVisualization) {
    try {
      // Extract the JSON data from the message
      const jsonMatch = message.content.match(/({"\w+":[\s\S]*?})/);
      if (jsonMatch) {
        visualizationData = JSON.parse(jsonMatch[0]);
      }
      // Remove the JSON data from the displayed message
    } catch (error) {
      console.error("Error parsing visualization data:", error);
    }
  }

  return (
    <div className={`flex items-start gap-4 rounded-lg p-4 ${isAssistant ? "bg-muted/50" : "bg-background"}`}>
      <div
        className={`rounded-full p-2 w-8 h-8 flex items-center justify-center ${isAssistant ? "bg-primary/10" : "bg-muted"}`}
      >
        {isAssistant ? <Bot className="h-4 w-4 text-primary" /> : <User className="h-4 w-4" />}
      </div>
      <div className="flex-1 space-y-4">
        <div className="prose dark:prose-invert">
          {message.content.split("\n").map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
        {visualizationData && <DataVisualization data={visualizationData} />}
      </div>
    </div>
  );
}

ChatMessage.propTypes = {
  message: PropTypes.shape({
    role: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
};
