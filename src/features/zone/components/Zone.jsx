
import  { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import Bar from '../../common/Bar';
import './Zone.css';

const Zone = () => {
  const [requests, setRequests] = useState([]);
  const [signals, setSignals] = useState([]);

  useEffect(() => {
    const initialRequests = [
      {
        _id: 1,
        user_id: 'John Doe',
        request: 'I need a hammer',
        description: 'I need a hammer to fix my chair',
      },
      {
        _id: 2,
        user_id: 'Jane Doe',
        request: 'I need a screwdriver',
        description: 'I need a screwdriver to fix my table',
      },
    ];

    setRequests(initialRequests);

    const signalInterval = setInterval(() => {
      setSignals(prevSignals => [...prevSignals, { id: Date.now() }]);
    }, 5000);

    return () => clearInterval(signalInterval);
  }, []);

  const signalAnimation = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    reset: true,
    reverse: signals.length % 2 === 0, // Reverse animation every other signal
    onRest: () => setSignals(prevSignals => prevSignals.slice(1)), // Remove the oldest signal
  });

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className="mb-8 relative w-full h-full flex items-center justify-center">
        <Bar />
        {signals.map((signal, index) => (
          <animated.div
            key={signal.id}
            className="wifi-signal"
            style={{
              ...signalAnimation,
              zIndex: index + 1,
            }}
          ></animated.div>
        ))}
      </div>

      {/* Display fetched requests */}
      <div className="mt-8">
        <h1 className="text-2xl font-bold text-white">Latest Requests</h1>
        <ul className="text-white">
          {requests.map(request => (
            <li key={request._id}>
              {request.user_id}: {request.request} - {request.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Zone;





  