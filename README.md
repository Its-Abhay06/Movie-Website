# Movie Search Website

A simple and responsive movie search application built with React and Vite. It allows users to search for movies using The Movie Database (TMDB) API and displays the results in a clean card-based layout. The application also features a "Trending Movies" section and integrates with Appwrite to track and display search analytics.

## Features

- **Movie Search**: Search for movies by title with real-time results.
- **Debounced Input**: Search input is debounced to prevent excessive API calls while typing.
- **Trending Section**: Displays the most-searched movies, powered by Appwrite analytics.
- **Clean UI**: Modern and responsive interface built with Tailwind CSS.
- **Error Handling**: Displays user-friendly messages for API errors or when no movies are found.

## Tech Stack

- **Framework**: [React](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Backend as a Service (BaaS)**: [Appwrite](https://appwrite.io/) (for search analytics)
- **Movie Data API**: [The Movie Database (TMDB)](https://www.themoviedb.org/documentation/api)

## Getting Started

Follow these instructions to get a local copy of the project up and running.

### Prerequisites

- Node.js (v18 or higher recommended)
- An Appwrite account ([cloud](https://cloud.appwrite.io/) or self-hosted)
- A TMDB API key

### Installation

1. Clone the repository to your local machine:
   ```bash
   git clone "https://github.com/Its-Abhay06/Movie-Website.git"
   cd Movie-Website
   ```

2. Install the necessary dependencies:
   ```bash
   npm install
   ```

### Configuration

1. Create a `.env` file in the root of the project.

2. Add the following environment variables to your `.env` file. You will need to get these keys and IDs from your TMDB and Appwrite accounts.

   ```env
   # Your TMDB API Key (v3 Auth)
   VITE_TMDB_API_KEY="your_tmdb_api_key"

   # Your Appwrite Project Details
   VITE_APPWRITE_PROJECT_ID="your_appwrite_project_id"
   VITE_APPWRITE_DATABASE_ID="your_appwrite_database_id"
   VITE_APPWRITE_COLLECTION_ID="your_appwrite_collection_id"
   VITE_APPWRITE_ENDPOINT="https://cloud.appwrite.io/v1" # Or your self-hosted endpoint
   ```

### Appwrite Setup

To get the search analytics and "Trending Movies" feature working, you need to set up a collection in your Appwrite project.

1.  **Create a Project**: Log in to your Appwrite Console and create a new project.

2.  **Create a Database**: In your project, navigate to **Databases** and create a new database.

3.  **Create a Collection**: Inside your new database, create a collection (e.g., named `metrics`).

4.  **Add Attributes**: Go to the **Attributes** tab of your collection and add the following:
    - `searchTerm`: **String**, Required
    - `count`: **Integer**, Not Required
    - `movie_id`: **Integer**, Required
    - `poster_url`: **URL**, Required

5.  **Create an Index**: Go to the **Indexes** tab and create an index on the `searchTerm` attribute. This is crucial for querying.
    - **Index Key**: `idx_searchTerm`
    - **Index Type**: `key`
    - **Attributes**: `searchTerm`

6.  **Set Permissions**: Go to the **Settings** tab and under **Permissions**, add a new role:
    - **Role**: `Any`
    - **Permissions**: Check `Create`, `Read`, and `Update`.

## Running the Application

Once you have installed the dependencies and configured your environment variables, you can run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run preview`: Serves the production build locally.
- `npm run lint`: Lints the project files using ESLint.

---

Happy coding!