# BLOG_AGENT.md — Mike's Services LLC
# Permanent file — never delete this from the project folder.
# Last updated: 2026-06-18

---

## WHAT THIS FILE IS

This file gives Claude Code everything it needs to add a new blog post card
to blog.html with nothing more than a Blogger URL.

---

## HOW TO USE

Open Claude Code in the Mike's Services LLC project folder and type:

  Add blog post: [paste Blogger URL here]

That's it. Claude Code does the rest.

---

## WHAT CLAUDE CODE DOES AUTOMATICALLY

When you receive an "Add blog post:" command:

1. Fetch the URL provided. Extract:
   - Page <title> — clean it (remove " — Mike's Services LLC" suffix if present)
   - meta og:description — use as the card excerpt (trim to 2 sentences max)
   - meta og:image — use as the thumbnail URL
   - First <img> alt text inside the post body — use as the card image alt text
   - Publication date from the post (format: Month DD, YYYY)

2. Open blog.html. Find the #blog-list section.

3. Replace the FIRST .blog-card--placeholder card (lowest numbered one)
   with a new live blog card using this exact HTML structure:

   <article class="service-card blog-card">
     <img
       src="images/blog-placeholder.webp"
       data-thumbnail="[og:image URL]"
       alt="[alt text from post]"
       width="600" height="400"
       loading="lazy">
     <div class="card-body">
       <p class="blog-date">[publication date]</p>
       <h3>[cleaned title]</h3>
       <p>[excerpt — 2 sentences max, plain conversational tone]</p>
       <a href="[post URL]" class="btn btn-outline" target="_blank" rel="noopener">Read More &rarr;</a>
     </div>
   </article>

4. If all 8 card slots are already live (no placeholders left):
   Add the new card as card #9 at the end of the grid. Do not remove any cards.

5. Check which service page the post relates to based on the post content:
   - Septic content → add blog-callout link to septic.html
   - Land clearing content → land-clearing.html
   - Excavation / trenching content → excavation.html
   - Demolition / storm damage content → demolition.html
   - Building pad / site prep content → building-pad.html
   - General / multiple services → skip service page update

   Add this line to the matching service page, before the CTA banner section,
   if a blog-callout for this post does not already exist there:

   <p class="blog-callout">&#128196; <strong>From the Blog:</strong>
     <a href="[post URL]" target="_blank" rel="noopener">[post title]</a>
     &mdash; read the full guide.</p>

6. Commit and push with message:
   Add blog post: [cleaned post title]

---

## RULES — READ BEFORE EVERY RUN

- Never change any existing card, copy, heading, or layout
- Never remove placeholder cards that haven't been replaced yet
- Never modify styles.css or main.js
- Never change the nav, header, or footer
- Use HTML entities — never raw special characters in HTML files:
    Em dash:    &mdash;
    Ampersand:  &amp;
    Arrow:      &rarr;
    Doc icon:   &#128196;
- All blog card images must have width="600" height="400" and loading="lazy"
- All blog card images must use src="images/blog-placeholder.webp" as the default
  and the real thumbnail in data-thumbnail (the JS loader swaps it at runtime)
- target="_blank" rel="noopener" on all blog card links (opens Blogger in new tab)

---

## CURRENT BLOG CARD COUNT

Update this manually after each push so you always know where you stand.
NOTE: Slots reset to PLACEHOLDER here for template use — verify actual state against blog.html.

  Slot 1: PLACEHOLDER
  Slot 2: PLACEHOLDER
  Slot 3: PLACEHOLDER
  Slot 4: PLACEHOLDER
  Slot 5: PLACEHOLDER
  Slot 6: PLACEHOLDER
  Slot 7: PLACEHOLDER
  Slot 8: PLACEHOLDER

---

## SITE STRUCTURE REFERENCE

Blog page:     blog.html
Blog section:  #blog-list > .service-grid.blog-grid
Card class:    .service-card.blog-card
Placeholder:   .service-card.blog-card.blog-card--placeholder
Service pages: septic.html, land-clearing.html, excavation.html,
               demolition.html, building-pad.html, service-area.html
Callout class: .blog-callout (styled in styles.css)
JS loader:     data-thumbnail attribute on every blog card img tag
Placeholder img: images/blog-placeholder.webp

---

## EXAMPLE COMMANDS

Add a new post (slots available):
  Add blog post: https://mikeservicesllc.blogspot.com/2026/07/building-pad-prep-kansas.html

Add a post when all 8 slots are full:
  Add blog post: https://mikeservicesllc.blogspot.com/2026/07/your-post.html
  (Claude Code adds it as card 9 automatically)

Check how many slots are available:
  How many blog card slots are open in blog.html?
