# বাজার দর (Bazar Dor)

প্রয়োজনীয় পণ্যের দৈনিক বাজারদর এক নজরে দেখার একটি Next.js ওয়েব অ্যাপ।

**Live:** https://আপনার-লাইভ-লিংক.vercel.app
**Repository:** https://github.com/arafat-hossain12/B14-A7-Bazar-Dor

## Features

- **Live price ticker:** পণ্যের দাম ও পরিবর্তনের শতাংশসহ অনবরত চলমান মার্কি।
- **Top risers & fallers:** দাম সবচেয়ে বেশি বাড়া ও কমা ৬টি করে পণ্য হোম পেজে।
- **Category pages:** ক্যাটাগরি অনুযায়ী পণ্য, সংখ্যাভিত্তিক সর্ট ড্রপডাউন (দাম কম থেকে বেশি, বেশি থেকে কম), স্কেলিটন লোডিং ও খালি অবস্থার ৪০৪ বার্তা।
- **Protected product details:** সাইন ইন ছাড়া পণ্যের বিস্তারিত পেজ খোলে না। এখানে সর্বনিম্ন, সর্বোচ্চ ও গড় দাম এবং বাজারভিত্তিক দাম দেখা যায়।
- **Authentication:** Better Auth দিয়ে ইমেইল-পাসওয়ার্ড, Google ও GitHub লগইন; react-hot-toast-এ বার্তা।
- **Profile:** নিজের তথ্য দেখা ও `Update Information` ফর্ম দিয়ে নাম আপডেট।
- **Bengali UI:** বাংলা সংখ্যা ও তারিখ, Hind Siliguri ফন্ট।
- **Responsive design:** মোবাইল থেকে ডেস্কটপ পর্যন্ত Figma ডিজাইন অনুযায়ী।

## Tech Stack

Next.js (App Router), TypeScript, Tailwind CSS, DaisyUI, Better Auth, MongoDB Atlas, react-hot-toast

## Data Source

https://openapi.programming-hero.com/api/bazardor

## Run Locally

```bash
cd b14-a7-bazar-dor
npm install
npm run dev
```

`b14-a7-bazar-dor` ফোল্ডারে `.env.local` ফাইল বানিয়ে এই ভ্যারিয়েবলগুলো দিন: