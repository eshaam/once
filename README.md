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
# Response: 200 OK
```

## SSL and HTTPS Setup

The application includes nginx configuration for SSL/HTTPS support:

### Quick Start with SSL

```bash
# Start with nginx and SSL (using self-signed certificates)
docker-compose up -d

# Access via HTTPS (accept self-signed certificate warning)
curl -k https://localhost:9443/up
```

### Production SSL Setup

For production deployment with Cloudflare, see [SSL_SETUP.md](SSL_SETUP.md) for:
- Let's Encrypt certificate setup
- Cloudflare Origin certificate configuration
- Security best practices
- Troubleshooting guide

### Cloudflare Integration

To fix Cloudflare SSL handshake errors (Error 525):

1. **Option 1: Use nginx with SSL (Recommended)**
   - Set up proper SSL certificates
   - Configure nginx as reverse proxy
   - Set Cloudflare SSL mode to "Full (Strict)"

2. **Option 2: Change Cloudflare SSL Mode**
   - Go to Cloudflare Dashboard → SSL/TLS → Overview
   - Change to "Flexible" mode
   - Note: Less secure, only for testing

## GitHub Repository

- Repository: https://github.com/eshaam/once
- Container Registry: `ghcr.io/eshaam/once:latest`

**Note**: Access the container image through Docker CLI for reliable operation. The GitHub Packages interface may show a 404, but the Docker registry is fully functional.

## License

MIT License
