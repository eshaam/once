# SSL Setup Guide for Production

This guide will help you set up proper SSL certificates for production use with Cloudflare.

## Current Setup (Self-Signed Certificates)

Your current setup uses self-signed SSL certificates, which works for testing but will cause browser warnings in production.

## Production SSL Setup Options

### Option 1: Let's Encrypt (Free & Recommended)

1. **Install Certbot:**
```bash
# Ubuntu/Debian
sudo apt install certbot

# CentOS/RHEL
sudo yum install certbot
```

2. **Generate SSL Certificate:**
```bash
# Replace yourdomain.com with your actual domain
sudo certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com
```

3. **Update SSL file paths in docker-compose.yml:**
```yaml
nginx:
  volumes:
    - /etc/letsencrypt/live/yourdomain.com/fullchain.pem:/etc/nginx/ssl/cert.pem
    - /etc/letsencrypt/live/yourdomain.com/privkey.pem:/etc/nginx/ssl/key.pem
```

### Option 2: Cloudflare Origin Certificate

1. **Generate Origin Certificate in Cloudflare:**
   - Go to Cloudflare Dashboard → SSL/TLS → Origin Server
   - Click "Create Certificate"
   - Download the certificate and private key

2. **Place certificates in project:**
```bash
mkdir -p ssl
# Place Cloudflare cert and key in ssl/ directory
```

3. **The current setup already supports this - just replace the SSL files.**

## Cloudflare Configuration

### For Production with SSL:

1. **Set Cloudflare SSL Mode to "Full (Strict)":**
   - Cloudflare Dashboard → SSL/TLS → Overview
   - Select "Full (strict)"
   - This ensures Cloudflare validates your origin certificate

2. **Update DNS Records:**
   - Point your A record to your server's IP address
   - Proxy should be enabled (orange cloud icon)

3. **Configure Origin Server:**
   - Ensure nginx is accessible on port 443
   - Firewall should allow HTTPS traffic (port 443)
   - Update ports in docker-compose.yml to standard ports:
   ```yaml
   ports:
     - "80:80"
     - "443:443"
   ```

## Deployment Steps

### 1. Update nginx.conf for Production:

Replace the upstream server configuration:
```nginx
upstream nodejs_app {
    server once:3000;
    keepalive 32;
}
```

### 2. Configure Cloudflare DNS:
- Point your domain to your server IP
- Enable proxy (orange cloud)

### 3. Set up SSL certificates:
- Use Let's Encrypt or Cloudflare Origin certificates
- Update docker-compose.yml to use proper certificates

### 4. Update Ports for Production:
```yaml
services:
  nginx:
    ports:
      - "80:80"
      - "443:443"
```

### 5. Deploy:
```bash
docker-compose up -d
```

## Testing Your Setup

### Test HTTPS locally:
```bash
curl -k https://localhost:9443/up
```

### Test from external (after DNS propagates):
```bash
curl -i https://yourdomain.com/up
```

### Check SSL configuration:
```bash
# Check SSL certificate
openssl s_client -connect yourdomain.com:443

# Test SSL configuration
nmap --script ssl-enum-ciphers -p 443 yourdomain.com
```

## Troubleshooting

### Cloudflare Error 525:
- Ensure SSL mode is set correctly
- Check that nginx is accessible on port 443
- Verify SSL certificates are valid and not expired

### Mixed Content Issues:
- Ensure all resources are loaded via HTTPS
- Check that your application redirects HTTP to HTTPS

### Certificate Issues:
- Verify certificate chain is complete
- Check certificate expiration dates
- Ensure domain names match

## Security Best Practices

1. **Use strong SSL/TLS configuration:**
```nginx
ssl_protocols TLSv1.2 TLSv1.3;
ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384';
ssl_prefer_server_ciphers off;
```

2. **Enable HSTS:**
```nginx
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
```

3. **Regular certificate renewal:**
```bash
# For Let's Encrypt
sudo certbot renew
```

4. **Keep nginx and dependencies updated:**
```bash
docker-compose pull nginx
docker-compose up -d
```

## Current Working Setup

Your current setup is working with:
- HTTP port: 9080 (redirects to HTTPS)
- HTTPS port: 9443 (with self-signed certificates)
- Health check: https://localhost:9443/up

For production, change the ports to 80/443 and use proper SSL certificates.
