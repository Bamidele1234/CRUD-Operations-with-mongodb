# MongoDB and Mongoose CRUD Operations

This Node.js project showcases basic CRUD (Create, Read, Update, Delete) operations using MongoDB and Mongoose. The application connects to a MongoDB database and performs operations on a "Course" collection.

## Prerequisites

- Node.js installed
- MongoDB installed or access to a MongoDB server
- npm package manager

## Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Update the MongoDB connection URI in `index.ts`:

   ```typescript
   const connectionUri = 'YOUR_MONGODB_URI';
   ```

## Usage

Run the following command to execute the CRUD operations:

```bash
npm start
```

## Operations

### 1. Fetch Courses

```typescript
getCourses();
```

This operation retrieves courses based on specified criteria using MongoDB query operators.

### 2. Remove Course

```typescript
removeCourse('course-id');
```

This operation removes a course from the database based on the provided course ID.

### 3. Update Course

```typescript
updateCourse('course-id');
```

This operation updates a course in the database based on the provided course ID. It demonstrates both the query-first and direct update approaches.

## Database Schema

The MongoDB schema for the "Course" collection includes the following fields:

- `name`: String (required)
- `author`: String
- `tags`: Array of Strings
- `date`: Date (default: current date)
- `isPublished`: Boolean
- `price`: Number
