---
title: Vision Models
description: How CNNs work, YOLO detection, segmentation, and how SAM uses a Vision Transformer.
date: 2026-08-07
tags: [ml, vision, cnn, transformers]
---

## Images as Tensors

An image is a 3D tensor: height x width x channels. RGB gives you 3 channels. After the first convolutional layer those channels become learned features rather than colors. Add a batch dimension and you have 4D input — the standard for vision models.

Pixel values are normalized from $[0, 255]$ to $[0, 1]$, then you subtract the mean and divide by standard deviation.

## CNNs

MLPs treat every input independently. CNNs are built around two properties of images that MLPs ignore:

**Locality:** pixels near each other are more related than pixels far apart.

**Translation invariance:** it doesn't matter where in the image something appears.

### Convolution

A small filter slides across the image and computes a dot product at each position:

1. Multiply filter element-wise against the patch
2. Sum the products
3. Add bias
4. Write the result
5. Slide and repeat

You use multiple filters to detect different things. Each filter has shape $(C_{in}, k, k)$, and with $K$ filters the full weight tensor is $(K, C_{in}, k, k)$.

### Padding and Stride

A $5 \times 5$ input convolved with a $3 \times 3$ filter produces a $3 \times 3$ output — only 9 valid positions. To preserve spatial size, pad the input with a border of zeros before convolving.

**Stride** controls the step size between filter positions. Stride 1 moves one pixel at a time; stride 2 halves the spatial dimensions.

### Pooling

After a few convolutional layers you want to downsample so the network reasons at a coarser level:

- **Strided convolution:** use stride 2 to halve the size while learning the downsampling
- **Max pooling:** $2 \times 2$ window with stride 2, keep only the maximum value
- **Global average pooling:** average the entire feature map within each channel down to a single value

### Feature Hierarchy

Each layer sees a larger region of the input (the **receptive field** grows with depth) and detects increasingly abstract features:

| Layer | What it sees |
|-------|-------------|
| 1 | Edges |
| 2 | Blobs, textures |
| 3 | Local features |
| 4 | Patterns, shapes |
| 5 | Objects |
| 6+ | Semantic concepts |

## YOLO

Classification asks what is in an image. Detection asks what objects are present and where — harder, because you need to localize them too.

YOLO does it in one pass:

1. Resize input to $448 \times 448$
2. Run a single CNN
3. Threshold on confidence

The image is divided into a $7 \times 7$ grid. Whichever cell contains the center of an object's bounding box is responsible for detecting it. Each cell predicts 2 bounding boxes and 20 class probabilities, giving an output tensor of shape $7 \times 7 \times 30$.

Each bounding box prediction contains $(x, y, w, h, \text{conf})$ where coordinates are relative to the cell and image respectively. Confidence is:

$$\text{conf} = P(\text{object}) \times \text{IOU}(\text{pred}, \text{truth})$$

Class probabilities are conditional on an object being present.

### IOU

$$\text{IOU} = \frac{\text{Area of Intersection}}{\text{Area of Union}}$$

### Non-Maximum Suppression

Multiple boxes often fire for the same object. NMS cleans this up:

1. Sort all boxes for a class by confidence
2. Take the top box, compute IOU against all others
3. Discard any box above an IOU threshold (they overlap too much)
4. Move to the next highest confidence box and repeat

### YOLO Loss

$$L = L_{\text{cls}} + L_{\text{loc}}$$

Five terms in total:

- **Center loss:** squared error on $(x, y)$
- **Size loss:** squared error on $\sqrt{w}$ and $\sqrt{h}$ (square root to penalize errors on small boxes more)
- **Confidence loss:** squared error between predicted confidence and IOU with ground truth
- **No-object loss:** penalizes high confidence in cells with no object
- **Classification loss:** sum of squared errors over class probabilities

## Segmentation

Detection draws boxes. Segmentation assigns a class to every pixel.

- **Semantic segmentation:** every pixel gets a class label. All dogs are just "dog."
- **Instance segmentation:** every pixel gets a class and an instance ID. Dog #1, dog #2.
- **Panoptic segmentation:** countable things (dogs, people) get instance IDs; uncountable things (road, sky) get class labels only.

The challenge: CNNs downsample aggressively (YOLO goes from $448 \times 448$ to $7 \times 7$), but segmentation requires full-resolution output.

### U-Net

U-Net solves this with an encoder-decoder structure and skip connections.

The encoder downsamples progressively, building up abstract features. The decoder upsamples back to full resolution. At each scale, skip connections concatenate encoder feature maps with decoder feature maps — so the decoder has access to both high-level semantics and low-level spatial detail.

The output is a $1 \times 1$ convolution that maps channels to class scores. Loss is per-pixel cross entropy. U-Net handles semantic segmentation well.

### Mask R-CNN

For instance segmentation. After running a CNN backbone, a binary mask head predicts which pixels within each detected bounding box belong to the object. You get per-instance pixel masks.

### SAM

SAM (Segment Anything Model) uses a Vision Transformer as its image encoder.

**Image Encoder:** Maps a $1024 \times 1024 \times 3$ image to a $64 \times 64 \times 256$ feature embedding using a ViT.

**Patch tokenization:** The image is split into non-overlapping patches using a convolutional layer with a $16 \times 16$ kernel and no overlap. Each patch becomes a $1280$-dimensional vector.

## ViT vs CNN

CNNs are inherently local — the receptive field grows with depth, but each layer only sees a small neighborhood. Transformers can attend globally from the start, which is useful for long-range dependencies.

The tradeoff: full self-attention over a $64 \times 64$ feature map is $4096^2$ operations. SAM handles this with **windowed attention**.

### Windowed Attention

Most layers partition the feature map into windows of size $14 \times 14$ and run self-attention only within each window. Every 8 or so layers, a full global self-attention pass lets information flow across the entire image.

The attention score also incorporates relative positional biases for height and width separately:

$$\text{Scores}_{i,j} = \frac{Q_i \cdot K_j^T}{\sqrt{d}} + \text{rel}_h(\Delta h_{i,j}) + \text{rel}_w(\Delta w_{i,j})$$

Using two separate embeddings for $\Delta h$ and $\Delta w$ rather than a single embedding for the pair saves parameters.
