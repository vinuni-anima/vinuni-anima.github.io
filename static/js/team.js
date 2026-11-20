const groups = document.querySelector("#team-groups");
const status = document.querySelector("#team-status");
const groupOrder = ["Principal Investigators", "Researchers", "Collaborators"];

function createMemberCard(member) {
  const card = document.createElement("li");
  card.className = "team-member";

  const avatar = document.createElement("div");
  avatar.className = "team-avatar";
  avatar.setAttribute("aria-hidden", "true");
  avatar.textContent = member.name.split(/\s+/).map(word => word[0]).slice(0, 2).join("").toUpperCase();

  if (member.photo) {
    const image = document.createElement("img");
    image.alt = "";
    image.loading = "lazy";
    image.addEventListener("error", () => image.remove());
    image.src = member.photo;
    avatar.append(image);
  }

  const name = document.createElement("h3");
  if (member.profileUrl && /^https?:\/\//i.test(member.profileUrl)) {
    const link = document.createElement("a");
    link.href = member.profileUrl;
    link.textContent = member.name;
    name.append(link);
  } else {
    name.textContent = member.name;
  }

  const title = document.createElement("p");
  title.textContent = member.titleAffiliation;
  card.append(avatar, name, title);
  return card;
}

try {
  const response = await fetch("./data/team.json");
  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const members = await response.json();
  const groupNames = new Set([...groupOrder, ...members.map(member => member.group)]);
  for (const group of groupNames) {
    const roster = members.filter(member => member.group === group);
    if (!roster.length) continue;

    const section = document.createElement("section");
    section.className = "team-group";
    const heading = document.createElement("h2");
    heading.textContent = group;
    const list = document.createElement("ul");
    list.className = "team-grid";
    list.setAttribute("role", "list");
    list.append(...roster.map(createMemberCard));
    section.append(heading, list);
    groups.append(section);
  }
  status.textContent = members.length ? "" : "Team profiles will be added here.";
} catch (error) {
  status.textContent = "Team information could not be loaded.";
  console.error(error);
}
