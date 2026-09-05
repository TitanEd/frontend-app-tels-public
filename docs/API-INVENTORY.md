# Public MFE — API requirements (backend contract + frontend fallback)

**Audience:** Backend (create these endpoints / shapes) · Frontend (call them; mock fallback if missing).  
**No code in this doc** — contract only.  
**Base URL:** `{LMS_BASE_URL}` or agreed public API host (e.g. `http://local.openedx.io:8000`).

### Rules
1. Backend returns the **success JSON** shapes below (same keys, same nesting).
2. Frontend calls these APIs for live data.
3. **On fail / empty / missing field** → use **mock / fallback** so the page never blanks.
4. Prefer Open edX existing APIs where noted; TitanEd wrappers must match these shapes.

### Fallback priority
```
1. API field value (if present and non-empty)
2. Mock / fallback value for that course or section
3. Safe empty UI (hide optional block) — never crash
```

### How to read each API below
```
API        → method + URL
PAYLOAD    → what frontend sends (POST / body / params)
SUCCESS    → what backend returns on OK
FAIL       → what backend returns on error + what frontend does
```

---

## Endpoint index

| # | Endpoint | Method | Used by |
|---|----------|--------|---------|
| 1 | `/search/unstable/v0/course_list_search/` **or** `/api/tels/v1/courses/search/` | POST | Home popular + Courses catalog |
| 2 | `/api/courseware/course/{courseId}` **or** `/api/tels/v1/courses/{id}/` | GET | Course detail |
| 3 | `/change_enrollment` | POST | Enroll now |
| 4 | `/api/tels/v1/courses/{id}/suggested/` | GET | Suggested courses |
| 5 | `/api/tels/v1/home/promo/` | GET | Home promo video |
| 6 | `/api/tels/v1/contact/` | POST | Contact form |

---

# API 1 — Course list (Home popular + Courses page)

### API
```
POST {BASE}/search/unstable/v0/course_list_search/
```
**TitanEd wrapper (if enriching LMS):**
```
POST {BASE}/api/tels/v1/courses/search/
Content-Type: application/json
```

### PAYLOAD (frontend sends)

```json
{
  "page_size": 8,
  "page_index": 0,
  "search_string": "AI",
  "org": ["OpenedX"],
  "language": ["en"],
  "modes": ["audit"],
  "subject": ["Technology"],
  "level": ["Introductory"]
}
```

| Field | Required | Type | Example | Notes |
|-------|----------|------|---------|-------|
| `page_size` | **yes** | number | `4` (home) / `8` (catalog) | |
| `page_index` | **yes** | number | `0` | 0-based |
| `search_string` | no | string | `"AI"` | Omit or `""` if empty |
| `org` | no | string[] | `["OpenedX"]` | |
| `language` | no | string[] | `["en"]` | |
| `modes` | no | string[] | `["audit"]` | |
| `subject` | no | string[] | `["Technology"]` | TitanEd enriched |
| `level` | no | string[] | `["Introductory"]` | TitanEd enriched |

**Home popular payload example:**
```json
{
  "page_size": 4,
  "page_index": 0
}
```

### SUCCESS (backend returns)

