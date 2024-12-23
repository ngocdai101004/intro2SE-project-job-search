# intro2SE-project-job-search

# How to run

1. Make sure that you have installed Node.js (v22.12.0) and MongoDB
2. Clone the repository
3. Run `npm install` in both backend and frontend directories
4. Create a `.env` file in the backend directory and add the following variables:

 ```dotenv
PORT=3200
MONGO_URI=mongodb://localhost:27017/job_search
JWT_SECRET=secret
JWT_EXPIRE=30d
EMAIL_USER=votuan.hcmus.it@gmail.com
EMAIL_PASS="yotx rbew weiz crvx"
 ```

5. Run `npm run dev` in the backend and frontend directories

# Add mock data

1. Go to 'backend/src/data' directory
2. Modify the '*.ts' files. Those are mock data files
3. Run `npm run build` to transpile the TypeScript files to JavaScript
4. Run `npm run data:import` to import the mock data to the database
5. Mock data should be added to the database. You can check it by using MongoDB Compass or MongoDB shell

You should add mock data whenever you introduced a new feature or fixed a bug to make sure that the application works
correctly.
