import React from 'react';

/* ant motion */
import { OverPack } from 'rc-scroll-anim';
import TweenOne from 'rc-tween-one';

export default function WithAnimate({ imgList }) {
  return (
    <>
      <img className="FixedImg" key={imgList[1].alt} src={imgList[1].src} alt={imgList[1].alt} style={{ maxWidth: '100%', maxHeight: '600px' }} />
      <OverPack playScale={0.2}>
        <TweenOne key="0" animation={{ opacity: 1, x: -100, duration: 1000 }} style={{ opacity: 1, transform: 'translateX(-800px)' }}>
          <img key={imgList[0].alt} src={imgList[0].src} alt={imgList[0].alt} style={{ maxWidth: '100%', maxHeight: '600px' }} />
        </TweenOne>
      </OverPack>
    </>
  );
}
