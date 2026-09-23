CHRISTIAN AUTHOR / ARTICLE WEBSITE DEMO

Pages included:
- index.html         Home / author-led landing
- articles.html      Searchable article archive
- categories.html    Dynamic category index
- category.html      Category archive
- article.html       Comfortable long-form reading page
- about.html         Author biography page
- admin.html         CMS interface demo

IMPORTANT ABOUT THE ADMIN DEMO
The current preview uses browser localStorage so you can immediately test adding, editing and deleting articles without setting up a server.
It is NOT the final production backend because localStorage only exists in that browser/device.

Recommended production setup:
- Frontend: Cloudflare Pages
- Backend API: Cloudflare Worker
- Database: Cloudflare D1
- Images: Cloudflare R2 or Images
- Admin protection: Cloudflare Access / secure authentication

The same UI can then publish content across devices and for the public website.
