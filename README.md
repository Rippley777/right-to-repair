# Right to Repair

An independent Apple device explorer focused on repairability. Search by model, year, A-number, or model identifier; filter by repairability and upgrade options; save devices; and compare up to three models side by side.

## Run locally

Requires Node.js 20 or newer.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. Use your existing backend URL in `.env.local` before starting Vite. The local API configuration is ignored by Git.

```sh
npm test        # Search, filtering, sorting, and reference-data checks
npm run lint   # ESLint
npm run build  # TypeScript and production build
```

## Device data

The explorer loads the full device catalog from your existing API. It preserves separate configurations with the same model identifier by using the API document ID. A small reference dataset is retained only for repair-resource links and development tests; it is never substituted for your catalog. iFixit revises scores and scoring methods; consult the source before comparing different generations. The browse labels (0–3, 4–6, 7–10) are this app’s groupings.

Device illustrations are local SVG components. They represent the device family, not exact part layouts or repair instructions. No external image or font service is needed.

To use the existing device API, add a `.env.local` file and restart Vite:

```dotenv
VITE_API_URL=https://your-device-api.example.com
```

The explorer requests `/api/devices/search?page=1&pageSize=100` and fetches every page using the response’s `pages` count (or derives it from `total` and the returned page size). Responses must contain a `devices` array using the `Device` shape in `src/types/index.ts`. The server must allow requests from your frontend origin. Scores are supplied by the API without replacing them with reference values. Missing scores and hardware details remain explicitly unknown. Failed, invalid, incomplete, or timed-out responses show a connection error and a retry button. They never replace the API catalog with demo devices. A valid empty response stays empty. Each request has its own timeout, so loading several pages does not share a short deadline.

Bookmarks and comparison selections are stored locally in the current browser. Filters and sorting live in the URL. Device pages support direct links using document IDs, original identifiers, or model numbers; comparisons can also be shared with `/compare?ids=DOCUMENT_ID_1%7CDOCUMENT_ID_2`.

Vite reads `VITE_API_URL` at build time. The Azure workflow supplies the existing repository secret to the build step as well as the deployment step.

## Structure

- `src/features/explorer/` — catalog, API adapter, device art, explorer, detail, comparison, and information screens.
- `src/App.css` and `src/index.css` — responsive design and global styles.
- `tests/` — tests of catalog filters, live API loading, pagination, configuration identity, and errors using the existing TypeScript compiler.

The redesigned application does not require the optional `ui` submodule. Existing `/devices` and `/tables` links open the explorer; `/charts` opens the comparison screen. Older page and store modules remain available for reference but are not loaded by the new app.

## Contributions

Please describe the problem, the change, and how you checked it in your pull request. For device-data changes, include a primary source for the score and repair details. Run the tests, lint, and production build before submitting.
