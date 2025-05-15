# React Community Feed
A React project to view community feed from Stackoverflow build with Next framework.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started Next

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

## Learn More Next

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Git commands mostly used
- `git remote add origin <repository url>` to sync project to remote
- `git push --force -u -origin master` to push to remote
- `git add .` to add changes to commit
- `git commit -m "message"` to do commit with message
- `git push -u origin master` to push changes to origin
- `git log --oneline` to view commit logs
- `git status` to view current git status

## Starting project setup and structure scaffolding
`npx create-next-app@latest react-community-feed` to create a Next.js project with ESLint, Tailwind, App Router.

`npm run dev` to run application that will become available at http://localhost:3000

`npm install styled-components` to add packages for styled components in the project and then to use them to create reusable styled components

## Routing with Next.js

We use _react-router_ package to add declarative routing, in Next.js the folder _pages_ is used for routing as a starting point.

The new _questions_ page is added by creating a folder called _questions_ with an _index.jsx_ file inside of it or we could create a file called _questions.jsx_ without any folder structure.

To retrieve data from _Stack Overflow_ for the application we use an API that returns all the questions that are posted with tag _reactjs_.

This is the stackoverflow API:
https://api.stackexchange.com/2.2/questions?order=desc&sort=hot&tagged=reactjs&site=stackoverflow

It's possible to find more information on above API on the following link:
https://api.stackexchange.com/docs/questions#order=desc&sort=hot&tagged=reactjs&filter=default&site=stackoverflow&run=true

> Relative commit: setup project and first route implementation without SSR.

Now we create routes that supports parameters and the new route will display a specific question using Stack Overflow endpoint API.
We create a new file inside questions folder calle _[id].jsx_ where id is the question's id and the parameter that we use with a _Next.js_ Hook routing library.

This is the Stack Overflow API to get a single question by parameter:
https://api.stackexchange.com/2.2/questions/${id}?site=stackoverflow

The endpoint API that gets a question by its id returns an array, as it expects multiple IDs at once, here we provide only one id therefore we need to get the first items in the returned array.

We now use the _Link_ component from the routing library of _Next.js_ in the _Questions_ component to create a link with its ID and every _Link_ component needs to be wrapped by a component that is able to do routing like a styled _a_ element.

> Documentation for _Link_ component: https://nextjs.org/docs/pages/api-reference/components/link#passhref

> Todo: it's needed to fix problem/error with nested _a_ rised by an incorrect use of styled_component.

> Todo: It's needed to fix error when change _/_ route to point to _Questions_ component.

> Relative commit: Handle questions link route to the single question details view.

## Routing and Pagination
The _Stack Overflow_ API endopoint to retrieve questions tagged by a specific tag return a field called _has\_more_.
If this field has a _true_ value we can request more questions by adding the _page_ query string parameter to the API request and we can use this to implement pagination of the result.

We use _useRouter_ Hook to get the query strings from URL and to implement pagination.

> Relative commit: Add Pagination feature

## Server Side Rendering (SSR) implementation

We'll use the _Next.js_ method _getServerSideProps_ that retrieve data server side on every request.
There are other methods as _getStaticProps_ and _getStaticPaths_ that generate the content statically ad build time.

> More on _Next.js_ data fetching here: https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props.

> Todo: Ater fix of main route for home '/' add SSR in the home page by importing _getServerSideProps_ method and using it in another method that fetch the data from the server.


> [!NOTE]
> Debug Server side, i used this link https://nextjs.org/docs/app/guides/debugging.
> I installed first cross-env with `npm install cross-env` but the i followw the visula studio part of the guide with lanch.json file.

> Relative commit: SSR implementation + Debug configuration.

## Implement SEO with head tags
...

> [!NOTE]
> ...