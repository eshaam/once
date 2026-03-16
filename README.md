# Once - Hello World Application

A simple Hello World web application with health check functionality, containerized and ready for deployment.

## Features

- Simple Express.js web server
- Health check endpoint at `/up`
- Serves static HTML content
- Containerized with Docker
- Available on GitHub Container Registry

## Quick Start

### Using Docker

```bash
docker run -p 3000:3000 ghcr.io/eshaam/once:latest
```

### From Source

```bash
# Install dependencies
npm install

# Start the server
npm start
```

The application will be available at `http://localhost:3000`

## API Endpoints

- `GET /` - Returns the Hello World HTML page
- `GET /up` - Health check endpoint (returns "ok" with 200 status)

## Docker Image

The containerized version is available at:
```
ghcr.io/eshaam/once:latest
```

### Pull and Run

```bash
# Pull the image
docker pull ghcr.io/eshaam/once:latest

# Run the container
docker run -p 3000:3000 ghcr.io/eshaam/once:latest
```

## Development

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm start
```

### Building Docker Image Locally

```bash
docker build -t once:latest .
docker run -p 3000:3000 once:latest
```

## Health Check

The application includes a health check endpoint that can be used for monitoring:

```bash
curl http://localhost:3000/up
# Response: ok
```

## GitHub Repository

- Repository: https://github.com/eshaam/once
- Container Registry: `ghcr.io/eshaam/once:latest`

**Note**: Access the container image through Docker CLI for reliable operation. The GitHub Packages interface may show a 404, but the Docker registry is fully functional.

## License

MIT License
