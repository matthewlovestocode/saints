import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProseBlockContent } from "./ProseBlockContent";

describe("ProseBlockContent", () => {
  it("renders plain prose blocks", () => {
    render(<ProseBlockContent block="The desert became a city." />);

    expect(screen.getByText("The desert became a city.")).toBeInTheDocument();
  });

  it("renders linked prose parts", () => {
    const { container } = render(
      <p>
        <ProseBlockContent
          block={[
            "Read beside ",
            {
              href: "/saints/macarius-the-great",
              text: "Macarius",
            },
            ", Anthony helps set the larger frame.",
          ]}
        />
      </p>,
    );

    expect(container.querySelector("p")).toHaveTextContent(
      "Read beside Macarius, Anthony helps set the larger frame.",
    );
    expect(screen.getByRole("link", { name: "Macarius" })).toHaveAttribute(
      "href",
      "/saints/macarius-the-great",
    );
  });
});
