# Once - Hello World Application

A simple Hello World web application with health check functionality, served directly by nginx with SSL support.

## Features

- Lightweight nginx web server
- Health check endpoint at `/up` (returns "OK" with 200 status)
- Serves static HTML content
- SSL/HTTPS support out of the box
- Containerized with Docker
- Available on GitHub Container Registry

## Quick Start

### Using Docker Compose

```bash
# Clone the repository
git clone https://github.com/eshaam/once.git
cd once

# Start with SSL support
docker-compose up -d

# Access the application
# HTTP: http://localhost:9080/ (redirects to HTTPS)
# HTTPS: https://localhost:9443/
# Health check: https://localhost:9443/up
```

### Using Docker

```bash
# Pull the nginx image
docker pull ghcr.io/eshaam/once-nginx:latest

# Run the container
docker run -p 9080:80 -p 9443:443 ghcr.io/eshaam/once-nginx:latest
```

### From Source (Development)

```bash
# Generate SSL certificates
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout ssl-key.pem -out ssl-cert.pem \
  -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"

# Build and run
docker build -f Dockerfile.simple -t once-nginx .
docker run -p 9080:80 -p 9443:443 once-nginx
```

## API Endpoints

- `GET /` - Returns the Hello World HTML page
- `GET /up` - Health check endpoint (returns `{"status":"OK"}` JSON with 200 status)
- `GET /health` - Detailed health check endpoint (returns JSON with status and timestamp)

## Docker Images

The containerized versions are available at:
- **Nginx SSL Setup**: `ghcr.io/eshaam/once-nginx:latest` (recommended)
- **Legacy Node.js**: `ghcr.io/eshaam/once:latest` (deprecated)

### Pull and Run

```bash
# Pull the nginx image (recommended)
docker pull ghcr.io/eshaam/once-nginx:latest

# Run the container with SSL
docker run -p 9080:80 -p 9443:443 ghcr.io/eshaam/once-nginx:latest
```

## Health Check

The application includes health check endpoints that can be used for monitoring:

```bash
# Basic health check (Rails-style JSON response)
curl -k https://localhost:9443/up
# Response: {"status":"OK"}

# Detailed health check
curl -k https://localhost:9443/health
# Response: {"status":"OK","timestamp":"2026-03-16T21:58:18.135Z"}
```

## SSL and HTTPS Setup

The application includes nginx with SSL/HTTPS support:

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
   - Configure nginx SSL mode
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