```json
{
  "took": 0,
  "total": 2,
  "results": [
    {
      "_id": "course-v1:OpenedX+DemoX+DemoCourse",
      "_index": "course_info",
      "_type": "_doc",
      "data": {
        "id": "course-v1:OpenedX+DemoX+DemoCourse",
        "course": "course-v1:OpenedX+DemoX+DemoCourse",
        "content": {
          "display_name": "Open edX Demo Course",
          "overview": "Long overview text or HTML…",
          "number": "DemoX",
          "short_description": "Short card blurb for the course."
        },
        "image_url": "/asset-v1:OpenedX+DemoX+DemoCourse+type@asset+block@DemoX-Course-Card.png",
        "org_image_url": "/static/studio/images/logo.png",
        "start": "2026-01-01T00:00:00",
        "number": "DemoX",
        "org": "OpenedX",
        "modes": ["honor"],
        "catalog_visibility": "both",
        "language": "en",
        "effort": "40",
        "enrollment_start": "2026-01-01T00:00:00",
        "slug": "open-edx-demo-course",
        "subject": "Technology",
        "level": "Introductory",
        "skills": ["Open edX", "Course design", "LMS"],
        "type": "Course",
        "duration": "2 hours",
        "free": true,
        "rating": 4.8,
        "reviews": 1240,
        "start_date_label": "Self-paced"
      }
    }
  ],
  "aggs": {
    "language": { "terms": { "en": 2 }, "total": 2, "other": 0 },
    "modes": { "terms": { "audit": 1, "honor": 1 }, "total": 2, "other": 0 },
    "org": { "terms": { "OpenedX": 1, "demo_unv2": 1 }, "total": 2, "other": 0 },
    "subject": { "terms": { "Technology": 1, "Education": 1 }, "total": 2, "other": 0 },
    "level": { "terms": { "Introductory": 1, "Intermediate": 1 }, "total": 2, "other": 0 }
  },
  "max_score": 1.0
}
```

**Frontend reads (field → fallback if that field missing):**

| UI need | JSON path | Required? | Fallback if missing |
|---------|-----------|-----------|---------------------|
| Course id | `results[].data.id` | **yes** | Skip card / use mock course |
| Title | `results[].data.content.display_name` | **yes** | Mock title |
| Short desc | `results[].data.content.short_description` | preferred | Mock `shortDesc` |
| Org | `results[].data.org` | **yes** | Mock org |
| Image | `results[].data.image_url` | **yes** | Mock image URL |
| Language | `results[].data.language` | preferred | Mock `"en"` |
| Modes | `results[].data.modes` | preferred | `["audit"]` |
| Slug | `results[].data.slug` | preferred | Derive from id / mock |
| Subject | `results[].data.subject` | preferred | Mock subject |
| Level | `results[].data.level` | preferred | Mock level |
| Skills | `results[].data.skills` | optional | Mock `[]` |
| Type | `results[].data.type` | preferred | `"Course"` |
| Duration | `results[].data.duration` | preferred | From `effort` or mock |
| Free | `results[].data.free` | preferred | Infer from modes or mock `true` |
| Rating | `results[].data.rating` | optional | Mock rating |
| Reviews | `results[].data.reviews` | optional | Mock reviews |
| Total | `total` | **yes** | `results.length` or mock length |
| Filters | `aggs.*` | preferred | Static lists from mock |

### FAIL (then what)

**Backend error body:**
```json
{
  "ok": false,
  "status": 500,
  "error": {
    "code": "COURSE_LIST_UNAVAILABLE",
    "message": "Course search failed"
  }
}
```

| Case | Frontend does |
|------|----------------|
| Network error / 5xx / timeout | Use full mock list from `telsData` COURSES |
| `200` but `results: []` | Show empty catalog UI (or mock if product prefers filled demo) |
| `200` but missing marketing fields | Keep LMS fields; fill gaps from mock for same course / defaults |
| Filter aggs missing | Use static SUBJECTS / LEVELS / LANGUAGES / TYPES / ORGS from `telsData` |

---

# API 2 — Course detail

### API
```
GET {BASE}/api/courseware/course/{courseId}
```
**TitanEd wrapper:**
```
GET {BASE}/api/tels/v1/courses/{courseId}/
```
`{courseId}` = `course-v1:Org+Number+Run` (or resolve from `slug` if backend supports it).

### PAYLOAD (frontend sends)

**Path / query only (no body):**

| Param | Required | Example |
|-------|----------|---------|
| `courseId` (path) | **yes** | `course-v1:OpenedX+DemoX+DemoCourse` |
| `slug` (query, optional) | no | `open-edx-demo-course` |

Example:
```
GET {BASE}/api/tels/v1/courses/course-v1:OpenedX+DemoX+DemoCourse/
```
or
```
GET {BASE}/api/tels/v1/courses/by-slug/open-edx-demo-course/
```

### SUCCESS (backend returns)

