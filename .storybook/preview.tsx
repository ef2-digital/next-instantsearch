import React from "react";
import type { Preview } from "@storybook/react";
import { NextUIProvider } from "@nextui-org/react";
import "../src/index.css";
import { InstantSearch } from "react-instantsearch";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => {
      const { searchClient } = instantMeiliSearch("http://localhost:7700", "");

      return (
        <NextUIProvider>
          <InstantSearch
            searchClient={searchClient}
            indexName="kika"
            future={{ preserveSharedStateOnUnmount: true }}
          >
            <Story />
          </InstantSearch>
        </NextUIProvider>
      );
    },
  ],
};

export default preview;
