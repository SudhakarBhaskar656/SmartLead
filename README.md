SmartLead Backend (Node.js + Express + MongoDB)

This is the backend of the SmartLead Automation System.
It handles:

Batch name processing
Nationality prediction via external API
Business logic classification
MongoDB storage
Background cron-based syncing (idempotent)



Tech Stack

Node.js
Express.js
MongoDB (Mongoose)
Axios
Node-Cron
Dotenv
Nodemon

Installation & Setup


Clone repo & navigate to backend
git clone https://github.com/sudhakarbhaskar656/SmartLead.git
cd smartlead/backend


Install dependencies

npm install

Create .env file

DATABASE_URL=your_mongodb_atlas_url
PORT=5000

Start the server
npm start
