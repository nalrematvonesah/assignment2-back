# Assignment 2 — API Integration Project (Node.js)

## 📌 Objective
The objective of this assignment is to demonstrate server-side integration of multiple external APIs using Node.js.  
The application retrieves, processes, and displays meaningful data to users while following clean code practices, proper project structure, and secure handling of API keys.

All external APIs are accessed **only on the server side**, and the frontend receives only cleaned and structured data.

---

## 🛠 Technologies Used
- **Node.js**
- **Express.js**
- **Axios**
- **dotenv**
- **HTML5**
- **CSS3**
- **Vanilla JavaScript**

---

## 📁 Project Structure

```

assignment-2-api/
│
├── server.js              # Express server (port 3000)
├── core.js                # All business logic and API integrations
├── .env                   # Environment variables (API keys)
├── package.json
├── README.md
│
└── public/
├── index.html         # Frontend markup (no logic)
├── style.css          # Styling and UI
└── script.js          # Frontend rendering logic only

````

> ❗ **Important:**  
> All application logic and API calls are implemented in `core.js`, not in HTML files, as required.

---

## 🔐 Environment Variables

Create a `.env` file in the project root:

```env
NEWS_API_KEY=your_news_api_key
EXCHANGE_API_KEY=your_exchange_api_key
````

API keys are never exposed to the frontend.

---

## 🚀 Installation & Run

1. Install dependencies:

```bash
npm install
```

2. Start the server:

```bash
node server.js
```

3. Open in browser:

```
http://localhost:3000
```

---

## 🌐 Application Flow Overview

1. User clicks **“Get Random User”** on the frontend
2. Frontend sends request to `/api/user`
3. Backend fetches data from multiple APIs
4. Backend cleans and aggregates the data
5. Frontend displays structured information using cards

---

## 🔄 Backend API Endpoint

### `GET /api/user`

Returns a single JSON object containing:

* Random user data
* Country information
* Exchange rates
* News headlines

The frontend never communicates directly with external APIs.

---

## 🧠 API Integrations

### 1️⃣ Random User Generator API

**Endpoint:**

```
https://randomuser.me/api/
```

**Extracted Data:**

* First name
* Last name
* Gender
* Age
* Date of birth
* City
* Country
* Full address (street name and number)
* Profile picture

Data is formatted and cleaned on the server before sending to the frontend.

---

### 2️⃣ REST Countries API

**Endpoint:**

```
https://restcountries.com/v3.1/name/{country}
```

**Extracted Data:**

* Country name
* Capital city
* Official language(s)
* Currency code
* National flag

The server handles missing data gracefully and sends only relevant fields.

---

### 3️⃣ Exchange Rate API

**Endpoint:**

```
https://v6.exchangerate-api.com/v6/{API_KEY}/latest/{currency}
```

**Displayed Rates:**

* United States Dollar (USD)
* Kazakhstani Tenge (KZT)

**Example Output:**

```
1 EUR = 1.08 USD
1 EUR = 495.20 KZT
```

Exchange rate information is displayed near the country data to maintain logical grouping.

---

### 4️⃣ News API

**Endpoint:**

```
https://newsapi.org/v2/everything
```

**Filtering Rules:**

* Keyword contains the user’s country name
* Language: English
* Limit: 5 articles

**Each Article Displays:**

* Headline title
* Image (if available)
* Short description
* Source URL

---

## 🎨 Frontend Design & UI

* Responsive card-based layout
* Modern dark-themed design
* Smooth animations and transitions
* Graceful handling of missing data
* Clear visual separation of sections:

  * User Profile
  * Country Information
  * Exchange Rates
  * News Headlines

No business logic is implemented on the frontend.

---

## 🧪 Error Handling

* Network and API errors are handled on the server
* Missing fields are replaced with fallback values (`N/A`)
* Frontend displays friendly error messages
* API keys are never exposed

---

## 📦 Dependencies

```json
{
  "axios": "^1.6.x",
  "dotenv": "^16.x",
  "express": "^4.x"
}
```

---

## 🧑‍🏫 Defense Explanation (Summary)

* All external APIs are accessed server-side
* Frontend only renders received data
* Environment variables protect sensitive API keys
* Code is modular and maintainable
* UI is responsive and user-friendly

---

## ✅ Grading Criteria Coverage

| Criteria                | Status |
| ----------------------- | ------ |
| Random User API         | ✅      |
| REST Countries API      | ✅      |
| Exchange Rate API       | ✅      |
| News API                | ✅      |
| Server-side logic       | ✅      |
| Clean project structure | ✅      |
| Responsive UI           | ✅      |
| Documentation           | ✅      |

---

## 📌 Conclusion

This project demonstrates best practices in server-side API integration, clean architecture, and frontend rendering.
It fulfills all assignment requirements and is ready for submission and defense.

---

```

