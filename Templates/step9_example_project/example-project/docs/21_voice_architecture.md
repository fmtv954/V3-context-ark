# 21 – Voice AI Pipeline Architecture

## Overview

The system uses a **LiveKit room** to connect the caller's browser
to a **Python or Node voice agent** that orchestrates:

- STT (speech-to-text) via Deepgram.
- LLM reasoning via OpenRouter/LiteLLM.
- TTS (text-to-speech) via Deepgram or premium providers.

## Core Flow

1. Caller opens the call page and joins a LiveKit room.
2. Backend spawns or connects a voice agent participant.
3. Agent streams audio → STT → LLM → TTS.
4. Agent maintains a structured transcript (JSON events).
5. At call end, agent assembles:
   - Lead object
   - Summary text
   - Asana task payload
   - Email body
