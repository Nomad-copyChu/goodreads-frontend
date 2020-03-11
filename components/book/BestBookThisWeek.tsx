import React from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";
import Link from "next/link";
import AddToShelfButton from "./AddToShelfButton";
import colors from "../../style/colors";

const ReactStars = dynamic(import("react-stars"), { ssr: false });

const Container = styled.div`
  padding: 8px;
  width: 200px;
  height: 284px;
  border: 1px solid #d8d8d8;
  box-sizing: border-box;
  border-radius: 5px;
  overflow: hidden;
  h3 {
    font-size: 16px;
    margin-bottom: 1px solid ${colors.gray_500};
  }
  .border {
    margin-top: 2px;
    margin-bottom: 4px;
    border: 1px solid #d8d8d8;
    width: 185px;
  }
  .main-bestbook-info {
    display: flex;
    img {
      width: 80px;
      height: 113px;
    }
    .main-bestbook-column {
      margin-left: 8px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
    .bestbook-title {
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      word-wrap: break-word;
      display: -webkit-box;
      -webkit-line-clamp: 1; /* ellipsis line */
      -webkit-box-orient: vertical;
    }
    .bestbook-author {
      font-size: 8px;
      overflow: hidden;
      text-overflow: ellipsis;
      word-wrap: break-word;
      display: -webkit-box;
      -webkit-line-clamp: 1; /* ellipsis line */
      -webkit-box-orient: vertical;
    }
    .rating-text {
      font-size: 10px;
      display: flex;
      align-items: center;
    }
    .rating-and-review {
      display: flex;
      font-size: 10px;
      a {
        margin-right: 3px;
      }
    }
    .shelfbutton {
      height: 21px;
    }
  }
  .contents {
    margin-top: 9px;
    width: 180px;
    color: #aaaaaa;
    font-size: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 8; /* ellipsis line */
    -webkit-box-orient: vertical;
  }
`;

const BestBookThisWeek: React.FC = () => {
  return (
    <Container>
      <h3>이주의 배스트 책</h3>
      <div className="border" />
      <div className="main-bestbook-info">
        <img src="http://bimage.interpark.com/goods_image/9/2/2/0/211639220g.jpg" alt="" />
        <div className="main-bestbook-column">
          <div>
            <Link href="/book/[id]" as="/book/">
              <a className="bestbook-title">나미야 잡화점의 기적</a>
            </Link>
          </div>
          <div className="bestbook-author">
            <span>by</span>
            <Link href="/author/[id]" as="/author/">
              <a>히가시노 게이고</a>
            </Link>
          </div>
          <div className="rating-text">
            <ReactStars count={5} edit={false} value={3.5} size={12} color1="#D8D8D8" color2="#FA604A" />
            <span>3.5</span>
          </div>
          <div className="rating-and-review">
            <Link href="/book/[id]" as="/author/">
              <a>300 ratings</a>
            </Link>
            <Link href="/book/[id]" as="/author/">
              <a>27 review</a>
            </Link>
          </div>
          <AddToShelfButton className="shelfbutton" size="medium" />
        </div>
      </div>
      <div className="contents">
        삼인조 좀도둑 쇼타, 아쓰야, 고헤이는 범행을 저지르고 달아나던 중 훔친 차의 배터리가 방전되어 멈춰버리는
        비상사태를 맞딱드린다. 늦은 밤에 갈곳도 마땅찮아 발을 동동 구르고 있던 그때, 쇼타가 괜찮은 폐가가 하나 있다며
        앞장서기 시작했고 아쓰야와 고헤이는 영문도 모른채 따라나선다. 그렇게 길을 걸은 끝에 오게된 폐가는 문을 닫은지
        30년은 훨씬 넘은 나미야 잡화점. 자물쇠가 망가진 가게 뒷문을 열고 안으로 들어온 세 사람. 가게 안을 둘러보던
        아쓰야는 뒤에서 사람 기척을 느낀다. 혹시 누군가 자신들을 미행한건 아닌가 싶어 서둘러 가게 밖을 빠져나와 주위를
        둘러봤지만 사람의 흔적은 어디에도 없었고 대신 편지 봉투 한 장만이 놓여져 있었다. 누가 이 야심한 밤에 폐업한
        가게에 편지만 한 장 던져놓고 사라진 건지 궁금해하던 세 사람은 결국 편지에 답장을 해주는 지경에 이른다.
      </div>
    </Container>
  );
};

export default BestBookThisWeek;
