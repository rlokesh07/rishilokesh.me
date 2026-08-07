---
title: AI Hardware
description: Notes on CPUs, GPUs, TPUs, and the hardware that actually runs AI models.
date: 2026-08-07
tags: [ml, hardware, gpu, tpu, systems]
---

At the end of the day, AI models are just weight vectors times activation functions. The question is how to do that fast.

## CPU vs GPU vs TPU

| Processor | Tradeoff |
|-----------|----------|
| CPU | Can do anything, but slow |
| GPU | Less flexible, way more parallel |
| TPU | Built for one thing: neural networks |

### CPU

A CPU works one step at a time: read instruction, read data, do calculation, write result back. The fundamental bottleneck here is the **von Neumann bottleneck** — fetching data is slower than doing calculations on it. CPUs fight this with caching, branch prediction, and multiple cores. They make up for slowness with flexibility.

### GPU

GPUs throw out the complicated CPU stuff and fill the chip with simple Arithmetic Logic Units (ALUs). Because operations happen in parallel, fetch time becomes less significant per operation — the von Neumann bottleneck shrinks.

## GPU Architecture

The fundamental unit of a GPU is the **Streaming Multiprocessor (SM)**. Inside an SM you'll find:

- **CUDA cores** — the ALUs
- **Tensor Cores** — do entire matrix multiplications in a single cycle
- **Special Function Units** — handle odd math like sin, cos, exponentials
- **Warp Schedulers** — decide which threads run next
- Register files, shared memory, and L2 cache shared across threads on the SM

### Threads, Blocks, Grids, and Warps

- **Thread** — smallest unit of execution, runs a copy of the kernel, has its own ID
- **Block** — group of up to 1024 threads
- **Grid** — how many blocks you need to solve the problem
- Blocks within a grid are independent with no guaranteed execution order
- Threads run in **warps of 32** at the exact same time using **SIMT** (Single Instruction Multiple Threads)

## Warp Divergence

If there's an if-statement in your kernel and not all threads take the same branch, they diverge. Diverged threads can't run in parallel — only one branch executes at a time. This is a common source of GPU inefficiency.

## Tensor Cores

The dominant operation in neural networks is **GEMM** (General Matrix Multiply). A regular CUDA core does one multiply per clock cycle. A Tensor Core does an entire small matrix multiply-and-add in a single cycle. Larger matrices get split into tiles and processed through Tensor Cores. You can trade floating point precision for speed here.

## Memory Hierarchy

From fastest to slowest:

1. Registers
2. Shared Memory / L1
3. L2
4. High Bandwidth Memory (GPU main memory)
5. Host Memory / System RAM

Most optimization work comes down to keeping data as close to the compute as possible.

## TPU

Google decided a GPU wasn't good enough and built a chip with one goal: accelerate neural networks. A TPU's core components are:

- **Matrix Multiplication Unit** — does exactly what it sounds like
- **Vector Unit**
- **Scalar Unit** — housekeeping

TPUs use **systolic arrays** where weights are stored directly on the chip, minimizing data movement.

## Scaling and Parallelism

Frontier models are trained on thousands of chips. Moving data between chips is expensive, so placement matters. Three main strategies:

- **Data Parallelism** — load the full model on every chip, average out gradients. Problem: model may be too large for a single chip.
- **Tensor Parallelism** — split layers across chips. Problem: chunks need to communicate, which takes time.
- **Fully Sharded Data Parallelism (FSDP)** — shard the model across chips and gather on each forward/backward pass.
