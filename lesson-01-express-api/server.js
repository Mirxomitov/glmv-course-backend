require("dotenv").config();

const express = require("express")
const app = express()
app.use(express.json())

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    next()
})

const PORT = process.env.PORT;
let users = []
let user_id = 1 

app.get("/", (req, res) => {
    res.json({message: "API is working"})
})

app.get("/users", (req, res) => {
    if (users.length > 1) {
        res.json({data: users})
    } else {
        res.status(500).json({error: "Should have at least two users"})
    }
})

app.post("/users", (req, res) => {
   const { name, role } = req.body;

   if (!name || !role) {
     return res.status(400).json({ error: "Name and role are required" });
   }

   const newUser = {
    id: user_id++,
    name: name,
    role: role,
   }

   users.push(newUser)
   res.json(newUser).status(201).message("User created")
});

// parallel request bo'lganda birini tugatib keyingisiga o'tarkan
app.get("/slow", async (req, res) => {
    console.log("Slow request started")

    await new Promise(resolve => setTimeout(resolve, 2000))

    console.log("Slow request finished")

    res.json({
        message: "Finished after 2 seconds"
    })
})

app.get('/health', (req, res) => {
    res.json({status: "ok"})
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});