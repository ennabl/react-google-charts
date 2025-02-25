import React from "react";
import { render, cleanup, waitFor } from "@testing-library/react";
import { Chart } from "../src";

describe("<Chart />", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render loader", async () => {
    const { getByText } = render(
      <Chart chartType="AreaChart" loader={<div>Loading Chart</div>} />
    );

    expect(getByText("Loading Chart")).toBeVisible();
  });

  it("should draw chart", async () => {
    const { getByTestId } = render(
      <Chart
        chartType="AreaChart"
        data={[
          ["Year", "Sales", "Expenses"],
          ["2015", 660, 1120],
          ["2016", 1030, 540],
        ]}
        rootProps={{ "data-testid": "1" }}
      />
    );

    await waitFor(() => getByTestId("1"), {
      timeout: 5000,
    });

    const root = getByTestId("1");

    expect(root).toBeVisible();
    expect(root.querySelector("svg")).toBeVisible();
  });

  it("should set size from props", async () => {
    const { getByTestId } = render(
      <Chart
        width="456px"
        height="345px"
        chartType="AreaChart"
        rootProps={{ "data-testid": "1" }}
      />
    );

    await waitFor(() => getByTestId("1"), {
      timeout: 5000,
    });

    const root = getByTestId("1");

    expect(root.style.width).toBe("456px");
    expect(root.style.height).toBe("345px");

    const container = root.parentElement;

    expect(container.style.width).toBe("456px");
    expect(container.style.height).toBe("345px");
  });
});
