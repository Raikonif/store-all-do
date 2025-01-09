# Step 1: Use the official Node.js image as the base image
FROM node:22

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json or yarn.lock to the working directory
COPY package.json .
COPY yarn.lock .

# Step 4: Install dependencies using npm or yarn based on what's available
RUN if [ -f yarn.lock ]; then \
    yarn install --frozen-lockfile; \
    else \
    npm install; \
    fi

# Step 5: Copy the rest of the application files into the container
COPY . .

# Step 6: Build the React app for production
RUN if [ -f yarn.lock ]; then \
    yarn build; \
    else \
    npm run build; \
    fi

# Step 7: Expose the port the app will run on
EXPOSE 3000

# Step 8: Start the app using yarn if it's available, otherwise npm
CMD if [ -f yarn.lock ]; then \
    yarn start; \
    else \
    npm start; \
    fi
