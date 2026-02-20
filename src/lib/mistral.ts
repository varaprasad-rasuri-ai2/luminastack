import axios from "axios";

export async function askMistral(prompt: string) {
  try {
    const res = await axios.post(
      "https://api.mistral.ai/v1/chat/completions",
      {
        model: "mistral-small",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful, concise assistant. Answer the user's question directly and briefly. Only elaborate or add extra detail if the user asks for it. Use markdown formatting when it aids readability.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.data.choices[0].message.content;
  } catch (error: any) {
    console.error("Mistral API Error:", error.response?.data || error.message);
    return "Error getting response from Mistral AI";
  }
}
