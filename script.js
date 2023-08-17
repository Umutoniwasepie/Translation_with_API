const translateButton = document.getElementById("translateBtn");
const inputText = document.getElementById("inputText");
const sourceLang = document.getElementById("sourceLang");
const targetLang = document.getElementById("targetLang");
const translatedText = document.getElementById("translatedText");

const apiKey = "bc26d4e3c9394ce7b899e6e1104c71c9";
const endpoint = "https://api.cognitive.microsofttranslator.com/translate";

translateButton.addEventListener("click", () => {
  const text = inputText.value;
  const source = sourceLang.value;
  const target = targetLang.value;

  if (text === "") {
    alert("Please enter text to translate.");
    return;
  }

  const params = new URLSearchParams({
    "api-version": "3.0",
    "to": target
  });

  fetch(`${endpoint}?${params}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": apiKey,
      "Ocp-Apim-Subscription-Region": "southafricanorth" // My Azure region
    },
    body: JSON.stringify([{ "Text": text }])
  })
    .then(response => response.json())
    .then(data => {
      const translated = data[0].translations[0].text;
      translatedText.textContent = translated;
    })
    .catch(error => {
      console.error("Error translating:", error);
      alert("An error occurred while translating. Please try again later.");
    });
});

