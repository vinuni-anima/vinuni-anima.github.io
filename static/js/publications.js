const list = document.querySelector("#publication-list");
const status = document.querySelector("#publications-status");

function createPaper(paper) {
  const item = document.createElement("li");

  const title = document.createElement("h4");
  title.textContent = paper.title;

  const authors = document.createElement("p");
  authors.textContent = paper.authors;
  item.append(title, authors);

  if (paper.venue) {
    const venue = document.createElement("p");
    venue.textContent = paper.venue;
    item.append(venue);
  }

  if (paper.paperUrl) {
    const link = document.createElement("a");
    link.href = paper.paperUrl;
    link.textContent = "Paper";
    item.append(link);
  } else {
    const placeholder = document.createElement("span");
    placeholder.className = "has-text-grey";
    placeholder.textContent = "Link forthcoming";
    item.append(placeholder);
  }

  return item;
}

try {
  const response = await fetch("./data/publications.json");
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const papers = await response.json();
  const years = [...new Set(papers.map(paper => paper.year))].sort((a, b) => b - a);

  for (const year of years) {
    const heading = document.createElement("h3");
    heading.textContent = year;
    list.append(heading);

    const yearPapers = papers.filter(paper => paper.year === year);
    for (const group of new Set(yearPapers.map(paper => paper.status))) {
      const section = document.createElement("section");
      const label = document.createElement("h4");
      label.textContent = group;
      const entries = document.createElement("ul");
      entries.className = "publication-entries";
      entries.setAttribute("role", "list");
      entries.append(...yearPapers.filter(paper => paper.status === group).map(createPaper));
      section.append(label, entries);
      list.append(section);
    }
  }

  status.textContent = papers.length ? "" : "Publications will be added here.";
} catch (error) {
  status.textContent = "Publications could not be loaded.";
  console.error(error);
}
