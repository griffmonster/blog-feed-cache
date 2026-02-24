const fs = require('fs');

async function fetchAllEntries() {
            let allEntries = [];
            let currentIndex = 1; 
            let keepFetching = true;
            const blogUrl = "https://griffmonster-walks.blogspot.com";

            while (keepFetching) {
                try {
                    const response = await fetch(`${blogUrl}/feeds/posts/default?alt=json&start-index=${currentIndex}&max-results=150`);
                    const data = await response.json();
                    const entries = data.feed.entry;

                    if (entries && entries.length > 0) {
                        allEntries = allEntries.concat(entries);
                        currentIndex += entries.length;                       
                    } else {
                        keepFetching = false;
                    }
                } catch (e) {
                    keepFetching = false;
                }
            }
            // Save the result to a file
		  fs.writeFileSync('data.json', JSON.stringify(allEntries));
		  console.log(`Success! Saved ${allEntries.length} posts.`);
        }

fetchAllEntries();
