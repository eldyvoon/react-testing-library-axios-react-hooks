import React from "react";
import { render, waitForElement } from "@testing-library/react";
import "jest-dom/extend-expect";
import axios from "axios";
import Users, { url } from "./Users";

afterEach(() => {
  axios.get.mockClear();
});

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
  expect(axios.get).toHaveBeenCalledTimes(1);
  expect(axios.get).toHaveBeenCalledWith(url);
});
