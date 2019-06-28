//try to split test into mutiple section but toHaveBeenCalledTimes is called twice

import React from "react";
import { render, waitForElement } from "@testing-library/react";
import "jest-dom/extend-expect";
import axios from "axios";
import Users, { url } from "./Users";

function mockCall() {
  axios.get.mockResolvedValueOnce({
    data: {
      results: [
        {
          name: {
            first: "ali"
          }
        },
        {
          name: {
            first: "abu"
          }
        }
      ]
    }
  });
}

test('show loader when it"s fetching data', () => {
  mockCall();

  const { getByText } = render(<Users />);
  expect(getByText(/loading.../i)).toBeInTheDocument();
});

test("render users' name on rows", async () => {
  mockCall();

  const { getAllByTestId } = render(<Users />);

  //check what's rendered in the row
  const rowValues = await waitForElement(() =>
    getAllByTestId("row").map(row => row.textContent)
  );
  expect(rowValues).toEqual(["ali", "abu"]);

  //called twice, why?
  expect(axios.get).toHaveBeenCalledTimes(1);
  expect(axios.get).toHaveBeenCalledWith(url);
});
