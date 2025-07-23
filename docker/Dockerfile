FROM mcr.microsoft.com/playwright:v1.45.0-jammy

WORKDIR /app

COPY . .

RUN npm install
RUN npx playwright install --with-deps

CMD ["npm", "run", "test"]
