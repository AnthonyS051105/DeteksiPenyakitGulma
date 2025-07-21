This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Environment Variables Setup

Before running the application, you need to set up the following environment variables:

1. Create a `.env.local` file in the root directory
2. Add the following variables:

```bash
# ImgBB Configuration (for image storage)
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key_here

# AI Service Configuration (for plant disease and weed detection)
NEXT_PUBLIC_AI_SERVICE_URL=https://nafalrust-plantweb.hf.space
```

### Getting ImgBB API Key:
1. Go to [ImgBB API](https://api.imgbb.com/)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Replace `your_imgbb_api_key_here` with your actual API key

### AI Service Integration:
The application integrates with your deployed AI service at `https://nafalrust-plantweb.hf.space` with the following endpoints:
- `/predict-disease/link` - For LeafGuard (disease detection)
- `/detect-weed/link` - For NeuraWeed (weed detection)
- `/health` - For service health monitoring

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Features

### LeafGuard
- Upload plant leaf images
- AI-powered disease detection
- Detailed analysis and recommendations
- Image storage via ImgBB

### NeuraWeed  
- Upload plant/crop images
- AI-powered weed detection
- Segmentation results
- Treatment recommendations

## Deployment on Vercel

When deploying to Vercel, make sure to add the environment variables in your Vercel project settings:

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add the same variables from your `.env.local` file
4. Redeploy your application

## Troubleshooting

- If images fail to upload, check your ImgBB API key
- If AI processing fails, verify the AI service is running at the specified URL
- Check browser console for detailed error messages
- The health check indicator in the top-right shows AI service status
