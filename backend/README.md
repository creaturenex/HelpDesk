# Help Desk

## A Fullstack Ticketing System

### Instructions

- clone the repo


```
cd backend
npm install

cd ../frontend

```

### Backend

The backend is built using node, express, typescript. The backend is designed mostly as an API interface. The database is using MongoDB due to project requirements. If multiple users were required, then a postgres DB would have been used to show relationships. Mostly crud functionality. Delete was not created as not part of the spec, but documented were created in Mongo with expiration dates to free up space in the DB. The frontend is built and served as static assets.

### Frontend

The frontend is built on Typescript, React, Shadcn for components, Tan Stack Router for routing components, and Vite for bundling.

I decided to use a multipage app design as it would handle the ticket models structure better.

I used very basic auth with session and no additional users, to hightlight public and protected endpoints.

### Challenges

Typing is a challenge when using external libraies 

### Future Scope

Use docker compose and Make file to make this a one line executable, for easier developer experience.

Use tan stack router authentication for better component rendering.

Extract out ticket form into it's component. This was not done due to time constraint and to get an MVP in a short time. For the most part New, View, Edit are the same component.

Use OAuth for a robust auth system.


