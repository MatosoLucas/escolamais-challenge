## Personal Considerations
For this challenge I've used a CRA template of mine that can be found [here](https://github.com/MatosoLucas/cra-template)

The final version of the application was deployed to vercel and can be found [here](https://escolamais-challenge.vercel.app/)

In the src folder you will find an images folder containing images from the desktop version as well as the mobile version.

Since the [fake api](https://jsonplaceholder.typicode.com/) will not update on the server, every new todo created by the user will receive the id: 201. So if you create 2 or more new todos and try to change de completion state of one of the new ones, it will override the first one.


## Stack used

- [React (CRA)](https://reactjs.org/)

- [TypeScript](https://www.typescriptlang.org/)

I've been using typescript on all my projects and with no surprise I've used on this one too. Making the code easier to debug and more readable.


- [Tailwind CSS](https://tailwindcss.com/)

Since it's a differential for the job, I've decided to use Tailwind on this project.

## Getting Started

First, clone the repository 
```bash
$ git clone https://github.com/MatosoLucas/escolamais-challenge.git
```

Go to the project folder

```bash
$ cd escolamais-challenge
```

Install dependencies
```bash
$ yarn install
```
Run the project
```bash
$ yarn start
```
Open http://localhost:3000
