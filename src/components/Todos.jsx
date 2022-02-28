import React from 'react';

function Todos({ todo }) {
  console.log('render comp');
  return <div> Todos {todo}</div>;
}

export default React.memo(Todos);