```json
{
  "id": "course-v1:OpenedX+DemoX+DemoCourse",
  "name": "Open edX Demo Course",
  "org": "OpenedX",
  "display_org_with_default": "OpenedX",
  "display_number_with_default": "DemoX",
  "short_description": "Explore Open edX® capabilities in this demo course…",
  "overview": "<section>About This Course …</section>",
  "language": "en",
  "effort": "40",
  "start": "2026-01-01T00:00:00Z",
  "advertised_start": null,
  "end": null,
  "enrollment_start": "2026-01-01T00:00:00Z",
  "enrollment_end": null,
  "pacing": "self",
  "course_price": "Free",
  "can_enroll": true,
  "is_course_full": false,
  "invitation_only": false,
  "allow_anonymous": false,
  "show_courseware_link": false,
  "enrollment": {
    "mode": null,
    "is_active": false
  },
  "ecommerce_checkout": false,
  "ecommerce_checkout_link": null,
  "single_paid_mode": {},
  "media": {
    "course_image": {
      "uri": "/asset-v1:OpenedX+DemoX+DemoCourse+type@asset+block@DemoX-Course-Card.png"
    },
    "course_video": {
      "uri": null
    },
    "image": {
      "raw": "http://local.openedx.io:8000/asset-v1:OpenedX+DemoX+DemoCourse+type@asset+block@DemoX-Course-Card.png",
      "small": "http://local.openedx.io:8000/asset-v1:OpenedX+DemoX+DemoCourse+type@asset+block@DemoX-Course-Card.png",
      "large": "http://local.openedx.io:8000/asset-v1:OpenedX+DemoX+DemoCourse+type@asset+block@DemoX-Course-Card.png"
    }
  },
  "pre_requisite_courses": [],
  "requirements": "There are no pre-requisites…",
  "about_sidebar_html": null,
  "course_about_section_html": null,
  "certificate_data": {
    "cert_status": "none",
    "cert_web_view_url": null,
    "download_url": null,
    "certificate_available_date": null
  },
  "slug": "open-edx-demo-course",
  "subject": "Technology",
  "level": "Introductory",
  "skills": ["Open edX", "Course design", "LMS"],
  "type": "Course",
  "duration": "2 hours",
  "free": true,
  "rating": 4.8,
  "reviews": 1240,
  "start_date_label": "Self-paced",
  "modules": [
    {
      "title": "Dive into the Open edX® platform!",
      "description": "Foundational overview of the platform tools and features."
    }
  ],
  "instructor": {
    "name": "Open edX Staff",
    "title": "Course team",
    "bio": "The Open edX demo course team.",
    "image_url": "https://i.pravatar.cc/320?u=openedx-demo"
  },
  "testimonials": [
    {
      "name": "Alex Rivera",
      "role": "Instructional designer",
      "quote": "This demo helped our team understand what the platform can do."
    }
  ],
  "faq": [
    {
      "question": "Who is this course intended for?",
      "answer": "Course developers, newcomers to online learning, and community members."
    }
  ],
  "suggested_courses": [
    {
      "_id": "course-v1:demo_unv2+4588+2025",
      "data": {
        "id": "course-v1:demo_unv2+4588+2025",
        "content": {
          "display_name": "Lesson 4: Drawing Smart Conclusion",
          "short_description": "Explore Open edX® capabilities…"
        },
        "image_url": "/asset-v1:demo_unv2+4588+2025+type@asset+block@course_image.jpg",
        "org": "demo_unv2",
        "slug": "drawing-smart-conclusion",
        "subject": "Education",
        "level": "Intermediate",
        "free": true,
        "rating": 4.6,
        "reviews": 320
      }
    }
  ]
}
```

**Frontend reads (field → fallback):**

