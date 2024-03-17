/* eslint-disable react/prop-types */

const Message = ({ message, isSent }) => {
  return (
    <div className={isSent ? 'flex justify-end' : 'flex justify-start'}>
      <div className={isSent ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} style={{maxWidth: '70%'}}>
        <p className="p-3">{message}</p>
      </div>
    </div>
  );
};

export default Message;
