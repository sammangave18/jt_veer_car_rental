// const { request, response } = require("express");
const express = require("express");
const main = require("./database/db");
const Demo = require("./database/demo");

// connect with db
main();

// Initialize Express app
const app = express();
app.use(express.json());

app.post('/addCity', (req, res) => {
    const { cid, cname } = req.body;

    // Validate input
     if (typeof cid !== 'number' || !cname) {
        return res.status(400).json({ message: "City ID must be a number and name is required." });
    }

    // Create a new city document
    const newCity = new Demo({ cid, cname });

    // Save the new city to the database
    newCity.save()
        .then(savedCity => {
            return res.status(201).json({ message: "City added successfully", city: savedCity });
        })
        .catch(error => {
            return res.status(500).json({ message: "Failed to add city", error });
        });
});

// finding by name
app.get("/allCity", async (request, response) => {
  const citys = await Demo.find();
  response.status(200).json(citys);
});

// finding by mongo id
app.get("/allCity/:id", async (request, response) => {
  const citys = await Demo.findById(request.params.id);
  response.status(200).json(citys);
});

// finding by city id
// app.get("/allCity/:cid", async (request, response) => {
//     const cid = Number(request.params.cid); // Convert the cid parameter to a number

//     const city = await Demo.findOne({ cid: cid }); // Use findOne to search by cid

//     if (!city) {
//         return response.status(404).json({ message: "City not found" });
//     }
//     response.status(200).json(city); // Return the found city
// });

app.listen(5000, () => {
  console.log("app started on 5000");
});
