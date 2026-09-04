import { redirect } from "next/navigation";

/**
 * About Us page is currently inactive / disabled.
 * When requested to bring back the About Us page,
 * restore the component from `_page.backup.tsx`.
 */
export default function AboutPage() {
  redirect("/");
}
