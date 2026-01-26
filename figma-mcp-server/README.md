# Figma MCP Server

A publicly accessible MCP (Model Context Protocol) server for Figma integration with AI tools like Lovable, Cursor, and Claude.

## Features

- **MCP Protocol Support** - Full MCP implementation for AI tool integration
- **REST API** - Direct HTTP endpoints for simpler integrations
- **Figma Operations**: Get files, nodes, components, styles, images, comments
- **Design Token Extraction** - Extract colors, typography, effects, grids
- **Easy Deployment** - Ready for Railway, Render, Fly.io, or any Node.js host

## Quick Start

### 1. Get Your Figma Token

1. Go to [Figma Account Settings](https://www.figma.com/settings)
2. Scroll to **Personal access tokens**
3. Click **Generate new token**
4. Copy the token

### 2. Local Development

```bash
# Clone and install
cd figma-mcp-server
npm install

# Create .env file
cp .env.example .env
# Edit .env and add your FIGMA_ACCESS_TOKEN

# Run locally
npm run dev
```

Server runs at `http://localhost:3000`

### 3. Deploy to Cloud

#### Railway (Recommended)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up

# Set environment variable
railway variables set FIGMA_ACCESS_TOKEN=your_token_here
```

#### Render
1. Push to GitHub
2. Connect repo on [render.com](https://render.com)
3. Add `FIGMA_ACCESS_TOKEN` environment variable
4. Deploy

#### Fly.io
```bash
fly launch
fly secrets set FIGMA_ACCESS_TOKEN=your_token_here
fly deploy
```

## API Endpoints

### Health Check
```
GET /health
```

### List Tools
```
GET /tools
```

### MCP Endpoint (for AI tools)
```
POST /mcp
Content-Type: application/json
X-Figma-Token: your_token (optional if env var set)

{
  "method": "tools/call",
  "params": {
    "name": "get_file",
    "arguments": { "file_key": "abc123" }
  },
  "id": 1
}
```

### Direct REST Endpoints

```bash
# Get file
POST /api/file/:fileKey
X-Figma-Token: your_token

# Get specific nodes
POST /api/file/:fileKey/nodes
{ "node_ids": ["1:2", "1:3"] }

# Export images
POST /api/file/:fileKey/images
{ "node_ids": ["1:2"], "format": "png", "scale": 2 }

# Get components
POST /api/file/:fileKey/components
```

## Using with Lovable

1. Deploy this server and get your public URL (e.g., `https://your-app.railway.app`)

2. In Lovable, add the MCP server:
   - **URL**: `https://your-app.railway.app/mcp`
   - **Token**: Your Figma access token (in header `X-Figma-Token`)

3. You can now use Figma commands in Lovable:
   - "Get the components from my Figma file"
   - "Extract the design tokens from this Figma URL"
   - "Show me the color styles in this file"

## Available Tools

| Tool | Description |
|------|-------------|
| `get_file` | Get complete Figma file contents |
| `get_file_nodes` | Get specific nodes by ID |
| `get_images` | Export images (PNG, JPG, SVG, PDF) |
| `get_components` | List all components |
| `get_styles` | Get all styles |
| `get_design_tokens` | Extract design tokens |
| `get_comments` | Get file comments |
| `get_component_sets` | Get component variants |

## Getting File Key from URL

From a Figma URL like:
```
https://www.figma.com/file/abc123XYZ/My-Design-File
                          ^^^^^^^^^^
                          This is the file_key
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `FIGMA_ACCESS_TOKEN` | Yes* | Your Figma personal access token |
| `PORT` | No | Server port (default: 3000) |

*Can also be passed via `X-Figma-Token` header per request

## Security Notes

- Never commit your `.env` file
- Use environment variables in production
- Consider rate limiting for public deployments
- The token gives access to files you can access in Figma

## License

MIT
