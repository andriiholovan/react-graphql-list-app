# STAR WARS characters library app

- Styles: [Tailwind](https://tailwindcss.com/) + [NextUI](https://nextui.org/) (accessibility ready)
- Router: [@tanstack/react-router](https://tanstack.com/router/latest) file based routing
- Data fetching: [@tanstack/react-query](https://tanstack.com/query/latest) + GraphQL client [graphql-request](https://github.com/jasonkuhrt/graphql-request)
- Testing: [Vitest](https://vitest.dev/)

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

Dev server is running on http://localhost:3001/

## Tests

```bash
npm run test
```

### ROADMAP
- [x] [experiments] In /people and /people/$peopleId routes used different @tanstack/query + @tanstack/router methods to retrieve data from cache
- [ ] [performance] Improve requests caching
- [ ] [UX] Improve error handling for some cases
- [ ] [performance] Fetch data dynamically (per_page)
- [ ] [UX] Improve pages loading states, replace default spinners with skeleton pattern
- [ ] [UI] Improve responsiveness for screens lower than 576px
- [ ] [performance] Add code-splitting

### KNOWN ISSUES

- [ ] [UI] Pagination shift on the last page
