import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { FigmaClient } from './figma-client.js';
import { handleMcpRequest } from './mcp-handler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Health check
app.get('/', (req, res) => {
  res.json({
    name: 'Figma MCP Server',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      mcp: '/mcp',
      tools: '/tools',
      health: '/health'
    }
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// List available tools
app.get('/tools', (req, res) => {
  res.json({
    tools: [
      {
        name: 'get_file',
        description: 'Get a Figma file by key',
        parameters: { file_key: 'string' }
      },
      {
        name: 'get_file_nodes',
        description: 'Get specific nodes from a Figma file',
        parameters: { file_key: 'string', node_ids: 'string[]' }
      },
      {
        name: 'get_images',
        description: 'Export images from a Figma file',
        parameters: { file_key: 'string', node_ids: 'string[]', format: 'png|jpg|svg|pdf', scale: 'number' }
      },
      {
        name: 'get_components',
        description: 'Get components from a Figma file',
        parameters: { file_key: 'string' }
      },
      {
        name: 'get_styles',
        description: 'Get styles from a Figma file',
        parameters: { file_key: 'string' }
      },
      {
        name: 'get_comments',
        description: 'Get comments from a Figma file',
        parameters: { file_key: 'string' }
      },
      {
        name: 'search_files',
        description: 'Search for files in a team/project',
        parameters: { team_id: 'string', query: 'string' }
      }
    ]
  });
});

// MCP endpoint - main handler
app.post('/mcp', async (req, res) => {
  try {
    const figmaToken = req.headers['x-figma-token'] || process.env.FIGMA_ACCESS_TOKEN;
    
    if (!figmaToken) {
      return res.status(401).json({
        error: 'Missing Figma access token',
        message: 'Provide token via X-Figma-Token header or FIGMA_ACCESS_TOKEN env var'
      });
    }

    const client = new FigmaClient(figmaToken);
    const result = await handleMcpRequest(req.body, client);
    res.json(result);
  } catch (error) {
    console.error('MCP Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Direct tool endpoints for simpler integration
app.post('/api/file/:fileKey', async (req, res) => {
  try {
    const figmaToken = req.headers['x-figma-token'] || process.env.FIGMA_ACCESS_TOKEN;
    if (!figmaToken) return res.status(401).json({ error: 'Missing Figma token' });

    const client = new FigmaClient(figmaToken);
    const file = await client.getFile(req.params.fileKey);
    res.json(file);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/file/:fileKey/nodes', async (req, res) => {
  try {
    const figmaToken = req.headers['x-figma-token'] || process.env.FIGMA_ACCESS_TOKEN;
    if (!figmaToken) return res.status(401).json({ error: 'Missing Figma token' });

    const client = new FigmaClient(figmaToken);
    const { node_ids } = req.body;
    const nodes = await client.getFileNodes(req.params.fileKey, node_ids);
    res.json(nodes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/file/:fileKey/images', async (req, res) => {
  try {
    const figmaToken = req.headers['x-figma-token'] || process.env.FIGMA_ACCESS_TOKEN;
    if (!figmaToken) return res.status(401).json({ error: 'Missing Figma token' });

    const client = new FigmaClient(figmaToken);
    const { node_ids, format = 'png', scale = 1 } = req.body;
    const images = await client.getImages(req.params.fileKey, node_ids, format, scale);
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/file/:fileKey/components', async (req, res) => {
  try {
    const figmaToken = req.headers['x-figma-token'] || process.env.FIGMA_ACCESS_TOKEN;
    if (!figmaToken) return res.status(401).json({ error: 'Missing Figma token' });

    const client = new FigmaClient(figmaToken);
    const components = await client.getComponents(req.params.fileKey);
    res.json(components);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🎨 Figma MCP Server running on port ${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/health`);
  console.log(`   Tools:  http://localhost:${PORT}/tools`);
  console.log(`   MCP:    http://localhost:${PORT}/mcp`);
});
