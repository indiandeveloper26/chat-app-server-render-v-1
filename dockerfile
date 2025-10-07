# ✅ Base image
FROM node

# ✅ Set working directory
WORKDIR /app

# ✅ Copy package files
COPY package*.json ./

# ✅ Install dependencies
RUN npm install

# ✅ Copy source code
COPY . .

# ✅ Expose port
EXPOSE 4000

# ✅ Start server
CMD ["node", "today.js"]
