import React from 'react';

/* ant motion */
import { OverPack } from 'rc-scroll-anim';
import TweenOne from 'rc-tween-one';


export default function WithImg({ imgList }) {
  return (
    <>
      {imgList.map(img => (
        <OverPack playScale={0.2} key={img.alt}>
          <TweenOne key="0" animation={{ opacity: 1, y: 0 }} style={{ opacity: 0, transform: 'translateY(-40px)' }}>
            <img key={img.alt} src={img.src} alt={img.alt} style={{ maxWidth: '100%', maxHeight: '600px' }} />
          </TweenOne>
        </OverPack>
      ))}
    </>
  );
}
