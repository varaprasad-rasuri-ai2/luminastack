import axios from "axios";

export async function askQwen(prompt: string) {
  try {
    const res = await axios.post(
      "https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation",
      {
        model: "qwen-turbo",
        input: {
          prompt: prompt,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.QWEN_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.data.output.text;
  } catch (error: any) {
    console.error("Qwen API Error:", error.response?.data || error.message);
    return "Error getting response from Qwen AI";
  }
}
