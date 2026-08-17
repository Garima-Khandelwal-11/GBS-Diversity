# Data Integration Engineer — Application Portfolio

Prepared for a Navan application (referred by a team member on Navan's travel management system group).

## Positioning

I build the layer where systems actually talk to each other — REST APIs, auth flows, third-party services, and the data pipelines that keep them in sync. The sections below draw on a full-stack platform I helped ship end-to-end (this repository), framed around the integration work inside it.

## Skills

**Integration & APIs**
REST API design, OAuth 2.0, JWT auth flows, webhooks, third-party API integration, request/response validation, error handling & retries

**Data Pipelines**
Feature encoding, schema mapping, data validation, cross-service aggregation, batch & real-time processing concepts

**Backend & Data Stores**
Node.js, Express, Python/Flask, MongoDB, Mongoose, SQL fundamentals

**Languages**
JavaScript (ES6+), Python, SQL, JSON

**Tooling & Practice**
Git/GitHub, Postman, environment-based config, npm/Vite, debugging distributed services

**Collaboration**
Cross-functional teams, translating requirements into technical specs, technical documentation, hackathon delivery

## Projects

### MentHer — Mentorship Matching Platform
*Standard Chartered Diversity Hackathon 2025 · Full-stack / integration engineer*

- Built the Express.js REST API layer (15+ endpoints) integrating five MongoDB collections — users, mentees, mentors, matches, courses — through Mongoose, covering auth, profile CRUD, and matching workflows.
- Connected the Node backend to a standalone Python/Flask matching microservice over HTTP, passing mentee/mentor JSON payloads and consuming ranked-match responses in real time.
- Combined Google OAuth 2.0 with JWT access, refresh, and reset tokens for authentication, including dedicated token-verification endpoints consumed by the frontend.
- Integrated the SendGrid transactional email API to notify mentors and mentees on a successful match, handling API-key configuration and delivery failures.
- Wired the React/Redux frontend to all of the above through Axios, and used amCharts to visualize match scores and mentorship progress from the integrated data.

**Stack:** Node.js, Express, MongoDB, React, Redux Toolkit, SendGrid, OAuth 2.0/JWT

### Mentor–Mentee Matching Microservice
*Companion service to MentHer · Python/Flask*

- Designed a standalone Flask microservice exposing a `/match` endpoint that ingests mentee and mentor profile data as JSON.
- Built a feature-encoding pipeline that turns career goals, skills, and interests into weighted vectors (5/3/2), filtering to attributes shared across the population before encoding.
- Computed pairwise cosine similarity across mentee and mentor vectors with scikit-learn/NumPy and returned the top 5 ranked matches per mentee.
- Kept the matching logic decoupled from the main API so it could be deployed, scaled, and iterated on independently — a small service-oriented integration pattern end to end.

**Stack:** Python, Flask, scikit-learn, NumPy, REST

---

*Draft — swap in any additional projects, and adjust the positioning line once you know which team you're applying to.*
