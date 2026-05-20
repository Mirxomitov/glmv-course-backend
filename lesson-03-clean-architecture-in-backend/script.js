const requests = [];

for (let i = 0; i < 10; i++) {
  requests.push(
    fetch("http://localhost:3000/buy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: 1 }),
    })
  );
}

Promise.all(requests)
  .then(async (responses) => {
    for (const response of responses) {
      console.log(await response.json());
    }
  })
  .catch(console.error);