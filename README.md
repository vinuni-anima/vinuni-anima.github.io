# ANIMA Research Group

ANIMA (Adaptive Neuro-Inspired Models for Autonomy) is a research group at CAIR, VinUniversity. This repository contains the static source for https://vinuni-anima.github.io/.

## Local development

Run this command from the repository root and open http://127.0.0.1:8000/.

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Edit `index.html` to update the project overview, research directions, and publications. Edit `data/team.json` for team profiles, save portraits under `static/images/team/`, and edit `team.html` for the page layout and `opportunities.html` for openings. Edit `static/css/index.css` for site-specific styles. Bulma is bundled locally. There are no build steps.

## Website license

Adapted from the [Nerfies website template](https://github.com/nerfies/nerfies.github.io) under the [Creative Commons Attribution-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-sa/4.0/).