| UI section | JSON path | Required? | Fallback |
|------------|-----------|-----------|----------|
| Title | `name` | **yes** | Mock title |
| Org | `display_org_with_default` or `org` | **yes** | Mock org |
| Short desc | `short_description` | **yes** | Mock shortDesc |
| Overview | `overview` | preferred | Mock longDesc |
| Image | `media.image.large` or `media.course_image.uri` | **yes** | Mock image |
| Duration | `duration` or `effort` | preferred | Mock duration |
| Start label | `start_date_label` / `advertised_start` / `start` | preferred | Mock startDate |
| Free / price | `free` or `course_price` | preferred | Mock free |
| Can enroll | `can_enroll` | **yes** | `true` unless API says false |
| Enrolled | `enrollment.is_active` | preferred | `false` |
| Checkout | `ecommerce_checkout_link` | if paid | Hide paid path |
| Modules | `modules[]` | preferred | Mock modules |
| Instructor | `instructor` | optional | Mock instructor |
| Testimonials | `testimonials[]` | optional | i18n / mock |
| FAQ | `faq[]` | optional | i18n / mock |
| Suggested | `suggested_courses[]` | preferred | Mock related / API 4 |

### FAIL (then what)

**Backend error body:**
```json
{
  "ok": false,
  "status": 404,
  "error": {
    "code": "COURSE_NOT_FOUND",
    "message": "No course matches this id"
  }
}
```

| Case | Frontend does |
|------|----------------|
| 404 / not found | If slug/id matches mock in `telsData` → show mock detail; else redirect `/courses` |
| Network / 5xx | Same as above (mock match or redirect) |
| Partial success (core fields OK, marketing missing) | Merge: API fields + mock for modules / instructor / faq / etc. |
| `can_enroll: false` | Keep page; disable enroll CTA (not a “fail” of the page load) |

---

# API 3 — Enroll now

### API
```
POST {BASE}/change_enrollment
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
```
(Existing LMS — keep this contract.)

### PAYLOAD (frontend sends)

**Form body (not JSON):**
```
course_id=course-v1%3AOpenedX%2BDemoX%2BDemoCourse&enrollment_action=enroll
```

Same as object:
```json
{
  "course_id": "course-v1:OpenedX+DemoX+DemoCourse",
  "enrollment_action": "enroll"
}
```

| Field | Required | Value |
|-------|----------|-------|
| `course_id` | **yes** | From detail `id` |
| `enrollment_action` | **yes** | `"enroll"` |

**Paid path (no enroll POST):** if detail has `ecommerce_checkout: true` and `ecommerce_checkout_link`, frontend navigates to checkout URL instead of calling this API.

### SUCCESS (backend / UI contract)

**Free enroll OK:**
```json
{
  "ok": true,
  "course_id": "course-v1:OpenedX+DemoX+DemoCourse",
  "enrollment_action": "enroll",
  "is_active": true,
  "mode": "audit",
  "redirect": "http://local.openedx.io:8000/dashboard",
  "learning_url": "http://apps.local.openedx.io:2000/learning/course/course-v1:OpenedX+DemoX+DemoCourse/home"
}
```

**Paid checkout (from detail, not this POST):**
```json
{
  "ok": true,
  "course_id": "course-v1:OpenedX+DemoX+DemoCourse",
  "requires_payment": true,
  "checkout_url": "http://ecommerce.local.openedx.io:18130/checkout/example",
  "redirect": null
}
```

| Value | Source | Fallback |
|-------|--------|----------|
| Post-enroll URL | `redirect` or `learning_url` | `{LMS_BASE_URL}/dashboard` |
| Checkout URL | detail `ecommerce_checkout_link` | Error toast — do not fake payment |

### FAIL (then what)

**Not logged in:**
```json
{
  "ok": false,
  "status": 403,
  "error": {
    "code": "LOGIN_REQUIRED",
    "message": "You must sign in to enroll.",
    "login_url": "http://apps.local.openedx.io:1999/authn/login?next=/public/courses/open-edx-demo-course"
  }
}
```
**Frontend:** redirect to `error.login_url` or build from config `LOGIN_URL` + `next`.

**Enrollment not allowed:**
```json
{
  "ok": false,
  "status": 400,
  "error": {
    "code": "ENROLLMENT_FAILED",
    "message": "Enrollment is not available for this course",
    "course_id": "course-v1:OpenedX+DemoX+DemoCourse",
    "reasons": {
      "can_enroll": false,
      "is_course_full": true,
      "invitation_only": false
    }
  }
}
```
**Frontend:** show error toast / message from `error.message`. **Do not** fake enrollment with mock.

