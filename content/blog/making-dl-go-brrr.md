---
title: Making Deep Learning Go Brrr
description: The three things that determine how fast your deep learning code actually runs.
date: 2026-08-07
tags: [ml, performance, cuda, systems]
---

Three things determine deep learning efficiency: compute, memory, and everything else.

## Compute

The only way to reduce compute is to fundamentally change what you're computing. You can't optimize your way out of it — if you need the FLOPs, you need them.

But raw FLOPs aren't enough. Even if you double the number of operations, if you can't deliver them fast enough they're wasted. The hardware has to actually stay busy.

One important asymmetry: GPUs are built for matrix multiplications. Non-matmul ops are roughly 15x slower. In practice this doesn't matter much for activation and norm layers since they account for a tiny fraction of total FLOPs — but it's worth knowing.

## Bandwidth

Bandwidth is the cost to move data. Specifically, it's the cost to move tensors from DRAM (the warehouse) to SRAM and compute (the factory).

For a simple unary operation, you load the data from DRAM, do trivially little work on it, and write it right back. The compute is essentially free — the bottleneck is the transfer. An operation is **memory-bound** when it spends more time moving data than computing on it.

This is why kernel fusion matters so much. If you can fuse multiple operations together, data stays in SRAM instead of making unnecessary round trips to DRAM.

## Everything Else

The third bucket is overhead — anything that isn't compute or memory. Python interpreter overhead, kernel launch latency, synchronization points. These eat into utilization in ways that are easy to miss.

The goal is to keep the GPU fed. Compute-bound operations are a good problem to have — it means you're using the hardware. Memory-bound and overhead-bound operations are where the real optimization work lives.
