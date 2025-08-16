const mongoose = require("mongoose");
const University = require("../models/University"); // Adjust the path as necessary
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)

     
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    }
};

const universities = [
  {
    title: " Australia has a reputation for an innovative and research-intensive culture ",
    country: "Australia",
    description: "If you are interested in studying in Australia then you are taking one step closer towards choosing a truly fruitful academic experience. Australia is a fully developed, growing economy with a safe, tolerant and multicultural society. Students will find studying in Australia a relaxed, welcoming and engaging environment that is unique in the native English speaking world.",
    features: [
      { title: "Quality in Education", description: "Australia's commitment to education excellence, innovative teaching, and cutting-edge research fosters high-quality learning, preparing students for future success." },
      { title: "Good Potential For Employment After Course Completion.", description: "These courses open doors to diverse job opportunities. Skills gained lead to promising career prospects in various industries." }
    ]
  },
];

// async function populateUniversities() {
//   try {
//     await University.deleteMany(); // optional: clear existing data
//     const inserted = await University.insertMany(universities);
//     console.log("Universities added:", inserted);
//     mongoose.connection.close();
//   } catch (err) {
//     console.error(err);
//   }
// }

// populateUniversities();

module.exports = connectDB;