| Case | Frontend does |
|------|----------------|
| 403 login | Redirect to login |
| 400 / full / closed | Toast with API message |
| Network / 5xx | Toast “Unable to enroll — try again” |
| Missing `course_id` | Disable enroll button |

---

# API 4 — Suggested courses

### API
```
GET {BASE}/api/tels/v1/courses/{courseId}/suggested/
```
**or** nest `suggested_courses` on API 2 success (same item shape).

### PAYLOAD (frontend sends)

**Query only (no body):**

| Param | Required | Example |
|-------|----------|---------|
| `courseId` (path) | **yes** | `course-v1:OpenedX+DemoX+DemoCourse` |
| `limit` (query) | no | `4` (default) |

Example:
```
GET {BASE}/api/tels/v1/courses/course-v1:OpenedX+DemoX+DemoCourse/suggested/?limit=4
```

### SUCCESS (backend returns)

```json
{
  "ok": true,
  "course_id": "course-v1:OpenedX+DemoX+DemoCourse",
  "total": 2,
  "results": [
    {
      "_id": "course-v1:demo_unv2+4588+2025",
      "data": {
        "id": "course-v1:demo_unv2+4588+2025",
        "content": {
          "display_name": "Lesson 4: Drawing Smart Conclusion",
          "short_description": "Explore Open edX® capabilities…",
          "number": "4588"
        },
        "image_url": "/asset-v1:demo_unv2+4588+2025+type@asset+block@course_image.jpg",
        "org": "demo_unv2",
        "language": "en",
        "modes": ["audit"],
        "effort": "20",
        "slug": "drawing-smart-conclusion",
        "subject": "Education",
        "level": "Intermediate",
        "skills": ["Critical thinking", "Analysis"],
        "type": "Course",
        "duration": "4 weeks",
        "free": true,
        "rating": 4.6,
        "reviews": 320,
        "start_date_label": "Jan 01, 2026"
      }
    }
  ]
}
```

Card fields same as API 1 (`id`, `display_name`, `org`, `image_url`, marketing fields).

### FAIL (then what)

```json
{
  "ok": false,
  "status": 500,
  "error": {
    "code": "SUGGESTED_UNAVAILABLE",
    "message": "Could not load suggested courses"
  }
}
```

| Case | Frontend does |
|------|----------------|
| Fail / 5xx / timeout | Mock related courses (same subject/org from `telsData`) |
| `results: []` | Hide suggested section **or** show mock related |
| Nested on detail missing | Call this API; if that also fails → mock |

---

# API 5 — Home promo video

### API
```
GET {BASE}/api/tels/v1/home/promo/
```

### PAYLOAD (frontend sends)

None (GET, no body). Optional later: `?locale=en`.

### SUCCESS (backend returns)

```json
{
  "ok": true,
  "promo": {
    "id": "home-promo-ai-era",
    "eyebrow": "Product tour",
    "title": "Online learning, reimagined for the AI era.",
    "body": "See how TELS helps institutions launch polished learning experiences on Open edX.",
    "cta_label": "Explore courses",
    "cta_url": "/public/courses",
    "video_url": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "poster_url": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1600&q=75",
    "youtube_id": null,
    "autoplay": false,
    "muted": false
  }
}
```

| Field | Required? | Fallback |
|-------|-----------|----------|
| `promo.title` | **yes** | Home i18n / hardcoded title |
| `promo.video_url` **or** `promo.youtube_id` | **yes** (one) | Current `VIDEO_SRC` mock |
| `promo.poster_url` | preferred | Current `VIDEO_THUMB_IMG` |
| `promo.body` | optional | i18n body |
| `promo.cta_url` | optional | `/public/courses` |

### FAIL (then what)

```json
{
  "ok": false,
  "status": 500,
  "error": {
    "code": "PROMO_UNAVAILABLE",
    "message": "Home promo could not be loaded"
  }
}
```

| Case | Frontend does |
|------|----------------|
| Fail / empty promo | Use current mock promo (VIDEO_SRC / poster / i18n) — **keep section visible** |
| Missing only `video_url` | Keep title/body from API; video from mock |

---

# API 6 — Contact form submit

