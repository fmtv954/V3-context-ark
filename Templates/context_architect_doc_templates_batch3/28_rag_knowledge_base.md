# 28 – RAG & Knowledge Base System

> How we ingest, index, and query documents or structured knowledge for the AI.
> Audience: AI engineers, backend, tools building search or retrieval flows.

## 1. Knowledge Sources

- **Types of content (docs, FAQs, PDFs, code, etc.):**
  - {{kb_content_types}}
- **Where content lives (S3, DB, external APIs, etc.):**
  - {{kb_storage_locations}}

## 2. Ingestion Pipeline

- **How data is imported or synced (batch, streaming, webhooks):**
  - {{kb_ingestion_flows}}
- **Preprocessing steps (chunking, cleaning, metadata tagging):**
  - {{kb_preprocessing_steps}}

## 3. Indexing & Embeddings

- **Vector DB / search engine used:**
  - {{kb_index_engine}}
- **Embedding model(s):**
  - {{kb_embedding_models}}
- **Indexing strategy (by doc type, by tenant, by project):**
  - {{kb_indexing_strategy}}

## 4. Retrieval Strategy

- **How we form queries and filters:**
  - {{kb_retrieval_queries}}
- **Ranking / scoring logic (top-k, hybrid search, etc.):**
  - {{kb_ranking_logic}}
- **How context is inserted into LLM prompts:**
  - {{kb_context_injection}}

## 5. Access Control & Multi-Tenancy

- **How we ensure users/tenants only see their own data:**
  - {{kb_access_control}}

## 6. Notes for AI Tools

- When implementing features that “look up” knowledge, use this retrieval strategy.
- Do not bypass access control rules defined here.
