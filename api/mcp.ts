type JsonRpcRequest = {
  jsonrpc?: string;
  id?: string | number | null;
  method?: string;
  params?: Record<string, unknown>;
};

type JsonRpcResponse = {
  jsonrpc: "2.0";
  id: string | number | null;
  result?: unknown;
  error?: {
    code: number;
    message: string;
    data?: unknown;
  };
};

const PROTOCOL_VERSION = "2024-11-05";
const SERVER_NAME = "sandhosh-portfolio-mcp";
const SERVER_VERSION = "0.1.0";

const PORTFOLIO_PROFILE = {
  name: "Sandhosh",
  title: "AI model developer & Full Stack Enthusiast",
  website: "https://sandhosh.vercel.app",
  github: "https://github.com/sandhosh02",
  linkedin: "https://www.linkedin.com/in/sandhosh-g-884b7b279/",
  leetcode: "https://leetcode.com/u/santhoshgowravan/",
};

const PORTFOLIO_PROJECTS = [
  { name: "PyLab Arena", url: "https://github.com/SANDHOSH02/PyLab_Arena" },
  { name: "IQArena", url: "https://nscet.org/iqarena" },
  { name: "Result Portal", url: "https://github.com/SANDHOSH02/Result-Portal" },
  { name: "Hackathon Management", url: "http://nscet.org/hackathon" },
  { name: "Safety Gear", url: "https://github.com/SANDHOSH02/Safety-gear" },
  { name: "Retail Monitoring", url: "https://github.com/SANDHOSH02/Retail-monitoring" },
];

function withCorsHeaders(headers: Record<string, string> = {}) {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, Accept, MCP-Session-Id, mcp-session-id, anthropic-version, x-api-key",
    Vary: "Origin",
    "Cache-Control": "no-store",
    ...headers,
  };
}

function sendJson(res: any, status: number, payload: unknown) {
  const headers = withCorsHeaders({ "Content-Type": "application/json; charset=utf-8" });
  Object.entries(headers).forEach(([key, value]) => res.setHeader(key, value));
  res.status(status).send(JSON.stringify(payload));
}

function rpcError(id: string | number | null, code: number, message: string, data?: unknown): JsonRpcResponse {
  return {
    jsonrpc: "2.0",
    id,
    error: { code, message, data },
  };
}

function rpcResult(id: string | number | null, result: unknown): JsonRpcResponse {
  return {
    jsonrpc: "2.0",
    id,
    result,
  };
}

function getToolDefinitions() {
  return [
    {
      name: "portfolio_profile",
      description: "Get profile and social links for Sandhosh's portfolio.",
      inputSchema: {
        type: "object",
        properties: {},
        additionalProperties: false,
      },
    },
    {
      name: "portfolio_projects",
      description: "Get featured projects from the portfolio website.",
      inputSchema: {
        type: "object",
        properties: {
          limit: {
            type: "number",
            description: "Optional max number of projects to return.",
            minimum: 1,
          },
        },
        additionalProperties: false,
      },
    },
    {
      name: "portfolio_contact",
      description: "Get contact links for portfolio owner.",
      inputSchema: {
        type: "object",
        properties: {},
        additionalProperties: false,
      },
    },
  ];
}

async function handleToolCall(params: Record<string, unknown> | undefined) {
  const name = typeof params?.name === "string" ? params.name : "";
  const args = (params?.arguments as Record<string, unknown> | undefined) || {};

  if (name === "portfolio_profile") {
    return {
      content: [{ type: "text", text: JSON.stringify(PORTFOLIO_PROFILE, null, 2) }],
    };
  }

  if (name === "portfolio_projects") {
    const requestedLimit = typeof args.limit === "number" ? args.limit : PORTFOLIO_PROJECTS.length;
    const limit = Math.max(1, Math.min(PORTFOLIO_PROJECTS.length, Math.floor(requestedLimit)));
    const data = PORTFOLIO_PROJECTS.slice(0, limit);
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
    };
  }

  if (name === "portfolio_contact") {
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              emailHint: "Use LinkedIn or GitHub DM from profile links.",
              github: PORTFOLIO_PROFILE.github,
              linkedin: PORTFOLIO_PROFILE.linkedin,
            },
            null,
            2,
          ),
        },
      ],
    };
  }

  return {
    isError: true,
    content: [{ type: "text", text: `Unknown tool: ${name}` }],
  };
}

async function handleRpcRequest(request: JsonRpcRequest): Promise<JsonRpcResponse | null> {
  const id = request.id ?? null;

  if (!request || request.jsonrpc !== "2.0" || typeof request.method !== "string") {
    return rpcError(id, -32600, "Invalid Request");
  }

  if (request.method === "initialize") {
    return rpcResult(id, {
      protocolVersion: PROTOCOL_VERSION,
      capabilities: {
        tools: {},
      },
      serverInfo: {
        name: SERVER_NAME,
        version: SERVER_VERSION,
      },
    });
  }

  if (request.method === "notifications/initialized") {
    return null;
  }

  if (request.method === "ping") {
    return rpcResult(id, {});
  }

  if (request.method === "tools/list") {
    return rpcResult(id, {
      tools: getToolDefinitions(),
    });
  }

  if (request.method === "tools/call") {
    try {
      const result = await handleToolCall(request.params);
      return rpcResult(id, result);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error during tool call";
      return rpcResult(id, {
        isError: true,
        content: [{ type: "text", text: message }],
      });
    }
  }

  return rpcError(id, -32601, `Method not found: ${request.method}`);
}

export default async function handler(req: any, res: any) {
  if (req.method === "OPTIONS") {
    const headers = withCorsHeaders();
    Object.entries(headers).forEach(([key, value]) => res.setHeader(key, value));
    res.status(204).send("");
    return;
  }

  if (req.method === "GET") {
    sendJson(res, 200, {
      ok: true,
      transport: "json-rpc-over-http",
      endpoint: "/api/mcp",
      server: {
        name: SERVER_NAME,
        version: SERVER_VERSION,
      },
      hint: "Send JSON-RPC POST requests to this endpoint.",
    });
    return;
  }

  if (req.method !== "POST") {
    sendJson(res, 405, {
      error: "Method not allowed",
      hint: "Send JSON-RPC POST requests to this endpoint.",
    });
    return;
  }

  let body = req.body;

  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      sendJson(res, 400, rpcError(null, -32700, "Parse error"));
      return;
    }
  }

  if (!body) {
    sendJson(res, 400, rpcError(null, -32600, "Invalid Request"));
    return;
  }

  if (Array.isArray(body)) {
    const results = await Promise.all(body.map((item) => handleRpcRequest(item)));
    const filtered = results.filter(Boolean);
    sendJson(res, 200, filtered);
    return;
  }

  const result = await handleRpcRequest(body);

  if (result === null) {
    res.status(204).send("");
    return;
  }

  sendJson(res, 200, result);
}
