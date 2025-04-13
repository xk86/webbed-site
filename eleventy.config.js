import "tsx/esm";
import pluginWebc from "@11ty/eleventy-plugin-webc";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import {renderToStaticMarkup} from 'react-dom/server';
import {register} from 'node:module';

register('@mdx-js/node-loader', import.meta.url);

// Thus unused
const colors = {
  "green" : "#00ff00",
  "red" : "ff0000",
  "pink" : "ff00ff",
  "blue" : "0000ff",
}

export default function (eleventyConfig) {
  // Pass thru our pub dir (has to be done before input dir)
  eleventyConfig.addPassthroughCopy("pub");
  eleventyConfig.setInputDirectory("site");
  eleventyConfig.setLayoutsDirectory("includes/layouts");


  // For drafts, which I don't have yet, but I want to add a blog
  eleventyConfig.addPreprocessor("drafts", "*", (data, content) => {
    if(data.draft && process.env.ELEVENTY_RUN_MODE === "build") {
      return false;
    }
  });

  eleventyConfig.addWatchTarget("./pub/");

  /* Plugins Config */
  // WebC
  eleventyConfig.addPlugin(pluginWebc, {
    components: "site/includes/layouts/components/*.webc"
  })

  // Adds syntax highlighting
  eleventyConfig.addPlugin(syntaxHighlight, {
    preAttributes: { tabindex: 0 }
  });

  //CSS Bundler for {% css %} paired shortcode
  eleventyConfig.addBundle("css", {
    toFileDirectory: "dist",
  });

  /* Extensions Config */

  // Add template extensions
  eleventyConfig.addExtension(["mdx","11ty.jsx","11ty.ts","11ty.tsx"], {
    key: "11ty.js",
    compile: () => {
      return async function(data) {
        let content = await this.defaultRenderer(data);
        return renderToStaticMarkup(content);
      };
    }
  });
};