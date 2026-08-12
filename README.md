# HH Goa 2026 Builder ID Generator

A responsive web application for creating personalized **HH Goa 2026 Builder IDs** and **PFP frames**.

The project allows builders to upload their photo, add their personal details, generate an event-style digital identity card, download the final design, and share a verifiable Builder ID through a QR code.

## Overview

The HH Goa 2026 Builder ID Generator was built to make it easy for participants to create a personalized event identity that can be used across social platforms and digital profiles.

The application provides two main experiences:

* **Builder ID Generator** — Create a personalized HH Goa 2026 Builder ID card.
* **PFP Frame Generator** — Create a branded HH Goa 2026 profile-picture frame.

Generated Builder IDs are stored in Firebase Firestore and can be verified through a unique verification URL.

## Features

### Builder ID Generator

* Upload a profile photo
* Drag and drop image upload
* Crop and adjust the uploaded photo
* Enter builder information
* Generate a unique Builder ID
* Live preview of the final card
* Generate a QR code for verification
* Save Builder ID information to Firebase Firestore
* Download the final ID card as a high-resolution PNG

### PFP Frame Generator

* Upload a profile photo
* Crop the image
* Apply the HH Goa 2026 branded frame
* Preview the final profile picture
* Download the generated PFP as an image

### Builder ID Verification

Each Builder ID receives a unique identifier in the format:

```text
HHGOA-2026-XXXXXX
```

The generated QR code points to a verification URL:

```text
/verify/{builderId}
```

For example:

```text
/verify/HHGOA-2026-85UJ79
```

The verification page retrieves the corresponding record from Firebase Firestore and displays the builder's information and verification status.

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* React Router
* Tailwind CSS
* Lucide React

### Image Processing

* React Easy Crop
* HTML-to-Image

### Verification & Data

* Firebase
* Firebase Firestore
* QRCode React

### Fonts

* Plus Jakarta Sans
* Playfair Display

## Project Structure

```text
hh-goa-2026-builder-id/
│
├── assets/
│
├── src/
│   ├── components/
│   │   ├── BuilderIDPreview.tsx
│   │   ├── GeneratorPage.tsx
│   │   ├── LandingPage.tsx
│   │   ├── PFPPreview.tsx
│   │   └── VerifyPage.tsx
│   │
│   ├── lib/
│   │   ├── cropImage.ts
│   │   ├── firebase.ts
│   │   └── utils.ts
│   │
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── types.ts
│
├── .env.example
├── .gitignore
├── firebase-applet-config.json
├── firebase-blueprint.json
├── firestore.rules
├── index.html
├── metadata.json
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Application Flow

```text
User
  │
  ▼
Landing Page
  │
  ├── Create Builder ID
  │       │
  │       ▼
  │   Upload Photo
  │       │
  │       ▼
  │   Enter Details
  │       │
  │       ▼
  │   Crop Photo
  │       │
  │       ▼
  │   Generate Preview
  │       │
  │       ├── Save Builder ID → Firebase
  │       │
  │       └── Generate QR Code
  │                    │
  │                    ▼
  │              Verification URL
  │
  └── Create PFP Frame
          │
          ▼
      Upload Photo
          │
          ▼
      Apply HH Goa Frame
          │
          ▼
      Download PFP
```

## Running the Project Locally

### Prerequisites

Make sure you have the following installed:

* Node.js
* npm
* Git

You can check your installation with:

```bash
node -v
npm -v
git --version
```

### 1. Clone the repository

```bash
git clone https://github.com/SujitSoni009/hh-goa-2026-builder-id.git
```

Move into the project directory:

```bash
cd hh-goa-2026-builder-id
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The application runs on:

```text
http://localhost:3000/
```

## Available Scripts

### Development

```bash
npm run dev
```

Starts the Vite development server.

### Production Build

```bash
npm run build
```

Creates the production-ready application inside the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

Runs the production build locally for testing.

### Type Checking

```bash
npm run lint
```

Runs TypeScript checking without creating a production build.

## Firebase

The application uses **Firebase Firestore** to store Builder ID records.

Builder IDs are stored in the:

```text
builder_ids
```

collection.

A Builder ID record contains information such as:

```text
uniqueId
fullName
handle
bio
location
photoBase64
status
createdAt
```

When a Builder ID is generated, the application stores the record using the unique Builder ID as the Firestore document ID.

The verification page then retrieves the record using that same ID.

## Verification

The application uses React Router for verification routes.

The main verification route is:

```text
/verify/:id
```

Example:

```text
/verify/HHGOA-2026-85UJ79
```

If the ID exists, the verification page displays the builder's information.

If the ID does not exist, the application displays an invalid ID message.

If the ID has been revoked, the application displays a revoked status.

## Image Generation

The application uses `html-to-image` to convert the Builder ID and PFP preview into downloadable PNG images.

Generated Builder IDs are exported at a higher pixel ratio for better image quality.

Example generated filename:

```text
HH_GOA_2026_ID_HHGOA-2026-XXXXXX.png
```

## QR Verification

Every generated Builder ID contains a QR code.

The QR code points to the current application's verification page:

```text
https://your-domain.com/verify/HHGOA-2026-XXXXXX
```

This allows someone to scan the card and verify the associated Builder ID.

## Environment Variables

An `.env.example` file is included in the project as a reference.

If you add private environment variables, create your own local `.env` file and keep it out of Git.

Do not commit:

```text
.env
.env.local
```

to GitHub if they contain private credentials or secrets.

## Deployment

The project is built with Vite and can be deployed on platforms such as Vercel.

For Vercel, the typical configuration is:

```text
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

After deployment, test both:

```text
https://your-domain.vercel.app/
```

and:

```text
https://your-domain.vercel.app/verify/HHGOA-2026-XXXXXX
```

Because the application uses React Router, make sure your hosting configuration supports SPA route rewrites so direct visits to `/verify/:id` are handled correctly.

## Responsive Design

The application is designed to work across:

* Desktop
* Laptop
* Tablet
* Mobile devices

The Builder ID preview also scales based on the available screen space.

## Design

The interface uses an HH Goa-inspired visual language with:

* Tropical green backgrounds
* Warm yellow accents
* Cream surfaces
* Bold typography
* Goa-inspired landscape elements
* Palm trees and ocean-inspired graphics
* Event-focused Builder ID layouts

The goal is to keep the experience playful and event-oriented while still making the generated identity cards easy to read and share.

## GitHub

Repository:

https://github.com/SujitSoni009/hh-goa-2026-builder-id

## Future Improvements

Possible improvements for future versions include:

* Admin dashboard for managing Builder IDs
* Authentication for administrators
* Better ID management and revocation controls
* More Builder ID templates
* Custom event branding options
* Improved verification analytics
* Stronger server-side validation
* Cloud image storage instead of storing photo data directly in Firestore
* Custom domain support

## License

The source application includes the Apache License 2.0 SPDX identifier.

Review the repository's source files and licensing requirements before redistributing the project.

---

Built for the **HH Goa 2026** builder community.
