import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';

/* components */
import Detail from './Detail';
import WithImg from './WithImg';
import WithAnimate from './WithAnimate';

const Wrapper = styled.div`
  padding: 80px 0;

  @media (max-width: 767px) {
    padding: 40px 0;
    text-align: left;
  }

  .ant-col {
    .TextDiv {
      margin-bottom: 20px;
    }

    .ButtonDiv>a {
      margin-right: 20px;

      &:last-child {
        margin: 0;
      }

      &>button {
        margin-bottom: 20px;
      }
    }

    &>* {
      margin-top: 50px;
      
      @media (max-width: 767px) {
        margin-top: 20px
      }
    }
  }

  .FixedImg {
    position: absolute;
    top: 0;
    right: -30px;
  }
`;

export default function DetailWithImg({
  colSize, title, textList, imgList, justify, animated
}) {
  const [textAlign, setTextAlign] = useState();

  useEffect(() => {
    if (justify === 'center') {
      setTextAlign('center');
    } else if (justify === 'end') {
      setTextAlign('right');
    }
  }, [justify]);

  return (
    <Wrapper className="DetailWithImg">
      <div className="container">
        <Row gutter={24} type="flex" justify={justify} style={{ textAlign }}>
          <Col xs={24} lg={colSize[0]}>
            <Detail title={title} textList={textList} />
          </Col>
          <Col xs={24} lg={colSize[1]}>
            {animated ? (
              <WithAnimate imgList={imgList} />
            ) : (
              <WithImg imgList={imgList} />
            )}
          </Col>
        </Row>
      </div>
    </Wrapper>
  );
}
