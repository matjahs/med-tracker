import React from 'react';

async function getData() {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon`, { next: { revalidate: 20 } });
  if(res.status !== 200) {
    throw new Error(res.statusText);
  }
  const { results } = await res.json();

  return results;
}

export default async function Page() {
  const data = await getData();
  return (
    <p>
      {data[0].name}
    </p>
  );
}
