/**
 * MCP Request Handler
 * Handles Model Context Protocol requests for Figma operations
 */

export async function handleMcpRequest(request, client) {
  const { method, params, id } = request;

  // MCP initialization
  if (method === 'initialize') {
    return {
      jsonrpc: '2.0',
      id,
      result: {
        protocolVersion: '2024-11-05',
        serverInfo: {
          name: 'figma-mcp-server',
          version: '1.0.0',
        },
        capabilities: {
          tools: {},
          resources: {},
        },
      },
    };
  }

  // List available tools
  if (method === 'tools/list') {
    return {
      jsonrpc: '2.0',
      id,
      result: {
        tools: [
          {
            name: 'get_file',
            description: 'Retrieve a complete Figma file with all its contents',
            inputSchema: {
              type: 'object',
              properties: {
                file_key: {
                  type: 'string',
                  description: 'The key of the Figma file (from the URL)',
                },
                depth: {
                  type: 'number',
                  description: 'How deep to traverse the node tree',
                },
              },
              required: ['file_key'],
            },
          },
          {
            name: 'get_file_nodes',
            description: 'Get specific nodes from a Figma file by their IDs',
            inputSchema: {
              type: 'object',
              properties: {
                file_key: { type: 'string', description: 'The Figma file key' },
                node_ids: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Array of node IDs to retrieve',
                },
              },
              required: ['file_key', 'node_ids'],
            },
          },
          {
            name: 'get_images',
            description: 'Export images/renders of specific nodes',
            inputSchema: {
              type: 'object',
              properties: {
                file_key: { type: 'string', description: 'The Figma file key' },
                node_ids: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Node IDs to export',
                },
                format: {
                  type: 'string',
                  enum: ['png', 'jpg', 'svg', 'pdf'],
                  description: 'Export format',
                },
                scale: {
                  type: 'number',
                  description: 'Export scale (1-4)',
                },
              },
              required: ['file_key', 'node_ids'],
            },
          },
          {
            name: 'get_components',
            description: 'Get all components from a Figma file',
            inputSchema: {
              type: 'object',
              properties: {
                file_key: { type: 'string', description: 'The Figma file key' },
              },
              required: ['file_key'],
            },
          },
          {
            name: 'get_styles',
            description: 'Get all styles (colors, typography, effects) from a file',
            inputSchema: {
              type: 'object',
              properties: {
                file_key: { type: 'string', description: 'The Figma file key' },
              },
              required: ['file_key'],
            },
          },
          {
            name: 'get_design_tokens',
            description: 'Extract design tokens (colors, typography, effects, grids) from a file',
            inputSchema: {
              type: 'object',
              properties: {
                file_key: { type: 'string', description: 'The Figma file key' },
              },
              required: ['file_key'],
            },
          },
          {
            name: 'get_comments',
            description: 'Get all comments from a Figma file',
            inputSchema: {
              type: 'object',
              properties: {
                file_key: { type: 'string', description: 'The Figma file key' },
              },
              required: ['file_key'],
            },
          },
          {
            name: 'get_component_sets',
            description: 'Get component sets (variants) from a file',
            inputSchema: {
              type: 'object',
              properties: {
                file_key: { type: 'string', description: 'The Figma file key' },
              },
              required: ['file_key'],
            },
          },
        ],
      },
    };
  }

  // Execute tool
  if (method === 'tools/call') {
    const { name, arguments: args } = params;

    try {
      let result;

      switch (name) {
        case 'get_file':
          result = await client.getFile(args.file_key, { depth: args.depth });
          break;

        case 'get_file_nodes':
          result = await client.getFileNodes(args.file_key, args.node_ids);
          break;

        case 'get_images':
          result = await client.getImages(
            args.file_key,
            args.node_ids,
            args.format || 'png',
            args.scale || 1
          );
          break;

        case 'get_components':
          result = await client.getComponents(args.file_key);
          break;

        case 'get_styles':
          result = await client.getStyles(args.file_key);
          break;

        case 'get_design_tokens':
          result = await client.getDesignTokens(args.file_key);
          break;

        case 'get_comments':
          result = await client.getComments(args.file_key);
          break;

        case 'get_component_sets':
          result = await client.getComponentSets(args.file_key);
          break;

        default:
          throw new Error(`Unknown tool: ${name}`);
      }

      return {
        jsonrpc: '2.0',
        id,
        result: {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        },
      };
    } catch (error) {
      return {
        jsonrpc: '2.0',
        id,
        error: {
          code: -32000,
          message: error.message,
        },
      };
    }
  }

  // Unknown method
  return {
    jsonrpc: '2.0',
    id,
    error: {
      code: -32601,
      message: `Method not found: ${method}`,
    },
  };
}
