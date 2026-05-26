# Recovery Meetings Aggregator — Trenton, MI (48183)

Single-file React app that aggregates recovery meetings near Trenton, Michigan into one unified view.

## Open it

No build step. Just open `index.html` in a browser, or serve the folder:

```bash
cd recovery-meetings
python3 -m http.server 8080
# then visit http://localhost:8080
```

It runs as a static page using React 18 + Tailwind via CDN, with Babel
Standalone compiling JSX in the browser.

## Data sources

| Source | Method |
| --- | --- |
| Meeting Guide / Southeast Michigan AA | Client-side fetch of `https://aaferndale.org/meetings/?tsml-output=json` with CORS-proxy fallbacks (`corsproxy.io`, `allorigins.win`) |
| SMART Recovery | Deep-link card to `meetings.smartrecovery.org` filtered by ZIP 48183 |
| NA | Deep-link card to `na.org/meetingsearch` |
| Passenger Compass | Deep-link card to `passengerrecovery.com/compass` |
| Newform | Deep-link card to `newform.org` |

If the AA feed cannot be reached, the UI degrades gracefully and shows the
external platform cards plus a banner — it never breaks.

## Features

- Default view: today's meetings, sorted by start time
- Day tabs Sun–Sat with a dot on today; arrow keys to navigate
- Distance filter: 5 / 10 / 20 / Any miles from Trenton (42.1211, -83.2103)
- Program filter: All / AA / NA / SMART
- Live search by name, neighborhood, address, or type
- Per-card: program badge, time, address, type chips, distance
- Get directions opens Apple Maps on Apple devices, Google Maps elsewhere
- Copy address button
- Online meetings get a Join button when a conference URL exists
- Persistent "in next 3h" badge in the header with pulsing dot when > 0
- Mobile-first dark theme, color-coded (AA = blue, NA = green, SMART = orange)

## Notes on CORS

The AA Ferndale TSML feed is usually CORS-friendly; if a browser blocks
the request the app retries through public CORS reflectors as a best
effort. None of this requires a server you have to run.

Apple/Google Maps deep links use coordinates when present and fall back
to the formatted address.
