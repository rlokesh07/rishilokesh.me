---
title: The ML Software Stack
description: A bottom-up look at the stack that powers modern AI systems, from GPU hardware to Hugging Face.
date: 2026-08-01
tags: [ml, systems, cuda, pytorch]
---

GPU -> CUDA -> Deep Learning Frameworks -> Inference Engines

## CUDA

CUDA is how you run code on NVIDIA GPUs.

- **CUDA kernel:** user-defined functions to leverage GPU parallelization
- **CUDA Graph:** a DAG of kernels and GPU operations. Typically GPUs get instructions from the CPU, but the graph allows the slow CPU launch overhead to be stored and replayed much faster
- **CUDA Driver:** low-level interface for speaking to the hardware
- **CUDA Runtime:** developer API for launching and managing memory

Note that CUDA is not a programming language. Usually CUDA programs are written in C++, then compiled into CPU and GPU code using nvcc. cuBLAS gives you pre-built libraries for linear algebra operations.

## cuDNN, CUTLASS, FlashInfer

cuDNN gives you primitives for neural networks. Also worth looking into CUTLASS and FlashInfer as building blocks for high-performance kernels.

A good kernel is very specific to the hardware. Libraries like PyTorch have their own algorithms to choose the kernel, but manually selecting kernels for key stages can speed things up.

## Fusion

Probably the biggest upgrade you could do. Fusion is where you fuse operations together so data doesn't have to move back and forth between memory and compute, bypassing the von Neumann bottleneck. Not easy though. The easy ones are usually done automatically by compilers. Libraries like Flash Attention require handwritten fused kernels.

## PyTorch

Moving up in abstraction, PyTorch is the most popular package for describing tensor ops. It has AutoGrad to automatically calculate gradients. torch.compile also creates GPU-specific kernels for inference, but can't fuse custom plugged-in kernels.

## SafeTensors and ONNX

SafeTensors is the most popular format to hold weights since it can only hold tensors and won't execute random Python code. ONNX is another file format that bundles the execution graph as well, so you don't have to bring your own implementation.

## Transformers and Diffusers

Libraries by Hugging Face that offer implementations built on PyTorch. Mostly just for tinkering, not really built for large implementations.
