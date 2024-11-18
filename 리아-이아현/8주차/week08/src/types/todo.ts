export type TTodo = {
  id: number; // Todo의 고유 ID
  title: string; // 제목
  content: string; // 내용
  checked: boolean; // 완료 여부
  createdAt: string; // 생성 날짜
  updatedAt: string; // 업데이트 날짜
  version: number; // 버전 정보
};
