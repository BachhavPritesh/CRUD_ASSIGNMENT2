# Notes Management REST API

A RESTful API for managing notes built with Node.js, Express, and MongoDB.

## Features

- Create, Read, Update, and Delete (CRUD) notes
- Pagination support for listing notes
- Sort notes by various fields
- Filter notes by search queries
- Error handling middleware
- RESTful API design

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **Dev Tools**: Nodemon

## Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)

## Installation

```bash
npm install
```

## Configuration

Create a `.env` file in the root directory:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/notes
```

## Usage

### Start the server

Production:
```bash
npm start
```

Development (with auto-reload):
```bash
npm run dev
```

The server will run on `http://localhost:3000`

## API Endpoints

### Notes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notes` | Get all notes (supports pagination, sorting, filtering) |
| GET | `/api/notes/:id` | Get a single note by ID |
| POST | `/api/notes` | Create a new note |
| PUT | `/api/notes/:id` | Update an existing note |
| DELETE | `/api/notes/:id` | Delete a note |

### Query Parameters

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `sort` - Sort field (e.g., `title`, `createdAt`)
- `order` - Sort order (`asc` or `desc`)
- `search` - Search in title and content

### Request/Response Examples

#### Create Note
```bash
POST /api/notes
Content-Type: application/json

{
  "title": "My Note",
  "content": "Note content here"
}
```

#### Response
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "title": "My Note",
    "content": "Note content here",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

## Project Structure

```
├── src/
│   ├── config/
│   │   └── db.js           # Database connection
│   ├── controllers/
│   │   ├── crud.controller.js
│   │   ├── filter.controller.js
│   │   ├── pagination.controller.js
│   │   └── sort.controller.js
│   ├── middlewares/
│   │   └── errorHandler.js
│   ├── models/
│   │   └── note.model.js
│   ├── routes/
│   │   └── note.routes.js
│   ├── utils/
│   │   └── responseHelper.js
│   ├── app.js             # Express app
│   └── index.js          # Entry point
├── package.json
└── README.md
```

## License

ISC