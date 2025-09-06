# Stage 1: Build application

# 1. Copy project files
# 2. Run pnpm install
# 3. Run pnpm build

# --- Improve version
# 1. Copy only package.json and pnpm-lock.yaml
# 2. Run pnpm install
# 3. Copy project files
# 4. Run pnpm build
# 5. Run pnpm install --prod (?)


# Stage 2: Copy build application to final image

# 1. Copy all build files from Stage 1
# 2. Set entrypoint or set cmd

# ----
# Stage 1: Build application
FROM node:lts-alpine AS builder

RUN apk add --no-cache openssl

# Install pnpm
RUN npm install -g pnpm@latest

# Working directory
WORKDIR /app

# 1. Copy only package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma/

# 2. Run pnpm install
RUN pnpm install

# 3. Copy all project's files
COPY . .

# 4. Run prisma generate
RUN npx prisma generate

# 5. Run pnpm build
RUN pnpm build


# Stage 2: Copy build application to final image

FROM node:lts-alpine AS production

WORKDIR /app

# 1. Copy all build files from Stage 1
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.env ./.env
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/generated ./generated

# 2. Set entrypoint or set cmd

EXPOSE 3000
CMD [ "node", "dist/main" ]
