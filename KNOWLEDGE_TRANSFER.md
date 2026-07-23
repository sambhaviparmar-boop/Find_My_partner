# Knowledge Transfer (KT) Document: Find My Partner (Backend)

Welcome to the **Find My Partner** codebase! This document provides a complete architectural overview, details of the database schema, Express routes, Socket.io design, and a step-by-step setup guide to help you get up to speed and continue developing the application.

---

## 1. Project Overview
**Find My Partner** is a multi-vertical match-making and collaboration platform designed to connect users based on shared goals. It supports pairing users for:
*   **Hackathons & Projects** (Team formations, invitations, shared workspaces)
*   **Startups & Co-founders**
*   **Fitness** (Gym/running partners)
*   **Study** (Study buddies, subject matches)
*   **Shopping** (Shopping partners)
*   **Travel** (Travel buddies with budget/gender filters)
*   **Dating** (Matching based on interests and profiles)

---

## 2. Technical Stack
*   **Runtime:** Node.js (v18+)
*   **Framework:** Express.js (v5.x)
*   **Database ORM:** Prisma ORM with PostgreSQL
*   **Real-time Communication:** Socket.io (for messaging & live notifications)
*   **Authentication:** JSON Web Tokens (JWT) with Access/Refresh token rotation and bcrypt hashing
*   **Validation:** Zod & Joi schemas
*   **API Documentation:** Swagger UI
*   **Testing:** Jest and Supertest
*   **File Uploads:** Multer & Cloudinary

---

## 3. Project Directory Structure
The codebase follows a modular structure where each business domain/feature is grouped into its own module containing its routes, controller, service, repository, and validation logic.

```
Find_My_partner/
├── Backend/
│   ├── prisma/                  # Database migrations and Prisma schema
│   │   ├── migrations/          # SQL database migration history
│   │   └── schema.prisma        # Master database schema definitions
│   ├── src/
│   │   ├── core/                # Core configurations and shared utilities
│   │   │   ├── config/          # Prisma and Swagger specs
│   │   │   ├── middleware/      # Auth, validate, and global error middleware
│   │   │   ├── services/        # Cloudinary integration
│   │   │   ├── socket/          # Socket.io configuration, room management & auth
│   │   │   └── utils/           # JWT handlers, ApiError & ApiResponse class helpers
│   │   ├── modules/             # Business modules (each containing its own stack)
│   │   │   ├── auth/            # Registration, login, token refresh, and logout
│   │   │   ├── user/            # User account management
│   │   │   ├── profile/         # Core profile details & geolocation
│   │   │   ├── builderPassport/ # Developer portfolio scoring (GitHub, LeetCode, etc.)
│   │   │   ├── matching/        # Matching scores and recommendation logic
│   │   │   ├── team/            # Team creation and management
│   │   │   ├── group/           # Community groups and membership
│   │   │   ├── chat/            # Chat room creation and message handling
│   │   │   ├── reliability/     # Collaboration reliability scoring logic
│   │   │   ├── review/          # Rating other users in different verticals
│   │   │   └── notification/    # Real-time and persistent in-app notifications
│   │   └── shared/              # Shared schemas and sub-directories
│   ├── server.js                # Application entry point (starts server)
│   ├── app.js                   # Express application setup, routes registration
│   ├── package.json             # NPM package scripts & dependencies
│   └── .gitignore               # Excludes node_modules, env secrets, and build logs
└── Frontend/                    # Directory reserved for client UI applications (currently empty)
```

---

## 4. Database Schema (Prisma)
The database has a detailed relational structure. Key entities include:

### Core Entities
*   **User:** Stores credential details (`email`, `password`, `refreshToken`) and binds to all other profile entities.
*   **Profile:** Stores location (`latitude`, `longitude`, `city`, `country`), bio, avatar, and social media handles.
*   **Skill & UserSkill:** Connects users to specific technical or soft skills along with skill levels (`BEGINNER`, `INTERMEDIATE`, `ADVANCED`, `EXPERT`) and years of experience.
*   **BuilderPassport:** Developer-specific data syncing Git/Leetcode/Codeforces stats and calculates scores (`totalScore`) for matchmaking.

### Collaboration & Matching
*   **Match:** Connects a sender and a receiver in a specific category (e.g. HACKATHON) with a computed `matchScore` and status (`RECOMMENDED`, `INTERESTED`, `CONNECTED`, `REJECTED`).
*   **Connection:** Holds peer-to-peer connection statuses (e.g. `PENDING`, `ACCEPTED`, `REJECTED`, `BLOCKED`).
*   **Team & TeamMember:** Facilitates team formation for hackathons or project collaborations. Includes a **Workspace** (stores meeting links & repo details).
*   **Group & GroupMember:** Community spaces where users can converse, apply, and join under matching verticals.

