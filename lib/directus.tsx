import { createDirectus, rest } from "@directus/sdk";

const directus = createDirectus(process.env.DIRECTUS_URL as string).with(rest());

export default directus;