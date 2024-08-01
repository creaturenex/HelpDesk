# Help Desk

## A Fullstack Ticketing System

## [HelpDesk Demo](https://helpdesk-uxty.onrender.com/)

### Instructions

- clone the repo

#### Env: development

```bash
cd backend
npm install

cd ../frontend
npm install
npm run dev

// open an new terminal from root dir
cd backend
npm run dev
```

#### Env: production

```bash
// assuming packages have been install per above step
cd frontend
npm run build

// open an new terminal from root dir
cd ../backend
npm run build
npm run start
```

### Backend

The backend is built using node, express, typescript. The backend is designed mostly as an API interface.

The database is using MongoDB due to project requirements. If multiple users were required, then a postgres DB would have been used to show relationships. Documented were created in Mongo with expiration dates to free up space in the DB.

Crud functionality implemented, but delete was not implemented as it not part of the spec. The frontend is built and served as static assets.

### Frontend

The frontend is built on Typescript, React, Shadcn for components, Tan Stack Router for routing components, and Vite for bundling.

I decided to use a multipage app design as it would handle the ticket models structure better. I used very basic auth with session and no additional users, to highlight public and protected endpoints.

For this reason, I setup the archtecture to fetch individual ticket data from the backend per the routes setup in the back for both the show and edit components. The ticket data could have been passed as props to the relevant components but wanted to show the data fetching and have a more traditional MVC setup.

### Challenges

Typing is a challenge when using external libraries, but was able to get it to work.

Tan stack router is newer library and a little different than react-router. Hence issues with using authenticated routes.

Additional my original implementation of the view ticket component would not parse the passed in params :id and used a work around to make it work.

### Future Scope

Use docker compose and Make file to make this a one line executable, for easier developer experience.

Use tan stack router authentication for better component rendering.

Extract out ticket form into it's component. This was not done due to time constraint and to get an MVP in a short time. For the most part New, View, Edit are the same component.

Use OAuth for a robust auth system.

Add tests, testing was setup but not implemented due to time constraints.

Use [express session and memorystore](https://github.com/roccomuso/memorystore) to prevent memory leak happening in production.
