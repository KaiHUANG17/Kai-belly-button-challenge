# Kai-belly-button-challenge

## Background
- In this assignment, you will build an interactive dashboard to explore the Belly Button Biodiversity dataset Links to an external site., which catalogues the microbes that colonise human navels.
The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

## Instructions
1. Use the D3 library to read in samples.json from the URL https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json.

2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

3. Create a bubble chart that displays each sample.

4. Display the sample metadata, i.e., an individual's demographic information.

5. Display each key-value pair from the metadata JSON object somewhere on the page.

6. Update all the plots when a new sample is selected. Additionally, you are welcome to create any layout that you would like for your dashboard. An example dashboard is shown as follows:

7. Deploy your app to a free static page hosting service, such as GitHub Pages. Submit the links to your deployment and your GitHub repo. Ensure that your repository has regular commits and a thorough README.md file

## References
- '// Define a function called CompareValue that takes two parameters: key and order (defaulting to 'asc')
function CompareValue(key, order = 'asc') {
    // Return a comparison function that takes two elements, a and b
    return function(a, b) {
        // Check if either a or b does not have the specified key
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // If either a or b is missing the key, return 0 indicating equality
            return 0;
        }

        // Convert both elements' values associated with the key to uppercase if they are strings
        let A = (typeof a[key] == 'string') ? a[key].toUpperCase() : a[key];
        let B = (typeof b[key] == 'string') ? b[key].toUpperCase() : b[key];

        // Initialize the comparison variable to 0
        let comparison = 0;
        // Compare A and B
        if (A > B) {
            comparison = 1;
        } else if (A < B) {
            comparison = -1;
        }

        // Return the comparison result, multiplied by -1 if the order is 'desc'
        return (order == 'desc') ? (comparison * -1) : comparison;
    };
}'
- chatGpt 'https://chat.openai.com/c/a0969e89-6fd5-49b0-8636-44bbab2094ce'


