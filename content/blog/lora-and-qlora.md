---
title: LoRA & QLoRA
description: Notes on Low Rank Adaptations and quantized fine-tuning for large language models.
date: 2026-08-06
tags: [ml, fine-tuning, notes]
---

## LoRA: Low Rank Adaptations

LoRA freezes the model weights and injects trainable layers into each of the Transformers to reduce the total number of parameters to fine-tune.

The big downside to fine tuning is that a new model contains as many parameters as the original, and that takes months to train.

Aghajanyan et al (2020) realized you could project the weights into a lower dimension randomly and it can still learn during fine-tuning. The speed of training a model is the size of the fine-tune dataset and the number of parameters.

Instead of adding all weights to the weight matrix, you add a matrix A x B = ΔW where A and B are much smaller.

### Rank

A full rank matrix has no redundancy. Consider a 3x3 matrix where column 3 is linearly dependent on column 1 -- because of this dependency the matrix is rank 2. LoRA says we don't have to optimize for the full rank matrix, but decompose and optimize the lower rank ones. Where if some matrix is d x k, we optimize a d x r and a r x k matrix where r is a hyperparameter.

## QLoRA

Fine tuning very large models is very expensive, so QLoRA adds a quantization layer to LoRA.

### Quantization into NF4

Based on the normal distribution of (0, 1), 16 values get generated. Each parameter is placed into one of these blocks and is stored in a 4-bit (2^4 = 16) NF4 value. The 16 values are standard throughout all NF4 models. There is also a scaling value to more accurately represent the values -- it is shared between 64 parameters and stored at 32-bit precision to minimize overhead, but even that is too much.

### Double Quantization

The scaling constant for 64 parameters being 32 bits adds 0.5 bits of overhead per parameter. To minimize this overhead, take all the scaling constants, put them into a tensor, and apply the same quantization trick -- but now down to 8-bit precision. This reduces the overhead significantly.
