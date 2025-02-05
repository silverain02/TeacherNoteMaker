import ChatPage from "@/pages/ChatPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom";
import { createMemoryRouter } from "react-router";
import { RouterProvider } from "react-router-dom";
import { render } from "@testing-library/react";

const queryClient = new QueryClient({ defaultOptions: {} });

describe("js test", () => {
  it("number test", () => {
    expect(3 + 4).toBe(7); // 3+4가 7인지 테스트
  });

  it("string test", () => {
    const name = "J4J";
    expect(name).toBe("J4J"); // name이 J4J인지 테스트
  });
});

describe("사용자 지문 입력 테스트", () => {
  beforeEach(() => {
    const routes = [
      {
        path: "/chat",
        element: <ChatPage />,
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: ["/chat"],
      initialIndex: 0,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );
  });

  test("지문을 입력하고, 지문길이와 영어만 입력 조건을 통과하면 제출 버튼이 활성화된다", () => {
    //given - 입력 페이지가 그려짐
    //when
    //then
  });
});
