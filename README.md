# বাজার দর (BazarDor)

## প্রজেক্টের বিবরণ

বাজার দর একটি Next.js ওয়েব অ্যাপ, যেখানে নিত্যপ্রয়োজনীয় পণ্যের (চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ ও মসলা) আজকের বাজারদর, গড় দাম এবং দামের বাড়া-কমা এক জায়গায় দেখা যায়। ব্যবহারকারী সাইন আপ বা সাইন ইন করে পণ্যের বিস্তারিত তথ্য ও নিজের প্রোফাইল দেখতে পারেন।

## লাইভ লিংক

https://b14-a7-bazar-dor-nine.vercel.app

## GitHub রিপোজিটরি

https://github.com/arafat-hossain12/B14-A7-Bazar-Dor

## মূল ফিচার

- **ক্যাটেগরিভিত্তিক বাজারদর:** Navbar-এর ক্যাটেগরি থেকে প্রতিটি ক্যাটেগরির পণ্য, দাম ও দামের পরিবর্তন দেখা যায়।
- **লাইভ টিকার:** পেজের ওপরে পণ্যের দাম ও বাড়া-কমার শতাংশ স্ক্রল করে দেখায়।
- **সবচেয়ে বেশি বাড়া ও কমা পণ্য:** দাম সবচেয়ে বেশি বেড়েছে বা কমেছে এমন পণ্য হোম পেজে দেখায়।
- **ক্যাটেগরি পেজে সর্ট:** দাম অনুযায়ী পণ্য সাজিয়ে দেখা যায়।
- **অথেনটিকেশন:** ইমেইল-পাসওয়ার্ড, Google ও GitHub দিয়ে সাইন আপ ও সাইন ইন (Better Auth)।
- **সুরক্ষিত রুট:** লগইন ছাড়া পণ্যের বিস্তারিত পেজ দেখা যায় না, সাইন ইন পেজে নিয়ে যায়।
- **প্রোফাইল ও আপডেট:** নিজের তথ্য দেখা এবং নাম আপডেট করা।
- **টোস্ট নোটিফিকেশন:** সফল বা ব্যর্থ কাজের বার্তা দেখায় (react-hot-toast)।
- **লোডিং স্কেলিটন ও কাস্টম ৪০৪ পেজ।**
- **বাংলা ইন্টারফেস:** বাংলা সংখ্যা, তারিখ ও Hind Siliguri ফন্ট।
- **রেসপন্সিভ ডিজাইন:** মোবাইল, ট্যাবলেট ও ডেস্কটপে কাজ করে।

## ডেটা সোর্স

https://openapi.programming-hero.com/api/bazardor

## ব্যবহৃত টেকনোলজি

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- DaisyUI
- Better Auth (ইমেইল-পাসওয়ার্ড, Google, GitHub)
- MongoDB (Atlas)
- react-hot-toast
- Vercel (ডিপ্লয়মেন্ট)

## পেজ ও রুট

| রুট | বিবরণ |
| --- | --- |
| `/` | হোম পেজ |
| `/category/[slug]` | ক্যাটেগরি পেজ |
| `/product/[slug]` | পণ্যের বিস্তারিত (লগইন প্রয়োজন) |
| `/signin` | সাইন ইন |
| `/signup` | সাইন আপ |
| `/profile` | আমার প্রোফাইল (লগইন প্রয়োজন) |
| `/profile/update` | প্রোফাইল আপডেট (লগইন প্রয়োজন) |
| `/privacy` | গোপনীয়তা নীতি |

## লোকালে চালানোর নিয়ম

```bash
git clone https://github.com/arafat-hossain12/B14-A7-Bazar-Dor.git
cd B14-A7-Bazar-Dor/b14-a7-bazar-dor
npm install
```

প্রজেক্ট ফোল্ডারে `.env.local` ফাইল বানিয়ে নিচের মানগুলো দিন:

```env
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB=bazardor
BETTER_AUTH_SECRET=your_random_secret
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

তারপর সার্ভার চালু করুন:

```bash
npm run dev
```

ব্রাউজারে [http://localhost:3000](http://localhost:3000) খুলুন।