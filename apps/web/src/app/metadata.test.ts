import { describe, expect, it } from "vitest";
import {
  homeMetadata,
  saintMetadata,
  saintSectionMetadata,
  SITE_TITLE,
} from "./metadata";

const saint = {
  name: "Moses the Black",
  summary: "A desert father remembered for repentance and humility.",
};

describe("page metadata helpers", () => {
  it("keeps the home page title as the absolute site title", () => {
    expect(homeMetadata().title).toEqual({ absolute: SITE_TITLE });
  });

  it("uses the saint name for saint detail pages", () => {
    expect(saintMetadata(saint)).toMatchObject({
      title: "Moses the Black",
      description: saint.summary,
    });
  });

  it("includes both saint name and section name for saint subpages", () => {
    expect(saintSectionMetadata(saint, "Life")).toMatchObject({
      title: "Moses the Black: Life",
      description: `Life for Moses the Black. ${saint.summary}`,
    });
  });
});
