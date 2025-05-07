import axios from "axios";

export async function getRecommendedBooks(prompt) {
  const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "너는 사용자 기분에 따라 도서를 추천해주는 책 추천 비서야. 책 제목과 저자를 3권 정확하게 알려줘. 꼭 아래 형식으로 줘:\n1. <제목> - 저자",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.8,
    },
    {
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  const content = response.data.choices[0].message.content;
  const lines = content.split("\n").filter((line) => line.trim() !== "");

  // 예: ["1. <제목> - 저자", ...] → 제목만 추출
  return lines
    .map((line) => {
      const match = line.match(/<(.+?)> - (.+)/);
      if (match) {
        return {
          title: match[1],
          author: match[2],
        };
      }
      return null;
    })
    .filter(Boolean);
}
