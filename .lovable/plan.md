## Plan: restore original logo and remove its black background properly

### What you'll get
Your **original** Neurora logo (the exact gold "N" file you provided) back in the project, with just the black background made transparent — nothing redrawn, nothing regenerated.

### Steps

1. **Restore the original `neurora-logo.jpg`** from git history (commit `8aacf7c`) into `src/assets/neurora-logo.jpg`. This is the exact bytes of your original file — no AI involved.
2. **Remove the black background** using `imagegen--edit_image` on that restored JPG with `transparent_background: true`. The pipeline keeps your logo and strips the black, saving as `src/assets/neurora-logo-transparent.png`.
3. **Upload the transparent PNG as a Lovable asset** → overwrite `src/assets/neurora-logo.png.asset.json` with the new pointer. (Old transparent asset gets deleted from CDN.)
4. **Keep `Logo.tsx`, `Hero.tsx`, and `BrandShowcase.tsx` as they are** — they already import the `.asset.json`, so swapping the pointer is enough. Hero stays at the larger 104/140 sizing.
5. **Clean up**: delete the temp restored JPG once the transparent asset is in place (nothing references the JPG in code).

### QA
- Compare the new transparent PNG side-by-side with your original logo to confirm it's the same artwork, just without the black.
- Check the hero: gold N floats on the video, no halo, no redraw.
- Check `BrandShowcase` on the navy plate — still looks correct.

### Out of scope
Footer, headline, video, layout, hero sizing.

### Fallback
If `imagegen--edit_image` alters the artwork at all (it sometimes "improves" logos), I'll stop and tell you — we can then try a deterministic pixel-based approach instead (color-key the black to alpha with no AI in the loop).
