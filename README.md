# FitLog

FitLog is a modern workout planning and tracking web application built for people who want a simple and focused way to discover workouts, create a daily workout plan, and track completed exercises.

The application uses a dark, minimal gym-focused interface with a responsive layout for mobile, tablet, and desktop devices.

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- Next.js App Router
- React Context API
- REST API
- React Toastify
- JavaScript ES6+

## Key Features

### 1. Workout Library
Browse a collection of workouts with information including:

- Workout name
- Muscle groups
- Equipment
- Difficulty
- Duration
- Calories burned
- Sets and reps
- Rating

### 2. Workout Details
Each workout has a dedicated details page containing:

- Workout description
- Muscle groups
- Equipment
- Difficulty
- Sets and reps
- Duration
- Calories
- Rating
- Step-by-step instructions

### 3. My Plan
Users can add workouts to their daily plan and manage their planned exercises.

The daily plan supports a maximum of five workouts.

### 4. Save Workouts
Users can save workouts for later and access them from the Saved section.

### 5. Workout Progress
Users can mark planned workouts as completed or remove them from their plan.

Toast notifications provide feedback when workouts are added, saved, completed, or removed.

## Additional Features

- Sort workouts by Duration, Calories, or Rating
- Responsive mobile, tablet, and desktop design
- Dynamic workout routes
- API-based workout data
- Live plan and saved counters
- Empty states for Plan and Saved sections
- Context API for global workout state

## API

FitLog retrieves workout data from the FitLog REST API.

API endpoint:

`https://api.api-store.workers.dev/api/fitlog`

## Project Structure

```text
fitlog/
├── app/
│   ├── my-plan/
│   ├── workouts/
│   │   └── [id]/
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── WorkoutCard.tsx
│   ├── WorkoutLibrary.tsx
│   ├── WorkoutDetails.tsx
│   ├── PlanWorkoutCard.tsx
│   └── Footer.tsx
├── context/
│   └── FitnessContext.tsx
├── lib/
│   └── api.ts
├── types/
│   └── workout.ts
└── README.md
varcel app link:https://b14-a6-fit-log-indol-psi.vercel.app/
github repository link:https://github.com/Dipta0071/B14-A6-Fit-Log