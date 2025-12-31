require('dotenv').config();

console.log("🔧 Testing MongoDB Connection...");
console.log("Environment:", process.env.NODE_ENV);
console.log("MongoDB URI (hidden):", 
    process.env.MONGODB_URI ? 
    process.env.MONGODB_URI.replace(/:[^:@]*@/, ':****@') : 
    'Not found'
);

const mongoose = require('mongoose');

async function testConnection() {
    try {
        console.log("\n🔄 Attempting to connect...");
        
        // Remove options for newer Mongoose
        await mongoose.connect(process.env.MONGODB_URI);
        
        console.log("✅ Success! Connected to MongoDB Atlas");
        console.log(`📁 Database: ${mongoose.connection.db.databaseName}`);
        console.log(`📍 Host: ${mongoose.connection.host}`);
        
        // List collections
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log(`📚 Collections (${collections.length}):`);
        collections.forEach(col => console.log(`   - ${col.name}`));
        
        await mongoose.disconnect();
        console.log("\n✅ Test completed successfully!");
        process.exit(0);
        
    } catch (error) {
        console.error("\n❌ Connection failed!");
        console.error("Error:", error.message);
        console.error("\n🔍 Troubleshooting tips:");
        console.error("1. Check if MongoDB Atlas IP whitelist includes 0.0.0.0/0");
        console.error("2. Verify username/password in connection string");
        console.error("3. Check if special characters in password are URL encoded");
        console.error("4. Wait 2-3 minutes after creating database user");
        
        process.exit(1);
    }
}

testConnection();