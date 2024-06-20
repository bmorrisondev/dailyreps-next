## Getting Started

Install the dependencies

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm dev
```

## Environment Setup

Before running the application, you need to set up the necessary environment variables. Copy the `.env.example` file to a new file named `.env.local` and fill in the necessary credentials.

```bash
cp .env.example .env.local
```


Edit the `.env.local` file with your specific values for the Clerk and Neon database credentials.

## Clerk Authentication Setup

This project uses Clerk for user authentication. Ensure you have set up a Clerk application and obtained your API keys. These keys need to be added to your `.env.local` file:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Your Clerk frontend API key.
- `CLERK_SECRET_KEY`: Your Clerk backend API key.

For more detailed instructions on setting up Clerk, refer to the [Clerk documentation](https://clerk.com/docs).

## Neon Database Setup

The application connects to a Neon PostgreSQL database. Ensure your Neon database connection string is correctly configured in your `.env.local` file:

- `DATABASE_URL`: Your Neon database connection string.

### Creating the Database Tables

To ensure that the application functions correctly, you need to set up the necessary database tables. Below are the SQL commands to create the `workouts` and `reps` tables in your NeonDB. These tables are essential for storing workout sessions and their corresponding repetitions.

#### Workouts Table

This table stores information about each workout session.

```sql   
CREATE TABLE workouts (
     id SERIAL PRIMARY KEY,
     name VARCHAR(255),
     isarchived BOOLEAN DEFAULT false,
     targetreps INT,
     userid VARCHAR(255) NOT NULL
   );
```


#### Reps Table

This table records the repetitions associated with each workout.

```sql
   CREATE TABLE reps (
     id SERIAL PRIMARY KEY,
     workoutid INT REFERENCES workouts(id),
     count INT,
     added_on BIGINT,
     userid VARCHAR(255) NOT NULL
   );
```


### Executing the Commands

To execute these commands:

- Log into your Neon Console.
- Navigate to the SQL Editor.
- Enter each command into the editor and run them one at a time.

For more detailed instructions on using the Neon SQL Editor, refer to the [Neon SQL Editor documentation](https://neon.tech/docs/get-started-with-neon/query-with-neon-sql-editor).
