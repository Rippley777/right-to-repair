# Right to Repair

An independent Apple device explorer focused on repairability. Search by model, year, A-number, or model identifier; filter by repairability and upgrade options; identify exact configurations; save devices; compare up to three models side by side; and plan repairs.

## Run locally

Requires Node.js 20 or newer.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. Use your existing backend URL in `.env.local` before starting Vite. The local API configuration is ignored by Git.

```sh
npm test        # Catalog loading, search, filters, and model matching
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

## Model finder

Open `/identify` or choose **Model finder** in the navigation. Paste relevant lines from About This Mac or System Information, or enter an Apple part number, A-number, or model identifier. Optional year, processor, memory, storage, and display fields narrow the results. Each result explains which details matched and which remain unconfirmed.

An exact part number identifies a catalog configuration. A-numbers and system identifiers can cover several configurations, so the finder preserves all matching records. Official Apple MacBook Pro and Air model groups connect system identifiers to catalog part numbers where that mapping is available (`appleModelGroups.ts`, checked September 28, 2026). Unrecognized identifiers do not fall back to unrelated devices. Regional part-number variants are labelled separately. The API's memory sizes describe supported options, not installed memory.

Pasted details stay in component state in the browser; they are never sent to the API, written to browser storage, or included in the URL. Serial numbers and other personal identifier lines are excluded from matching. The finder uses the same live catalog as the explorer.

## Repair planner

Choose **Repair planner** in the navigation or **Plan a repair** on a device page. The device-page link preselects that exact API configuration. Search the catalog or use the model finder if you need to identify a device first.

Create a battery, display, keyboard, storage, memory, or diagnosis plan. Self-repair and repair-service plans use different preparation checklists. Add or remove tasks, mark progress, collect parts and tools, enter costs and an optional budget, and save your selected guide and notes. Catalog repair difficulty, availability, and estimates appear where provided; estimates do not populate your costs. Soldered and undocumented upgrade options remain explicit. Prices are entered by the user, unpriced items are excluded from totals, and changing currency does not convert amounts.

Multiple plans save under `right-to-repair:plans:v1` in local browser storage, including a snapshot of the device configuration. Saved plans remain usable if the API is unavailable. These are browser-local plans, so a plan URL will only open its record in the browser where it is saved. Download a text copy or print the full checklist, item list, and notes. If storage is unavailable, the planner reports it and keeps changes for the current visit. Deletion requires a confirmation within the page.

The checklist tracks preparation and progress; linked model-specific repair manuals supply the technical instructions.

## Structure

- `src/features/explorer/` — catalog, API adapter, device art, explorer, detail, comparison, and information screens.
- `src/App.css` and `src/index.css` — responsive design and global styles.
- `tests/` — tests of catalog filters, live API loading, pagination, configuration identity, repair-plan persistence and budgets, and errors using the existing TypeScript compiler.

The redesigned application does not require the optional `ui` submodule. Existing `/devices` and `/tables` links open the explorer; `/charts` opens the comparison screen. Older page and store modules remain available for reference but are not loaded by the new app.

## Contributions

Please describe the problem, the change, and how you checked it in your pull request. For device-data changes, include a primary source for the score and repair details. Run the tests, lint, and production build before submitting.

## License

[MIT NON-AI License](LICENSE.md). This custom, source-available license permits use, modification, and redistribution subject to its terms, but **prohibits all AI/ML use of the code**, including training, inference, AI integrations, and supplying the code to AI coding tools, unless separately authorized in writing by the applicable copyright holder(s). It is not the standard MIT License or an OSI-approved open-source license.

Third-party components and assets retain their own licenses. Previously granted licenses are not retroactively revoked. See the license file for the full terms.
