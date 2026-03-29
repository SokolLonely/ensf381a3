import React from 'react';

function DisplayStatus({ type, message }) {
  const color = type === 'success' ? 'green' : 'red';

  return (
    <div style={{ color, fontWeight: 'bold', marginTop: '10px' }}>
      {message}
    </div>
  );
}

export default DisplayStatus;