# API Endpoints and Contracts

## 1. Document Processing API

### 1.1 Process Document
**Endpoint:** `POST /api/process`
**Description:** Process input document through the kernel pipeline
**Request Body:**
```json
{
  "input": "string",
  "config": {
    "provider": "openai | anthropic",
    "modelName": "string",
    "maxTokens": integer
  }
}
```
**Response:**
```json
{
  "result": "string",
  "modelUsed": "string",
  "tokensUsed": integer,
  "processingTime": "string"
}
```

## 2. Model Management API

### 2.1 Get Current Model Configuration
**Endpoint:** `GET /api/model/config`
**Description:** Retrieve current model configuration
**Response:**
```json
{
  "provider": "openai | anthropic",
  "modelName": "string",
  "maxTokens": integer
}
```

### 2.2 Update Model Configuration
**Endpoint:** `POST /api/model/config`
**Description:** Update model configuration (requires authentication)
**Request Body:**
```json
{
  "provider": "openai | anthropic",
  "modelName": "string",
  "maxTokens": integer
}
```
**Response:**
```json
{
  "status": "success | error",
  "message": "string"
}
```

## 3. System Status API

### 3.1 Get System Health
**Endpoint:** `GET /api/health`
**Description:** Check system health status
**Response:**
```json
{
  "status": "healthy | degraded | unhealthy",
  "details": {
    "kernel": "active | inactive",
    "model": "connected | disconnected"
  }
}
```

## 4. Error Responses

All endpoints return consistent error format:
```json
{
  "error": "string",
  "code": "string",
  "details": {
    "requestId": "string"
  }
}
```

## API Versioning
All endpoints are versioned via URL path:
`/api/v1/...`

## Authentication
Endpoints requiring authentication use Bearer token in Authorization header.

## Rate Limiting
All endpoints are subject to rate limits defined in pricing/03_usage_limits_and_abuse_protection.md