### API
```
POST {BASE}/api/tels/v1/contact/
Content-Type: application/json
```

### PAYLOAD (frontend sends)

```json
{
  "name": "Ada Lovelace",
  "email": "ada@example.com",
  "org": "Analytical Engines",
  "subject": "Partnership",
  "message": "We want a demo of TELS for our institution.",
  "consent": true,
  "source_page": "/public/contact",
  "locale": "en"
}
```

| Field | Required | Type |
|-------|----------|------|
| `name` | **yes** | string |
| `email` | **yes** | email string |
| `org` | no | string |
| `subject` | **yes** | string |
| `message` | **yes** | string |
| `consent` | **yes** | boolean (`true`) |
| `source_page` | no | string |
| `locale` | no | string |

### SUCCESS (backend returns)

```json
{
  "ok": true,
  "status": 201,
  "id": "contact-req-9f3a2c",
  "created_at": "2026-09-03T09:30:00Z",
  "message": "Thanks — we'll get back to you soon.",
  "data": {
    "name": "Ada Lovelace",
    "email": "ada@example.com",
    "org": "Analytical Engines",
    "subject": "Partnership",
    "message": "We want a demo of TELS for our institution.",
    "consent": true,
    "source_page": "/public/contact",
    "locale": "en"
  }
}
```

**Frontend:** show success UI using `message` (or current i18n success string).

### FAIL (then what)

**Validation error:**
```json
{
  "ok": false,
  "status": 400,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Please fix the highlighted fields.",
    "fields": {
      "name": ["Name is required."],
      "email": ["Enter a valid email."],
      "subject": ["Choose a subject."],
      "message": ["Message is required."],
      "consent": ["Consent is required."]
    }
  }
}
```
**Frontend:** map `error.fields` onto form inputs; keep form open.

**Server / unavailable:**
```json
{
  "ok": false,
  "status": 503,
  "error": {
    "code": "CONTACT_UNAVAILABLE",
    "message": "Unable to submit — try again later."
  }
}
```

| Case | Frontend does |
|------|----------------|
| 400 validation | Show field errors from `error.fields` |
| 5xx / network | Toast / banner: unable to submit — try again |
| API not ready yet (dev) / 404 / network | Error banner: “Unable to submit — try again later.” — **never** show success |
| Never | Do not claim server saved if API failed |

---

# Page → API → payload → fallback

| Page / UI | API | Payload / params | On fail |
|-----------|-----|------------------|---------|
| Home — Popular | #1 POST | `{ page_size: 4, page_index: 0 }` | `telsData` COURSES slice(0,4) |
| Home — Promo | #5 GET | — | Hardcoded VIDEO_SRC / poster / i18n |
| Courses catalog | #1 POST | page_size, page_index, search, filters | Full `telsData` COURSES + static filters |
| Course detail | #2 GET | `courseId` / slug | Matching mock course or `/courses` |
| Suggested | #4 GET | `courseId`, `limit` | Mock related by subject/org |
| Enroll now | #3 POST | `course_id`, `enrollment_action` | Login redirect / toast — **no fake enroll** |
| Contact | #6 POST | name, email, subject, message, consent | Field errors or “try again” toast |

---

# Backend checklist

- [ ] **#1** Course list POST — accept payload above; return success JSON (+ `aggs`)
- [ ] **#2** Course detail GET — return full detail JSON
- [ ] **#3** Enroll POST — LMS `change_enrollment` (403 login + 400 fail shapes)
- [ ] **#4** Suggested GET — or nest on #2
- [ ] **#5** Home promo GET
- [ ] **#6** Contact POST — accept payload; return 201 success + 400 validation fail

---

# Frontend checklist (when coding later)

- [ ] Call each API with correct method + payload
- [ ] On success → map JSON → UI
- [ ] On fail / missing field → mock / toast / redirect per tables above
- [ ] Never blank Popular / Catalog / Detail on API error
- [ ] Never fake successful enrollment

---

# One-line for backend

For each of **#1–#6**: implement **API → PAYLOAD → SUCCESS → FAIL** exactly as written; frontend will call them and fall back to mock when response data is unavailable.