### Gamification & Safety
*   **Reliability:** Calculates a reliability rating across categories (e.g. study, startups) based on connection response rates, successful connections, and completed collaborations.
*   **Review:** Ratings and comments provided by users after a successful connection.
*   **Report & Block:** Moderation and safety structures.

---

## 5. API Routes Map (Prefix: `/api/v1`)
All Express routes are registered inside [app.js](file:///c:/Users/ASHUTOSH%20SHUKLA/Desktop/Find_my_partner/Find_My_partner/Backend/app.js) and mapped to specific modules:

| Endpoint | Controller Module | Purpose |
| :--- | :--- | :--- |
| `/api/v1/auth` | `auth` | Signup, login, logout, refresh tokens |
| `/api/v1/user` | `user` | Fetch and update user account settings |
| `/api/v1/profile` | `profile` | CRUD operations on profiles and lat/long |
| `/api/v1/skill` | `skills` | Fetch available skills and user skill sets |
| `/api/v1/builderPassport`| `builderPassport`| Create/Update GitHub & LeetCode passport scores |
| `/api/v1/matching` | `matching` | Get matches, process interest, reject recommendation |
| `/api/v1/team` | `team` | Create teams, invite members, join teams |
| `/api/v1/workspace` | `workspace` | Manage active workspaces (repos & links) |
| `/api/v1/group` | `group` | Manage groups, memberships, and roles |
| `/api/v1/joinrequest` | `joinrequest` | Join requests for groups/teams |
| `/api/v1/connection` | `connection` | Send/Respond to connection requests |
| `/api/v1/chat` | `chat` | Manage chat instances |
| `/api/v1/message` | `message` | Fetch conversation logs and send messages |
| `/api/v1/notification` | `notification` | Fetch user alerts and mark as read |
| `/api/v1/realiability` | `reliability` | Fetch a user's reliability card metrics |
| `/api/v1/search` | `search` | Elastic/DB search for users based on interests |
| `/api/v1/review` | `review` | Rate partner collaborations |
| `/api/v1/report` | `report` | Report profiles for safety |
| `/api/v1/block` | `block` | Block/unblock users |
| `/api/v1/admin` | `admin` | Admin dashboard routes |

---

## 6. Socket.io Real-Time Event Flows
The system incorporates real-time features using Socket.io located under `src/core/socket`.
1.  **Authentication:** Connection handshakes verify the user's JWT using `socketAuth.js`.
2.  **Online Users Registry:** Tracks connected socket IDs and maps them to User IDs (`onlineUsers.js`).
3.  **Rooms Manager:** Manages active chat rooms (`roomManager.js`).
4.  **Event Listeners (`socketEvents.js`):**
    *   `join_room`: Joins a direct messaging room.
    *   `send_message`: Emits messages dynamically to the receiver.
    *   `typing`: Shows real-time typing indicators.
    *   `disconnect`: Safely clean up state on connection loss.

---

## 7. How to Set Up and Run Locally

Follow these steps to set up the project on your local machine:

### Prerequisites
*   Install **Node.js** (v18+)
*   Install **PostgreSQL** database
*   Create a **Cloudinary** account (for image upload features)

### Step-by-Step Guide
1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/sambhaviparmar-boop/Find_My_partner.git
    cd Find_My_partner/Backend
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables (`.env`):**
    Create a file named `.env` in the `Backend` directory and populate it with your local secrets (refer to `.env.example`):
    ```env
    PORT=5000
    DATABASE_URL="postgresql://<username>:<password>@localhost:5432/<dbname>?schema=public"
    ACCESS_TOKEN_SECRET="your_access_token_secret_here"
    REFRESH_TOKEN_SECRET="your_refresh_token_secret_here"
    CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
    CLOUDINARY_API_KEY="your_cloudinary_api_key"
    CLOUDINARY_API_SECRET="your_cloudinary_api_secret"
    ```

4.  **Database Migration (Prisma):**
    Create tables and apply the schema to your local PostgreSQL instance:
    ```bash
    npx prisma migrate dev --name init
    ```

5.  **Run Development Server:**
    Start the Express and Socket server:
    ```bash
    node server.js
    ```
    *   The backend server will run on `http://localhost:5000`
    *   The API documentation will be available at `http://localhost:5000/api-docs`

6.  **Run Tests:**
    Execute the unit test suites:
    ```bash
    npm test
    ```

---

## 8. Development Roadmap & Next Steps
If you are taking over development, here are the immediate next steps:
1.  **Frontend Architecture:** Initialize a web framework (like React or Next.js) in the `Frontend/` folder.
2.  **Matching Algorithm Optimization:** Optimize the match-making criteria in the matching repository (e.g. geolocation distance matching, skill matching weights).
3.  **Integration of Builder Passport APIs:** Wire up third-party OAuth hooks to dynamically fetch real GitHub stats, Leetcode ratings, and Codeforces metrics rather than mockup data.
