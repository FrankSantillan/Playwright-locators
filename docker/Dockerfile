FROM mcr.microsoft.com/playwright:v1.45.0-jammy

# Set environment variables - MUST match your test.config.ts
ENV DEBIAN_FRONTEND=noninteractive
ENV CI=true
ENV HEADLESS=true
ENV BASE_URL=https://the-internet.herokuapp.com/
ENV TIMEOUT=60000

# Install Java for Allure (required for Allure command-line tool)
RUN apt-get update && \
    apt-get install -y openjdk-11-jre-headless wget && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm ci || npm install

# Copy the rest of the application
COPY . .

# Install Playwright browsers
RUN npx playwright install chromium

# Install Allure command-line tool
RUN npm install -g allure-commandline

# Create directories for reports
RUN mkdir -p test-results/allure-results test-results/allure-report

# Set permissions
RUN chmod -R 777 /app

# Default command to run tests
CMD ["npm", "run", "test"]
