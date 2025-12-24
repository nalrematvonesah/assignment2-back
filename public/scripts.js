const content = document.getElementById("content");
const button = document.getElementById("loadUser");

button.addEventListener("click", loadUser);

async function loadUser() {
  button.textContent = "Loading...";
  button.disabled = true;

  content.innerHTML = `
    <p style="opacity:0.7; text-align:center;">
      Fetching global data 🌍
    </p>
  `;

  try {
    const res = await fetch("/api/user");
    if (!res.ok) throw new Error("Server error");

    const data = await res.json();

    content.innerHTML = "";
    content.append(
      renderUser(data.user),
      renderCountry(data.country),
      renderExchange(data.country.currency, data.exchange),
      renderNews(data.news)
    );
  } catch (err) {
    console.error(err);
    content.innerHTML = `
      <p style="color:#f87171; text-align:center;">
        Failed to load data. Please try again.
      </p>
    `;
  } finally {
    button.textContent = "Get Random User";
    button.disabled = false;
  }
}

/* =======================
   RENDER FUNCTIONS
======================= */

function renderUser(user) {
  return createCard(
    "👤 User Profile",
    `
      <img src="${user.picture}" alt="User profile picture">
      <p><strong>Name:</strong> ${user.firstName} ${user.lastName}</p>
      <p><strong>Gender:</strong> ${capitalize(user.gender)}</p>
      <p><strong>Age:</strong> ${user.age}</p>
      <p><strong>Date of Birth:</strong> ${user.dob}</p>
      <p><strong>Address:</strong> ${user.address}, ${user.city}</p>
    `
  );
}

function renderCountry(country) {
  return createCard(
    "🌍 Country Information",
    `
      <img src="${country.flag}" alt="Country flag">
      <p><strong>Country:</strong> ${country.name}</p>
      <p><strong>Capital:</strong> ${country.capital || "N/A"}</p>
      <p><strong>Languages:</strong> ${
        country.languages?.length
          ? country.languages.join(", ")
          : "N/A"
      }</p>
      <p><strong>Currency:</strong> ${country.currency}</p>
    `
  );
}

function renderExchange(currency, rates) {
  return createCard(
    "💱 Exchange Rates",
    `
      <p>1 ${currency} = <strong>${rates.USD}</strong> USD</p>
      <p>1 ${currency} = <strong>${rates.KZT}</strong> KZT</p>
    `
  );
}

function renderNews(newsList) {
  if (!newsList || !newsList.length) {
    return createCard(
      "📰 News",
      "<p>No news available for this country.</p>"
    );
  }

  const items = newsList
    .map(
      article => `
        <div class="news-item">
          <h4>${article.title}</h4>
          ${
            article.image
              ? `<img src="${article.image}" alt="News image">`
              : ""
          }
          <p>${article.description || "No description available."}</p>
          <a href="${article.url}" target="_blank" rel="noopener noreferrer">
            Read full article →
          </a>
        </div>
      `
    )
    .join("");

  return createCard("📰 Top Headlines", items);
}

/* =======================
   HELPERS
======================= */

function createCard(title, body) {
  const card = document.createElement("section");
  card.className = "card";
  card.innerHTML = `
    <h2>${title}</h2>
    ${body}
  `;
  return card;
}

function capitalize(text) {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}
