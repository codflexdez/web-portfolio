The future portfolio site will be built with the Next.js framework. 
It will showcase my web development work. 
Currently, it is under construction.


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

1. 
  npm install next-auth @next-auth/prisma-adapter @prisma/client bcrypt

2. to run prisma studio 
- npm install -g dotenv-cli
- dotenv -e .env.local -- npx prisma studio


- (protected) page:
<code> 
<!-- // const getImages = async ({ params }) => { -->
//   const { uImages } = params;
//   let userId = parseInt(uImages[1]);
//   let sessionId = parseInt(uImages[2]);

//   if (!sessionId || !userId) {
//     sessionId = "";
//     userId = "";
//   }

//   const images = await prisma.image.findMany({
//     where: {
//       session: {
//         id: sessionId,
//         user_id: userId,
//       },
//     },
//   });