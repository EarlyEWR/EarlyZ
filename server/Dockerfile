# ----------- Builder Stage -----------
FROM node:22-alpine AS builder

# Create app directory
WORKDIR /app

# Install OS packages needed for native deps (bcrypt, etc.)
RUN apk add --no-cache git bash curl nodejs npm

# Copy dependency definitions first for better layer caching
COPY package.json package-lock.json ./

# Install dependencies (including dev deps for prisma)
RUN npm ci

# Copy the rest of the source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# ----------- Production Stage -----------
FROM node:22-alpine AS runner

# Create non-root user
RUN addgroup -S app && adduser -S app -G app
USER app

WORKDIR /app

# Copy only needed files from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/src ./src
COPY --from=builder /app/server.js ./
COPY --from=builder /app/package.json ./

ENV NODE_ENV=production
ENV SERVER_PORT=3000

EXPOSE 3000

CMD ["node", "server.js"]
