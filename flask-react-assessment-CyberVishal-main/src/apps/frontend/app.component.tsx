import React from 'react';
import Comments from './src/components/comments/Comments'; // adjust path if needed

const App: React.FC = () => {
  return (
    <div>
      <h1>Task Comments Module</h1>
      <Comments />
    </div>
  );
};

export default App;
