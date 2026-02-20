import axios from "axios";

export async function askMistral(prompt: string) {
  try {
    const res = await axios.post(
      "https://api.mistral.ai/v0/chat/completions",
      {
        model: "mistral-small",
        messages: [
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
