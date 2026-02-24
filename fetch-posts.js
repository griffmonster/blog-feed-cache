const fs = require('fs');

async function fetchAllEntries() {
            let allEntries = [];
            let currentIndex = 1; 
            let keepFetching = true;
            const blogUrl = "https://griffmonster-walks.blogspot.com";

            while (keepFetching) {
                try {
                    const response = await fetch(`${blogUrl}/feeds/posts/summary?alt=json&start-index=${currentIndex}&max-results=150`);
                    const data = await response.json();
                    const entries = data.feed.entry;

                    if (entries && entries.length > 0) {
						
						// STRIPPING LOGIC: Only map the fields we actually need
						const simplifiedEntries = entries.map(entry => {
						  return {
							title: entry.title.$t,
							url: entry.link.find(l => l.rel === 'alternate').href,
							published: entry.published.$t,
							updated: entry.updated.$t,
							labels: entry.category ? entry.category.map(cat => cat.term) : [],
							// Optional: Grab the first image if it exists
							thumb: entry.media$thumbnail ? entry.media$thumbnail.url : null,
							// Grab a small snippet for the search preview
							snippet: entry.summary.$t.substring(0, 180).replace(/<[^>]*>/g, '') 
						  };
						});

						allEntries = allEntries.concat(simplifiedEntries);
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
