This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Form email setup

Contact and admissions inquiries are sent by the server through Gmail SMTP. In the Google account that will send the emails, enable 2-Step Verification and create an App Password under **Google Account > Security > 2-Step Verification > App passwords**. Use that 16-character password, not your normal Google password.

Form submissions are validated on the server and sent with both plain-text and HTML email bodies. User-provided content is HTML-escaped in the HTML body, so markup is displayed as text.

Create `.env.local` in the project root with:

```env
GMAIL_USER=your-school-gmail@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password
GMAIL_TO=yjiya473@gmail.com
```

`GMAIL_TO` is optional; when omitted, emails go to `yjiya473@gmail.com`. Keep `.env.local` private and never commit or expose these values to client-side code. Restart the Next.js dev server after changing the file.

To test, run `npm run dev`, submit the Contact form and an Admissions inquiry with valid details, and confirm both messages arrive in the configured inbox. Check the dev-server terminal for delivery errors. Avoid using real students' sensitive information in test submissions.

For deployment, add the same environment variables to the hosting provider's server-side environment settings. Do not prefix them with `NEXT_PUBLIC_`.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
