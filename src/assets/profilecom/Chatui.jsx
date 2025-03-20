import { useMessages } from "./UseMessages";

const Chat = () => {
  const messages = useMessages();

  return (
    <div>
      {messages.map((msg) => (
        <div key={msg.id}>
          <strong>{msg.user}:</strong> {msg.text}
        </div>
      ))}
    </div>
  );
};

export default Chat;
