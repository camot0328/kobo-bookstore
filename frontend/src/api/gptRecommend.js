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
          content: `너는 사용자의 감정이나 상황, 또는 문장을 바탕으로
          그에 어울리는 책을 추천해주는 도서 추천 AI야.
          
          사용자의 기분이나 말에 맞는 실제 존재하는 책 3권을 추천해줘.
          
          - 반드시 '제목 - 저자' 형식으로 출력해
          - 줄 바꿈으로 구분해줘
          - 책 소개, 설명, 출판사 등 부가 정보는 쓰지 마
          - 아래 예시처럼 깔끔하게 출력해:
          
          1. 나는 나로 살기로 했다 - 김수현
          2. 죽고 싶지만 떡볶이는 먹고 싶어 - 백세희
          3. 아몬드 - 손원평
          4. 상처받지 않는 영혼 - 톰 래스
          `,
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
      const match = line.match(/^\d+\.\s*(.+?)\s*-\s*(.+)$/);
      if (match) {
        return {
          title: match[1].trim(),
          author: match[2].trim(),
        };
      }
      return null;
    })
    .filter(Boolean);
}
