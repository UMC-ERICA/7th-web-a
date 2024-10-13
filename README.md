# 💚 UMC 7th ERICA Web-A 💚
[Github 기본 가이드](https://makeus-challenge.notion.site/Github-aaa7f52c9fa64656b4e4ea02de51a0a9)




## Setting

### Git 작업 순서

1. **저장소 복제 (clone)**
   ```bash
   git clone [깃허브 주소]
   ```
2. 본인 브랜치로 이동
   ```bash
   git checkout [유월/김예안]
   ```
3. 작업 후 코드 커밋 및 푸시
   ```bash
   git add .
   git commit -m "[커밋 메세지]"
   git push
   ```

---


## Commit Convention
- feat: 기능 구현, 추가
- setting: 빌드수행, 패키지 설치, 환경 설정 수정 등
- fix: 버그 및 오류 수정
- style: css 파일 위주의 ui 작업
- docs: README.md 작성, 주석 작성
- refactor: 코드 리팩토링
- chore: 기타 작업
> 예시 : feat: 회원가입 로직 구현 


---


## Pull Reqeust Convention
PR 요청 시, 다음 양식을 준수해주세요

```bash
N주차 미션_닉네임 (예: 1주차 미션_유월)

📄 요약

이번 주차 워크북에서 구현한 내용을 간단히 설명해주세요!

📝 작업 내용
이번 주차 워크북에서 구현한 세부 항목들을 체크해주세요!

📸 스크린샷 (선택)

🗨️ 리뷰 요구사항 (선택)

리뷰어에게 특별히 확인받고 싶은 부분이 있다면 작성해주세요.

> 예: 메서드 XXX의 이름을 더 잘 지을 수 있는 방법이 있을까요?
```


---


### 리뷰어 설정
- PR 요청 시, Reviewers는 파트장으로 설정해주세요.
- 파트장의 코드 리뷰 및 Approve 후에 main 브랜치로 머지 가능합니다.


