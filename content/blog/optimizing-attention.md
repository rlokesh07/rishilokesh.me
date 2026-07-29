---
title: Optimizing Attention
description: Why attention is expensive and the strategies being used to fix it.
date: 2026-07-29
tags: [ml, transformers, notes]
---

Attention scales quadratically with token context. Every token attends to every other token, making it the most expensive part of inference. Small changes propagate heavily because of how sensitive the process is.

## Two Strategies

There are two broad approaches to dealing with this:

| Implementation Improvements | New Algorithms |
|---|---|
| Write higher performance kernels | Attention algorithms that scale better than O(n²) |

**Flash Attention** is the most popular implementation improvement -- same math, just written to be memory-efficient and fast on modern hardware.

**Paged Attention** tackles KV cache scaling by breaking it into pages that can be shared across requests. Useful for serving, not a fix for the underlying complexity.

Neither of these solve the quadratic scaling problem. For that, you need new algorithms.

## Algorithmic Approaches

**Gated Attention** adds a learned gate that modulates the attention output, allowing the model to approximate attention for chunks rather than attending fully everywhere.

**Linear Attention** replaces the standard similarity function exp(qkᵀ) with φ(q)ᵀφ(k), where φ approximates the similarity between q and k. The trick is computing φ(k)ᵀvⁿ first -- a d×d matrix -- then multiplying by φ(q). This collapses the quadratic dependency.

**Compressed Attention** periodically compresses information from earlier in the sequence, reducing the effective context length the attention mechanism has to handle.
