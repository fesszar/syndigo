const FIGMA_API_BASE = 'https://api.figma.com/v1';

export class FigmaClient {
  constructor(accessToken) {
    this.accessToken = accessToken;
  }

  async request(endpoint, options = {}) {
    const url = `${FIGMA_API_BASE}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'X-Figma-Token': this.accessToken,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Figma API error: ${response.status} - ${error}`);
    }

    return response.json();
  }

  // Get a complete Figma file
  async getFile(fileKey, options = {}) {
    const params = new URLSearchParams();
    if (options.version) params.append('version', options.version);
    if (options.ids) params.append('ids', options.ids.join(','));
    if (options.depth) params.append('depth', options.depth);
    if (options.geometry) params.append('geometry', options.geometry);
    if (options.plugin_data) params.append('plugin_data', options.plugin_data);

    const query = params.toString() ? `?${params.toString()}` : '';
    return this.request(`/files/${fileKey}${query}`);
  }

  // Get specific nodes from a file
  async getFileNodes(fileKey, nodeIds, options = {}) {
    const params = new URLSearchParams();
    params.append('ids', nodeIds.join(','));
    if (options.version) params.append('version', options.version);
    if (options.depth) params.append('depth', options.depth);
    if (options.geometry) params.append('geometry', options.geometry);
    if (options.plugin_data) params.append('plugin_data', options.plugin_data);

    return this.request(`/files/${fileKey}/nodes?${params.toString()}`);
  }

  // Export images from nodes
  async getImages(fileKey, nodeIds, format = 'png', scale = 1, options = {}) {
    const params = new URLSearchParams();
    params.append('ids', nodeIds.join(','));
    params.append('format', format);
    params.append('scale', scale);
    if (options.svg_include_id) params.append('svg_include_id', 'true');
    if (options.svg_simplify_stroke) params.append('svg_simplify_stroke', 'true');
    if (options.use_absolute_bounds) params.append('use_absolute_bounds', 'true');

    return this.request(`/images/${fileKey}?${params.toString()}`);
  }

  // Get file components
  async getComponents(fileKey) {
    const file = await this.getFile(fileKey);
    return this.extractComponents(file.document);
  }

  extractComponents(node, components = []) {
    if (node.type === 'COMPONENT' || node.type === 'COMPONENT_SET') {
      components.push({
        id: node.id,
        name: node.name,
        type: node.type,
        description: node.description || '',
        absoluteBoundingBox: node.absoluteBoundingBox,
      });
    }

    if (node.children) {
      for (const child of node.children) {
        this.extractComponents(child, components);
      }
    }

    return components;
  }

  // Get file styles
  async getStyles(fileKey) {
    const file = await this.getFile(fileKey);
    return file.styles || {};
  }

  // Get comments
  async getComments(fileKey) {
    return this.request(`/files/${fileKey}/comments`);
  }

  // Post a comment
  async postComment(fileKey, message, nodeId = null, position = null) {
    const body = { message };
    if (nodeId) body.node_id = nodeId;
    if (position) body.client_meta = { node_offset: position };

    return this.request(`/files/${fileKey}/comments`, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  // Get team projects
  async getTeamProjects(teamId) {
    return this.request(`/teams/${teamId}/projects`);
  }

  // Get project files
  async getProjectFiles(projectId) {
    return this.request(`/projects/${projectId}/files`);
  }

  // Get file versions
  async getFileVersions(fileKey) {
    return this.request(`/files/${fileKey}/versions`);
  }

  // Get component sets
  async getComponentSets(fileKey) {
    const file = await this.getFile(fileKey);
    return this.extractComponentSets(file.document);
  }

  extractComponentSets(node, sets = []) {
    if (node.type === 'COMPONENT_SET') {
      sets.push({
        id: node.id,
        name: node.name,
        children: node.children?.map(c => ({
          id: c.id,
          name: c.name,
          type: c.type,
        })) || [],
      });
    }

    if (node.children) {
      for (const child of node.children) {
        this.extractComponentSets(child, sets);
      }
    }

    return sets;
  }

  // Extract design tokens from styles
  async getDesignTokens(fileKey) {
    const file = await this.getFile(fileKey);
    const tokens = {
      colors: {},
      typography: {},
      effects: {},
      grids: {},
    };

    // Extract from styles
    if (file.styles) {
      for (const [styleId, style] of Object.entries(file.styles)) {
        switch (style.styleType) {
          case 'FILL':
            tokens.colors[style.name] = { id: styleId, ...style };
            break;
          case 'TEXT':
            tokens.typography[style.name] = { id: styleId, ...style };
            break;
          case 'EFFECT':
            tokens.effects[style.name] = { id: styleId, ...style };
            break;
          case 'GRID':
            tokens.grids[style.name] = { id: styleId, ...style };
            break;
        }
      }
    }

    return tokens;
  }
}
