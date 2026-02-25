# blog-feed-cache

Blogger based websites, by default, return label searches in a paginated manner that makes it laborious to page through items in order to find a specific post. A better approach to return a list of all posts, or a list of specific labelled posts is to use a script to return the summary feed and use this. Unfortunately, blogger limits the total entries to 150 and even with this, not all 150 are returned. Thereefore a recursive routine to set the start-index parameter is required in order to get everything. This naturally takes time to return the data.

To speed things up, if the feed data is returned and stored, this can then be used as a cache, and the blogger script then just needs to return the cached data, mmaking search pages more responsive.

The fetch-posts.js script does just that. This will generate data.json to act as a cached source for the blogger site.


