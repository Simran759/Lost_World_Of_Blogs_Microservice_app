# Blog Platform – Microservices Learning Project

This project is a **microservices-based backend system** built to deeply understand **real-world backend architecture problems** such as service boundaries, cache invalidation, async communication, and responsibility separation.

This is **not** a CRUD blog app.  
This is an **architecture-first learning project**.

---

## Why This Project Exists

Most projects:
- Put everything in one service
- Treat microservices as folder separation
- Add Redis without understanding invalidation
- Use synchronous calls everywhere
- Ignore ownership of data

This project was built to **unlearn those bad habits**.

The goal was to **force architectural trade-offs**, not hide them.

---

## Core Services and Responsibilities

### 1. User Service  
**Focus:** Identity and authentication

**Responsibilities**
- Google OAuth authentication
- User profile management
- JWT issuance for authorization
- Emits user-related events

**Key Learning**
Authentication and identity should be isolated.  
Every other service trusts tokens, not users.

---

### 2. Author Service  
**Focus:** Blog ownership and lifecycle control

This service **does NOT serve blog reads**.

**Responsibilities**
- Create blogs
- Update blogs
- Delete blogs
- Author-level authorization
- Emit blog lifecycle events

**What this teaches**
- Write operations and ownership belong together
- Authors control content
- Business rules live near ownership, not consumers

The Author Service **never optimizes for reads**.

---

### 3. Blog Service  
**Focus:** Read-heavy operations and user interaction

This service is **optimized for reads**, not ownership.

**Responsibilities**
- Read blogs
- List blogs (feed, author-wise, saved)
- Handle comments
- Handle saved/bookmarked blogs
- Cache blog data using Redis
- React to blog lifecycle events

**What this teaches**
- Read models ≠ write models
- CQRS-style separation without heavy frameworks
- Scaling reads independently from writes

---

## Write vs Read Separation (Very Intentional)

| Concern | Author Service | Blog Service |
|------|---------------|--------------|
| Create blog | ✅ | ❌ |
| Update blog | ✅ | ❌ |
| Delete blog | ✅ | ❌ |
| Read blog | ❌ | ✅ |
| Comments | ❌ | ✅ |
| Saved blogs | ❌ | ✅ |
| Caching | ❌ | ✅ |

This split exists to **make scaling decisions explicit**.

---

## Event-Driven Architecture (RabbitMQ)

Services do **not** call each other directly for state changes.

Instead:
- Author Service emits events
- Blog Service consumes them
- Cache is invalidated asynchronously

**Example Events**
- `BLOG_CREATED`
- `BLOG_UPDATED`
- `BLOG_DELETED`

**What this teaches**
- Loose coupling
- Async consistency
- Why synchronous service chains are fragile

---

## Redis Caching (Read-Optimized)

Redis is used **only** in the Blog Service.

**Cached Data**
- Individual blogs
- Blog feeds
- Author blog lists
- Comment counts

**Key Learning**
Caching belongs near **read-heavy consumers**, not data owners.

---

## Cache Invalidation (The Hard Part)

Cache is invalidated using **events**, not function calls.

**Flow**
1. Author modifies blog
2. Event is published
3. Blog Service invalidates related cache keys
4. Next read fetches fresh data

**What this teaches**
- Why cache invalidation is hard
- Why coupling services for cache logic is a mistake
- Eventual consistency in practice

---

## Comments and Saved Blogs (Blog Service Only)

Comments and saved blogs:
- Are user interactions
- Are read-heavy
- Change frequently
- Do not affect blog ownership

So they live in the **Blog Service**.

**Learning**
Not everything related to a blog belongs to the blog owner service.

---

## Authentication Strategy

- Google OAuth for authentication
- JWT for authorization between services
- No passwords stored

**Why**
- Smaller attack surface
- Real-world auth flow
- Identity decoupled from business logic

---

## Media Handling (Cloudinary)

- Blog images
- Author avatars

Stored externally.

**Learning**
Backends should manage data, not files.

---

## Architectural Principles Applied

- Separation of concerns
- Read/write responsibility split
- Event-driven communication
- Read scalability
- Failure isolation
- Ownership-based service design

This is closer to **real production thinking** than most demo projects.


---

## Intentional Gaps

Deliberately excluded:
- API Gateway
- Rate limiting
- Distributed tracing
- Centralized logging
- Service orchestration

Those are **next-level concerns**, not core learning goals.

---

## Who Should Study This Project

- Backend developers moving beyond CRUD
- Engineers learning microservices properly
- Anyone confused about caching and invalidation
- Developers tired of fake “system design” projects

---

## Final Takeaway

If you understand **why**:
- writes live in Author Service
- reads live in Blog Service
- cache lives near consumers
- events replace direct calls

Then you’re no longer thinking like a beginner backend developer.

That was the goal.
