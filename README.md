# Olympic Games App 🏅

## Context

This project is an Angular application that displays statistics about the Olympic Games.  
It provides fox example:  
- The number of participating countries  
- The number of Olympic Games editions  
- The total number of medals per country  
- Interactive charts (pie and line) to visualize data  

## 🚀 Getting Started

### Prerequisites
This project was generated with:
- [Angular CLI](https://github.com/angular/angular-cli) version 18.0.3.
- [Node.js](https://nodejs.org/) (LTS version recommended 20)

Don't forget to install your node_modules before starting (`npm install`).

### Dependencies

We are using various dependencies on this project.
For the charts we are using the ones below. You don't need to install them separately, they are already installed when you runned the command line `npm install` in the previous step as they were in the package.json. 
You can learn more about them by reading the documentation with the links provided below.

- [Chart.js](https://www.chartjs.org/) — Base chart rendering library
- [ng2-charts](https://valor-software.com/ng2-charts/) — Angular wrapper for Chart.js
- [chartjs-plugin-datalabels](https://chartjs-plugin-datalabels.netlify.app/) — Plugin to display labels on charts (used to show country names outside the pie slices)

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Architecture

As you can see, an architecture has already been defined for the project. It is just a suggestion, you can choose to use your own. The predefined architecture includes (in addition to the default angular architecture) the following:

src/
├── core/              # business logic  (`services` and `models` folders)
│   ├── models/        # TypeScript interfaces (Olympic, Participation, etc.) and Types
│   └── services/      # services (OlympicService to load data)
├── components/        # contains every reusable components (CardComponent, RerturnButtonComponent, etc...)
├── pages/             # contains components used for routing (Home, Detail, ...)
└── assets/            # static data (`olympic.json`)

I suggest you to start by understanding this starter code. Pay an extra attention to the `app-routing.module.ts` and the `olympic.service.ts`.

Once mastered, you should continue by creating the typescript interfaces inside the `models` folder. As you can see I already created two files corresponding to the data included inside the `olympic.json`. With your interfaces, improve the code by replacing every `any` by the corresponding interface.

You're now ready to implement the requested features.

Good luck!
