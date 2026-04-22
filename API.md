# InSyte Mobile API Documentation

## Authentication Endpoints

### Login
**POST** `/api/auth/login`

Request:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "access_token": "jwt_token",
    "refresh_token": "refresh_token",
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "User Name",
      "role": "Admin|Advisor|SchoolAdmin|Teacher",
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00Z"
    }
  }
}
```

### Refresh Token
**POST** `/api/auth/refresh`

Request:
```json
{
  "refreshToken": "refresh_token"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "access_token": "new_jwt_token",
    "refresh_token": "new_refresh_token"
  }
}
```

### Get Current User
**GET** `/api/auth/me`

Response:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "User Name",
    "role": "Admin",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

## Schools Endpoints

### List Schools
**GET** `/api/schools`

Query Parameters:
- `search`: string (optional)
- `page`: number (default: 1)
- `pageSize`: number (default: 20)

Response:
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid",
        "name": "School Name",
        "address": "Address",
        "city": "City",
        "email": "school@example.com",
        "phone": "+90xxx",
        "isActive": true,
        "createdAt": "2024-01-01T00:00:00Z"
      }
    ],
    "totalCount": 100
  }
}
```

### Get School Detail
**GET** `/api/schools/:id`

Response:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "School Name",
    "address": "Address",
    "city": "City",
    "email": "school@example.com",
    "phone": "+90xxx",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

### Get School Teachers
**GET** `/api/schools/:id/teachers`

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Teacher Name",
      "email": "teacher@example.com",
      "schoolId": "school_uuid",
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

## Teachers Endpoints

### List Teachers
**GET** `/api/teachers`

Query Parameters:
- `search`: string (optional)
- `page`: number (default: 1)
- `pageSize`: number (default: 20)

Response:
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid",
        "name": "Teacher Name",
        "email": "teacher@example.com",
        "schoolId": "school_uuid",
        "isActive": true,
        "createdAt": "2024-01-01T00:00:00Z"
      }
    ],
    "totalCount": 50
  }
}
```

### Get Teacher Detail
**GET** `/api/teachers/:id`

Response:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Teacher Name",
    "email": "teacher@example.com",
    "schoolId": "school_uuid",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

### Get Teacher Videos
**GET** `/api/teachers/:id/videos`

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "Video Title",
      "filePath": "path/to/video",
      "schoolId": "school_uuid",
      "teacherUserId": "teacher_uuid",
      "subject": "Mathematics",
      "status": "EVALUATED",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

## Videos Endpoints

### List Videos
**GET** `/api/videos`

Query Parameters:
- `search`: string (optional)
- `page`: number (default: 1)
- `pageSize`: number (default: 20)

Response:
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid",
        "title": "Video Title",
        "filePath": "path/to/video",
        "schoolId": "school_uuid",
        "teacherUserId": "teacher_uuid",
        "subject": "Mathematics",
        "status": "EVALUATED",
        "createdAt": "2024-01-01T00:00:00Z"
      }
    ],
    "totalCount": 200
  }
}
```

### Get Video Detail
**GET** `/api/videos/:id`

### Evaluate Video
**POST** `/api/videos/:id/evaluate`

## Reports Endpoints

### List Reports
**GET** `/api/reports`

Query Parameters:
- `search`: string (optional)
- `page`: number (default: 1)
- `pageSize`: number (default: 20)

Response:
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid",
        "evaluationId": "eval_uuid",
        "pdfPath": "path/to/pdf",
        "approvedByUserId": "user_uuid",
        "status": "APPROVED",
        "approvedAt": "2024-01-01T00:00:00Z"
      }
    ],
    "totalCount": 150
  }
}
```

### Get Report Detail
**GET** `/api/reports/:id`

### Get Report PDF
**GET** `/api/reports/:id/pdf`

Returns PDF file download

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error message",
  "data": null
}
```

Common HTTP Status Codes:
- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error

## Rate Limiting

API requests are rate-limited. Implement exponential backoff for retries.

## Pagination

For paginated endpoints:
- `page`: Starting from 1
- `pageSize`: Default 20, max 100
- `totalCount`: Total number of items

## Date Format

All dates are in ISO 8601 format: `YYYY-MM-DDTHH:mm:ssZ`
