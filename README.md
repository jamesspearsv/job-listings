# Frontend Mentor - Job listings with filtering solution

This is a solution to the [Job listings with filtering challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/job-listings-with-filtering-ivstIPCt). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Frontend Mentor - Job listings with filtering solution](#frontend-mentor---job-listings-with-filtering-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
    - [Screenshot](#screenshot)
    - [Links](#links)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
    - [Continued development](#continued-development)
  - [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Filter job listings based on the categories

### Screenshot

![Job listings homepage](./screenshots/job%20listing%20homepage.png)

### Links

- Solution URL: [https://github.com/jamesspearsv/job-listings](https://github.com/jamesspearsv/job-listings)
- Live Site URL: [https://job-listings-4ed.pages.dev/](https://job-listings-4ed.pages.dev/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [TypeScript](https://www.typescriptlang.org/) - Type syntax for JavaScript
- [Vite](http://vite.dev/) - Frontend build tool

### What I learned

I approached this project using option two and dynamically rendered page elements using the job data found in `data.json`. I wanted to simulate fetching job data from an API or database so I added an intentional delay to simulate making an API call. I used `useEffect` to achieve this. I also added a loading animation to the app to display during the intentional delay.

```typescript
// simulate fetching job listing data from an api
useEffect(() => {
  const controller = new AbortController();
  const signal = controller.signal;

  async function fetchJobs() {
    // simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 3000));

    // get json data using fetch
    try {
      const res = await fetch('/data.json', { signal });
      if (!res.ok) throw new Error('Response not ok');

      const json = await res.json();
      setJobs(json);
    } catch (error) {
      console.error('Error fetching jobs: ', error);
    }
  }

  fetchJobs();

  return () => {
    controller.abort();
  };
}, []);
```

I also made use of TypeScript to ensure type consistency and avoid errors and bugs when passing values and function between app components. I started by definine a type for each job listing that helped when accessing and using data from `data.json`.

```typescript
export type JobListingType = {
  id: number;
  company: string;
  logo: string; // image url string
  new: boolean;
  featured: boolean;
  position: string;
  role: string;
  level: string;
  postedAt: string;
  contract: string;
  location: string;
  languages: string[];
  tools: string[];
};

export type JobsResponseType = JobListingType[];
```

Using TypeScript was especially useful when attempting to update (add, remove, or clear) the apps filters. I defined a `filterUpdater` function type to reduce bugs when updating the current filters.

```typescript
export type filterUpdater = (
  action: 'add' | 'remove' | 'clear',
  filter?: 'role' | 'level' | 'languages' | 'tools',
  value?: string
) => void;
```

Defining a filters type also helped when working with the filter state throughout the app. The below type defines an object that contains several properties (one boolean value indicating is filters are active and four category properties that each represent an array of strings).

```typescript
export type filterType = {
  active: boolean; // Are the filters active?
  role: string[];
  level: string[];
  languages: string[];
  tools: string[];
};
```

I was able to use the types defined in other components as needed.

```typescript
type FilterTabProps = {
  filterValue: string;
  filterRole: keyof Omit<filterType, 'active'>;
  updateFilter: filterUpdater;
};
```

### Continued development

This app could be expanded into full stack app (either a JAM stack app using a PaaS or a more traditional server-client app). This would allow users to create accounts to either post job openings or view newly posted job openings.

Also, a modal component could be added to the page that would allow users to view additional details about a job posting and even apply to jobs!

## Author

- Website - [James Spears](https://jspears.me)
- Frontend Mentor - [@jamesspearsv](https://www.frontendmentor.io/profile/jamesspearsv)
